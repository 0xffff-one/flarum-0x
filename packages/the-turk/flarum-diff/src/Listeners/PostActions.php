<?php

namespace TheTurk\Diff\Listeners;

use Carbon\Carbon;
use Flarum\Extension\ExtensionManager;
use Flarum\Post\Event\Revised as PostRevised;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use TheTurk\Diff\Jobs\ArchiveDiffs;
use TheTurk\Diff\Models\Diff;

class PostActions
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var ExtensionManager
     */
    private $extensions;

    /**
     * @var ArchiveDiffs
     */
    protected $job;

    /**
     * @var string
     */
    private static $oldContent = '';

    /**
     * @param SettingsRepositoryInterface $settings
     * @param ExtensionManager            $extensions
     * @param ArchiveDiffs                $job
     */
    public function __construct(
        SettingsRepositoryInterface $settings,
        ExtensionManager $extensions,
        ArchiveDiffs $job
    ) {
        $this->settings = $settings;
        $this->extensions = $extensions;
        $this->job = $job;
    }

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostSaving::class, [$this, 'whenSavingPost']);
        $events->listen(
            // support for my 'the-turk/flarum-quiet-edits' extension
            ($this->extensions->isEnabled('the-turk-quiet-edits')
            ? \TheTurk\QuietEdits\Events\PostWasRevisedLoudly::class
            : PostRevised::class),
            [$this, 'whenRevisedPost']
        );
    }

    /**
     * Catch the content of the old post
     * just before saving the new one.
     *
     * @param PostSaving $event
     */
    public function whenSavingPost(PostSaving $event)
    {
        $post = $event->post;
        // if the post already exists,
        // this means we're trying to edit.
        if ($post->exists) {
            self::$oldContent = $post->getContentAttribute(
                $post->getOriginal('content')
            );
        }
    }

    /**
     * We'll always store the old content as new revision
     * because latest revision will always be the current post content.
     */
    public function whenRevisedPost($event)
    {
        $mainPostOnly = (bool) $this->settings->get(
            'the-turk-diff.mainPostOnly',
            false
        );

        if ($mainPostOnly) {
            // skip if it's not first post
            if ($event->post->number != '1') {
                return;
            }
        }

        $archiveOlds = $this->settings->get(
            'the-turk-diff.archiveOlds',
            false
        );

        $useCrons = $this->settings->get(
            'the-turk-diff.useCrons',
            false
        );

        $diffSubject = Diff::where('post_id', $event->post->id);
        $maxRevisionCount = $diffSubject->exists() ? $diffSubject->max('revision') : 0;

        // if this is a first edit
        if ($maxRevisionCount == 0) {
            $diff = Diff::build(
                0, // save original post as revision 0 before updating it
                $event->post->id,
                $event->post->user_id, // original post's creator
                self::$oldContent
            );

            $diff->created_at = $event->post->created_at;
            $diff->save();
        } else {
            // update last revision's content
            // because we set it to null before
            // (we were getting its contents from posts table
            // because latest revision is equal to latest post content)
            $latestDiff = $diffSubject
              ->where('revision', $maxRevisionCount)
              ->firstOrFail();
            $latestDiff->content = self::$oldContent;
            $latestDiff->save();
        }

        // add new revision and set it content to null
        // because latest revision is equal to latest post content
        $diff = Diff::build(
            $maxRevisionCount + 1,
            $event->post->id,
            $event->actor->id,
            null
        );

        $diff->created_at = Carbon::now();
        $diff->save();

        // if they want to archive old revisions
        // without using cron jobs or `diff:archive` command
        // ...we're cool with it.
        if ($archiveOlds && !$useCrons) {
            $this->job->archiveForPost($event->post->id, $maxRevisionCount + 1);
        }
    }
}

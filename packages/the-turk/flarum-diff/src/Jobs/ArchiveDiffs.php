<?php

namespace TheTurk\Diff\Jobs;

use Carbon\Carbon;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Log\LoggerInterface;
use TheTurk\Diff\Models\Diff;
use TheTurk\Diff\Repositories\DiffArchiveRepository;

/**
 * We're using a linear equation (y=mx+b) where the x is post's revision count.
 * If x ≥ A, first y revisions for the post can be stored as merged & compressed
 * `BLOB` in a new table (which is called `post_edit_histories_archive`).
 * A, m and b values can be set from the settings modal.
 * You can't archive last revision because it's the post itself.
 */
class ArchiveDiffs
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var LoggerInterface
     */
    protected $log;

    /**
     * @var DiffArchiveRepository
     */
    protected $diffArchive;

    /**
     * @var bool
     */
    protected $revLimit;

    /**
     * @param SettingsRepositoryInterface $settings
     * @param DiffArchiveRepository       $diffArchive
     */
    public function __construct(
        SettingsRepositoryInterface $settings,
        LoggerInterface $log,
        DiffArchiveRepository $diffArchive
    ) {
        $this->settings = $settings;
        $this->log = $log;
        $this->diffArchive = $diffArchive;

        // this is the A value
        $this->revLimit = self::sanitizeFloat(
            $settings->get('the-turk-diff.archiveLimit', 15)
        );
    }

    /**
     * Archive specific post's revisions only.
     *
     * @param int $postId
     * @param int $maxRevision
     */
    public function archiveForPost(int $postId, int $maxRevision)
    {
        if (!($maxRevision >= $this->revLimit)) {
            return;
        }
        // this is the m value
        $slope = self::sanitizeFloat(
            $this->settings->get('the-turk-diff.archiveSlope', 0.4)
        );
        // this is the b value
        $coefficient = self::sanitizeFloat(
            $this->settings->get('the-turk-diff.archiveCoefficient', 0)
        );
        // y = mx + b
        // float values of y will be rounded to the next lowest integer value.
        $linearEquation = (int) floor($slope * $maxRevision + $coefficient);

        if ($linearEquation > 0) {
            try {
                $diffsToBeArchived = Diff::where('revision', '<=', $linearEquation)
                    ->where('archive_id', null)
                    ->whereNotNull('content')
                    ->where('post_id', $postId)
                    ->get();

                if ($diffsToBeArchived->count() > 0) {
                    // archive revisions one by one
                    foreach ($diffsToBeArchived as $diff) {
                        $this->log->info(
                            "[the-turk/flarum-diff] |> archiving revision #{$diff->id} from post #{$postId}"
                        );

                        $archiveContent = $this->diffArchive->archiveContent(
                            $diff->post_id,
                            $diff->id,
                            $diff->content
                        );

                        // set archive id for revision
                        $diff->archive_id = $archiveContent->id;
                        // set revision content to null
                        $diff->content = null;
                        $diff->save();
                    }
                }
            } catch (\Exception $e) {
                $this->log->error($e->getMessage());
            }
        }
    }

    /**
     * Archive all posts' revisions.
     */
    public function archiveAll()
    {
        $time = Carbon::now();
        $this->log->info(
            "[the-turk/flarum-diff] |> archive post's revisions {$time}"
        );
        $postsToBeArchived = Diff::select('post_id')
            ->selectRaw('MAX(revision) AS revision')
            ->where('revision', '>=', $this->revLimit)
            ->where('archive_id', null)
            ->whereNotNull('content')
            ->groupBy('post_id')
            ->get();

        if ($postsToBeArchived->count() > 0) {
            foreach ($postsToBeArchived as $post) {
                $this->archiveForPost($post->post_id, $post->revision);
            }
        }
    }

    /**
     * @param float $number
     *
     * @return float
     */
    public static function sanitizeFloat(float $number)
    {
        return floatval(preg_replace('/[^-0-9\.]/', '', $number));
    }
}

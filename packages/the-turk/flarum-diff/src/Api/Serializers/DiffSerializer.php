<?php

namespace TheTurk\Diff\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Extension\ExtensionManager;
use Flarum\Post\CommentPost;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Jfcherng\Diff\Differ;
use Jfcherng\Diff\Factory\RendererFactory;
use Symfony\Contracts\Translation\TranslatorInterface;
use TheTurk\Diff\Models\Diff;
use TheTurk\Diff\Repositories\DiffArchiveRepository;

class DiffSerializer extends AbstractSerializer
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var CommentPost
     */
    protected $commentPost;

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    /**
     * @var DiffArchiveRepository
     */
    protected $diffArchive;

    /**
     * @var Translator
     */
    protected $translator;

    /**
     * @param SettingsRepositoryInterface $settings
     * @param CommentPost                 $commentPost
     * @param ExtensionManager            $extensions
     * @param TranslatorInterface         $translator
     * @param DiffArchiveRepository       $diffArchive
     */
    public function __construct(
        SettingsRepositoryInterface $settings,
        CommentPost $commentPost,
        ExtensionManager $extensions,
        TranslatorInterface $translator,
        DiffArchiveRepository $diffArchive
    ) {
        $this->settings = $settings;
        $this->commentPost = $commentPost;
        $this->extensions = $extensions;
        $this->translator = $translator;
        $this->diffArchive = $diffArchive;
    }

    /**
     * Resource type.
     *
     * @var string
     */
    protected $type = 'diff'; // used on line app.store.models.$type

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Diff $diff
     *
     * @return array
     */
    protected function getDefaultAttributes($diff)
    {
        $attributes = [
            'revision'             => (int) $diff->revision,
            'createdAt'            => $this->formatDate($diff->created_at),
            'deletedAt'            => $this->formatDate($diff->deleted_at),
            'rollbackedAt'         => $this->formatDate($diff->rollbacked_at),
            'canDeleteEditHistory' => false,
            'inlineHtml'           => null,
            'sideBySideHtml'       => null,
            'combinedHtml'         => null,
            'previewHtml'          => null,
            'comparisonBetween'    => null,
        ];

        // set attributes if revision is not deleted
        if (null === $diff->deleted_at) {
            // get post's revision count
            $diffSubject = Diff::where('post_id', $diff->post_id);
            $revisionCount = $diffSubject->max('revision');

            $currentRevision = $diff->content;

            // get uncompressed revision content for comparison.
            if ($diff->archive_id !== null) {
                $currentRevision = $this->diffArchive->getArchivedContent(
                    $diff->archive_id,
                    $diff->id
                );
            }

            // we'll compare this current (new) revision
            // with one of the (old) previous revisions.
            // this array is very useful to give informations about
            // comparisons to users.
            $comparisonArray = [
                'new' => [
                    'revision' => $diff->revision,
                    'diffId'   => $diff->id,
                ],
            ];

            // we don't know anything about are there any previous revisions
            // to compare with current revision yet.
            $oldRevision = '';

            // if this is a last revision then we'll compare it with current content.
            // it's a bit confusing but remember - revisions starts with 0 (original content)
            // last revision is actually the current content.
            if ($diff->revision == $revisionCount && null === $currentRevision) {
                $currentRevision = Post::findOrFail($diff->post_id)->content;
            }

            // set html attribute for the preview mode.
            $attributes['previewHtml'] = $this->formatter($currentRevision);

            // find a revision to compare with current revision
            $compareWith = $diffSubject->where('revision', '<', $diff->revision)
                ->where('deleted_at', null)
                ->orderBy('revision', 'DESC')->first();

            // if current revision is the zeroth (original content)
            // or there are nothing to compare with latest revision
            // then switch to preview mode.
            // remember that latest revision is the current content
            if (
                $diff->revision == 0 ||
                ($diff->revision == $revisionCount && $compareWith === null)
            ) {
                // keep in mind that old and new will be equal in $comparisonArray
                // if this condition happens.
                $comparisonArray['old'] = [
                    'revision' => $diff->revision,
                    'diffId'   => $diff->id,
                ];
            } else {
                // if there are nothing to compare with,
                // then compare current revision with the current content
                // -1 indicates current content in $comparisonArray.
                if ($compareWith === null) {
                    $oldRevision = Post::findOrFail($diff->post_id)->content;
                    $comparisonArray['old'] = [
                        'revision' => -1,
                        'diffId'   => null,
                    ];
                } else {
                    if ($compareWith->archive_id !== null) {
                        // get uncompressed revision content for comparison.
                        $oldRevision = $this->diffArchive->getArchivedContent(
                            $compareWith->archive_id,
                            $compareWith->id
                        );
                    } else {
                        $oldRevision = $compareWith->content;
                    }

                    $comparisonArray['old'] = [
                        'revision' => $compareWith->revision,
                        'diffId'   => $compareWith->id,
                    ];
                }

                $ignoreCase = $ignoreWhiteSpace = false;

                // support for my 'the-turk/flarum-quiet-edits' extension
                if ($this->extensions->isEnabled('the-turk-quiet-edits')) {
                    $ignoreCase = $this->settings->get('the-turk-quiet-edits.ignoreCase', true);
                    $ignoreWhiteSpace = $this->settings->get('the-turk-quiet-edits.ignoreWhitespace', true);
                }

                // calculate differences between revisions
                // more options can be found at jfcherng's repo.
                $differ = new Differ(
                    explode("\n", $oldRevision),
                    explode("\n", $currentRevision),
                    [
                        // how many neighbor lines do we want to show?
                        'context' => (int)
                        $this->settings->get('the-turk-diff.neighborLines', 2),
                        // iGnoRe cAsE diFfErEnceS
                        'ignoreCase' => $ignoreCase,
                        // i g nore white spac e dif feren ces
                        'ignoreWhitespace' => $ignoreWhiteSpace,
                    ]
                );

                $rendererOptions = [
                    // line-level is the default level
                    'detailLevel' => $this->settings->get(
                        'the-turk-diff.detailLevel',
                        'line'
                    ),
                    // show a separator between different diff hunks in HTML renderers
                    'separateBlock' => (bool) $this->settings->get(
                        'the-turk-diff.separateBlock',
                        true
                    ),
                    'lineNumbers'    => false,
                    'wrapperClasses' => ['TheTurkDiff', 'CustomDiff', 'diff-wrapper'],
                    // shows when there are no differences found between revisions
                    'resultForIdenticals' => '<div class="noDiff"><p>'
                    .$this->translator->trans('the-turk-diff.forum.noDiff').
                    '</p></div>',
                    // this option is just for Combined renderer
                    'mergeThreshold' => \TheTurk\Diff\Jobs\ArchiveDiffs::sanitizeFloat($this->settings->get(
                        'the-turk-diff.mergeThreshold',
                        0.8
                    )),
                ];

                $inlineRenderer = RendererFactory::make('Inline', $rendererOptions);
                $inlineHtml = $inlineRenderer->render($differ);
                $attributes['inlineHtml'] = $inlineHtml;

                $sideBySideRenderer = RendererFactory::make('SideBySide', $rendererOptions);
                $sideBySideHtml = $sideBySideRenderer->render($differ);
                $attributes['sideBySideHtml'] = $sideBySideHtml;

                $combinedRenderer = RendererFactory::make('Combined', $rendererOptions);
                $combinedHtml = $combinedRenderer->render($differ);
                $attributes['combinedHtml'] = $combinedHtml;
            }

            $attributes['comparisonBetween'] = json_encode($comparisonArray);
        }

        return $attributes;
    }

    /*
     * Render & parse the preview content.
     * I had to do this trick because new instance of
     * TextFormatter means fresh configuration.
     * I don't want to lose Flarum's configuration.
     *
     * @param string $content
     * @return string
     */
    public function formatter(string $content)
    {
        if ($this->settings->get('the-turk-diff.textFormatting', true)) {
            return $this->commentPost->getFormatter()->render(
                $this->commentPost->getFormatter()->parse(
                    $content,
                    $this->commentPost
                ),
                $this->commentPost
            );
        }

        return \htmlspecialchars($content, ENT_QUOTES, 'UTF-8');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function actor($diff)
    {
        return $this->hasOne($diff, BasicUserSerializer::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function deletedUser($diff)
    {
        return $this->hasOne($diff, BasicUserSerializer::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function rollbackedUser($diff)
    {
        return $this->hasOne($diff, BasicUserSerializer::class);
    }
}

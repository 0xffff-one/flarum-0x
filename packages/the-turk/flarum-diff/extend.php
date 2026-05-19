<?php

/**
 * Diff Extension for Flarum.
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE file that was distributed
 * with this source code.
 */

namespace TheTurk\Diff;

use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Api\Serializer\PostSerializer;
use Flarum\Extend;
use Flarum\Foundation\Paths;
use Flarum\Post\Post;
use Illuminate\Console\Scheduling\Event;
use TheTurk\Diff\Api\Controllers;
use TheTurk\Diff\Api\Serializers\DiffSerializer;
use TheTurk\Diff\Api\Serializers\SerializeDiffsOnPosts;
use TheTurk\Diff\Console\ArchiveCommand;
use TheTurk\Diff\Models\Diff;

return [
    (new Extend\Routes('api'))
        ->get('/diff', 'diff.index', Controllers\ListDiffController::class)
        ->delete('/diff/{id}', 'diff.delete', Controllers\DeleteDiffController::class)
        ->post('/diff/{id}', 'diff.rollback', Controllers\RollbackToDiffController::class),

    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Locales(__DIR__.'/locale')),

    (new Extend\Model(Post::class))
        ->hasMany('diff', Diff::class, 'post_id'),

    (new Extend\Event())
        ->subscribe(Listeners\PostActions::class),

    (new Extend\Console())
        ->command(ArchiveCommand::class)
        ->schedule(ArchiveCommand::class, function (Event $event) {
            /** @var Paths $paths */
            $paths = resolve(Paths::class);
            $event->weeklyOn(2, '2:00')
                ->appendOutputTo($paths->storage.(DIRECTORY_SEPARATOR.'logs'.DIRECTORY_SEPARATOR.'diff-archive-task.log'));
        }),

    (new Extend\ApiSerializer(BasicPostSerializer::class))
        ->hasMany('diff', DiffSerializer::class),

    (new Extend\ApiSerializer(PostSerializer::class))
        ->attributes(SerializeDiffsOnPosts::class),

    (new Extend\Settings())
        ->serializeToForum('textFormattingForDiffPreviews', 'the-turk-diff.textFormatting', 'boolVal', true),

    (new Extend\User())
        ->registerPreference('diffRenderer', 'strval', 'sideBySide'),
];

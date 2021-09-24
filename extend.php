<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Discussion\Event\Saving;
use Flarum\Extend\ThrottleApi;
use Flarum\Http\RequestUtil;
use Flarum\Post\Post;
use Illuminate\Support\Arr;
use Overtrue\Pinyin\Pinyin;
use Psr\Http\Message\ServerRequestInterface;

// https://github.com/overtrue/pinyin
$pinyin = new Pinyin();

return [
    (new Extend\Event)
        ->listen(Saving::class, function ($event) use ($pinyin) {
            // pinyin slug
            $SLUG_MAX_LEN = 80;
            $event->discussion->slug = trim(substr(mb_strtolower($pinyin->permalink($event->discussion->title)), 0, $SLUG_MAX_LEN), '-');
        }),
    // redis queue
    new Blomstra\Redis\Extend\Redis([
        'host' => 'redis',
        'password' => null,
        'port' => 6379,
        'database' => 1
    ]),
    // check dumplicate post in the last 10 minutes
    (new ThrottleApi())
        ->set('checkDumplicate', function (ServerRequestInterface $request) {
            if (!in_array($request->getAttribute('routeName'), ['discussions.create', 'posts.create'])) {
                return;
            }

            $actor = RequestUtil::getActor($request);

            $latestPost = Post::where('user_id', $actor->id)
                ->where('created_at', '>=', new DateTime('-10 minutes'))
                ->orderBy('id', 'DESC')
                ->first();
            if ($latestPost) {
                $latestContent = resolve('flarum.formatter')->unparse($latestPost->content);
                $currentContent = Arr::get($request->getParsedBody(), 'data.attributes.content', '');
                if ($latestContent === $currentContent) {
                    return true;
                }
            }
        }),
];

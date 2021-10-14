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
use Flarum\Foundation\Application;
use Flarum\Foundation\Paths;
use Flarum\Frontend\Document;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Flarum\Post\Post;
use Illuminate\Support\Arr;
use Overtrue\Pinyin\Pinyin;
use Psr\Http\Message\ServerRequestInterface;

// https://github.com/overtrue/pinyin
$pinyin = new Pinyin();

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/resources/less/post-table.less'),
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
    // custom header
    (new Extend\Frontend('forum'))
        ->content(function (Document $document) {
            $app = resolve(Application::class);
            $headStrList = [];
            $prefetchUrlList = $app->config('prefetchUrlList', []);
            foreach ($prefetchUrlList as $value) {
                $headStrList[] = '<link rel="dns-prefetch" href="' . $value . '">';
                $headStrList[] = '<link rel="preconnect" href="' . $value . '">';
            }
            $customHeadStr = $app->config('customHead', '');
            if ($customHeadStr) {
                $headStrList[] = $customHeadStr;
            }
            $document->head = array_merge($headStrList, $document->head);
        }),
    // CDN URL Replacement
    (new Extend\Filesystem())
        ->disk('flarum-assets', function (Paths $paths, UrlGenerator $url) {
            $app = resolve(Application::class);
            $cdnBase = rtrim($app->config('cdnUrl', $url->to('forum')->path('')), '\/');
            $origUrl = $app->config('url', $url->to('forum')->path(''));
            return [
                'root'   => "$paths->public/assets",
                'url'    => str_replace($origUrl, $cdnBase, $url->to('forum')->path('assets'))
            ];
        })
        ->disk('flarum-avatars', function (Paths $paths, UrlGenerator $url) {
            $app = resolve(Application::class);
            $cdnBase = rtrim($app->config('cdnUrl', $url->to('forum')->path('')), '\/');
            $origUrl = $app->config('url', $url->to('forum')->path(''));
            return [
                'root'   => "$paths->public/assets",
                'url'    => str_replace($origUrl, $cdnBase, $url->to('forum')->path('assets/avatars'))
            ];
        }),
    // fancybox
    (new Extend\Frontend('forum'))
    ->content(function (Document $document) {
        $document->head[] = '<script defer type="text/javascript" src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>';
        $document->head[] = '<link rel="preload" as="style" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" onload="this.onload=null;this.rel=\'stylesheet\'">';
        $document->foot[] = <<<HTML
<script>
flarum.core.compat.extend.extend(flarum.core.compat['components/CommentPost'].prototype, 'oncreate', function (output, vnode) {
const self = this;
this.$('img').not('.emoji').not(".Avatar").not($(".PostMeta-ip img")).each(function () {
    var currentImage = $(this);
    var checksrc = currentImage.attr("data-src");
    if (checksrc) {
        $(this).wrap("<a class=\"fancybox\" href='" + currentImage.attr("data-src") + "'></a>");
    }
    else {
        $(this).wrap("<a class=\"fancybox\" href='" + currentImage.attr("src") + "'></a>");
    }
    try {
        $().ready(function(){
            $().fancybox({
                selector: '.fancybox'
            });
        })
    } catch (e) {
        console.error(e.name);
        console.error(e.message);
    }
});
});
</script>
HTML;
    })
];

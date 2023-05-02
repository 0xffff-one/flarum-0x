<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Flarum0x\Extend\DiskS3\DiskS3Driver;
use Flarum0x\Extend\Misc\GenerateCustomSlugWhenSaving;
use Flarum0x\Extend\Misc\GlobalLandingPageMiddleware;
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
use Psr\Http\Message\ServerRequestInterface;

$config = @include 'config.php';

return array_filter([
    (new Extend\Middleware('forum'))->add(GlobalLandingPageMiddleware::class),
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/resources/less/post-table.less')
        ->css(__DIR__ . '/resources/less/nav-widget.less')
        ->css(__DIR__ . '/resources/less/custom.less'),
    (new Extend\Event)
        ->listen(Saving::class, GenerateCustomSlugWhenSaving::class),
    /**
     * redis for queue / session / cache
     *
     * config example:
     * [
     *   'redisConfig' => [
     *    'host' => 'redis',
     *    'password' => null,
     *    'port' => 6379,
     *    'database' => 0
     *   ],
     * ]
     */
    (function () use ($config) {
        if (empty($config) || !array_key_exists('redisConfig', $config) || empty($redisConfig = $config['redisConfig'])) {
            return null;
        }
        return new Blomstra\Redis\Extend\Redis($redisConfig);
    })(),
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
    // s3 disk driver
    (function () use ($config) {
        if (empty($config) || !array_key_exists('disk_s3_config', $config)) {
            return null;
        }
        return (new Extend\Filesystem())->driver('disk_s3', DiskS3Driver::class);
    })(),
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
                'root'   => "$paths->public/assets/avatars",
                'url'    => str_replace($origUrl, $cdnBase, $url->to('forum')->path('assets/avatars'))
            ];
        }),
    // fancybox
    (new Extend\Frontend('forum'))
        ->content(function (Document $document) {
            $document->head[] = '<script defer type="text/javascript" src="https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/fancybox/3.5.7/jquery.fancybox.min.js"></script>';
            $document->head[] = '<link rel="preload" as="style" href="https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/fancybox/3.5.7/jquery.fancybox.min.css" onload="this.onload=null;this.rel=\'stylesheet\'">';
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
], 'boolval');

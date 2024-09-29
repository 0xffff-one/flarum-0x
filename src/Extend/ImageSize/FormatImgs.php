<?php

namespace Flarum0x\Extend\ImageSize;

use Flarum0x\Extend\ImageSize\Job\FetchImageSizeJob;
use Flarum\Foundation\Config;
use Illuminate\Contracts\Queue\Queue;
use Illuminate\Support\Arr;
use Onliner\ImgProxy\Options\Dpr;
use Onliner\ImgProxy\Options\Height;
use Onliner\ImgProxy\Options\Quality;
use Onliner\ImgProxy\Options\ResizingType;
use Onliner\ImgProxy\Options\Width;
use Onliner\ImgProxy\UrlBuilder;
use s9e\TextFormatter\Renderer;
use s9e\TextFormatter\Utils;
use Psr\Http\Message\ServerRequestInterface as Request;

class FormatImgs
{

    /** @var \Illuminate\Cache\Repository $cache */
    protected $cache;

    /**
     * @var Queue
     */
    protected $queue;

    /**
     * @var Config
     */
    protected $config;

    /**
     * @var string[]
     */
    protected $allowList;
    protected $imgProxyBase = '';
    protected $imgProxyBuilder = '';

    public static $KEY_PREFIX = 'img-size_';

    public static function getImageCacheKey($url = '')
    {
        return self::$KEY_PREFIX.hash('sha256', $url);
    }

    public static $imgProxyBuilderInner;

    public static function getImageProxyBuilder($key, $salt)
    {
        if (empty(self::$imgProxyBuilderInner)) {
            self::$imgProxyBuilderInner = UrlBuilder::signed($key, $salt)
                ->with(
                    new Quality(90),
                    new Width(800),
                    new ResizingType(ResizingType::FIT),
                );
        }
        return self::$imgProxyBuilderInner;
    }

    public function __construct(\Illuminate\Cache\Repository $cache, Queue $queue, Config $config)
    {
        $this->cache = $cache;
        $this->queue = $queue;
        $this->config = $config;
        $this->allowList = Arr::get($config, 'fetch_image_size_allow_list', []);
        $this->imgProxyBase = Arr::get($config, 'img_proxy_base', '');
        $this->imgProxyBuilder = self::getImageProxyBuilder(Arr::get($config, 'img_proxy_key', ''), Arr::get($config, 'img_proxy_salt', ''));
    }

    /**
     * @param Renderer $renderer
     * @param $context
     * @param $xml
     * @param Request $request
     */
    public function __invoke(Renderer $renderer, $context, $xml, Request $request = null)
    {
        $tempXML = Utils::replaceAttributes($xml, 'IMG', function ($attributes) {
            return $this->processAttributes($attributes['src'], $attributes);
        });

        $resultXML = Utils::replaceAttributes($tempXML, 'UPL-IMAGE-PREVIEW', function ($attributes) {
          return $this->processAttributes($attributes['url'], $attributes);;
        });

        return $resultXML;
    }

    private function processAttributes($url, $attributes) {
        $attributes = $this->processImageProxyAttributes($url, $attributes);
        if (!empty($attributes['height']))
            return $attributes;
        $size = $this->fetchSize($url);
        if (!$size)
            return $attributes;
        if (!empty($attributes['width'])) {
            $attributes['height'] = floor($attributes['width'] * $size['h'] / $size['w']);
        } else {
            $attributes['width'] = $size['w'];
            $attributes['height'] = $size['h'];
        }
        return $attributes;
    }

    private function processImageProxyAttributes($url, $attributes) {
        $newUrl = $this->getImageProxyURL($url);
        /**
         * hack: getImageProxyURL 生成的非 png / jpg 的 url 中没有 .jpg 的后缀，导致 seo 插件识别 og:image 生成有误，不想去改它正则，这里加一个 hack 骗过正则检测
         * @url https://github.com/v17development/flarum-seo/blob/2091f651cde88fccf4ddc49d97ed33cbad44200e/src/Listeners/PageListener.php
         */
        $attributes['src'] = $newUrl.'?.jpg';
        $attributes['url'] = $newUrl;
        $attributes['origsrc'] = $url;
        return $attributes;
    }

    private function getImageProxyURL($url) {
        if (empty($this->imgProxyBase)) return $url;
        $path = parse_url($url, PHP_URL_PATH);
        $ext = pathinfo($path, PATHINFO_EXTENSION);
        if ($ext === 'png' || $ext === 'jpg') {
            return rtrim($this->imgProxyBase, '/').$this->imgProxyBuilder->url($url, 'jpg');
        } else {
            return rtrim($this->imgProxyBase, '/').$this->imgProxyBuilder->url($url);
        }
    }

    private function fetchSize($url) {
        if (!$this->isUrlInAllowList($url)) return NULL;
        $key = self::getImageCacheKey($url);
        $size = $this->cache->get($key);
        if (!$size && !Arr::get($size, 'failed')) {
            $this->queue->push(new FetchImageSizeJob($url));
            return NULL;
        }
        return [
            'w' => $size['w'],
            'h' => $size['h'],
        ];
    }

    private function isUrlInAllowList($url = '')
    {
        $host = parse_url($url, PHP_URL_HOST);
        return in_array($host, $this->allowList);
    }
}

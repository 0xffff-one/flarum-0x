<?php

namespace Flarum0x\Extend\ImageSize;

use Flarum0x\Extend\ImageSize\Job\FetchImageSizeJob;
use Flarum\Foundation\Config;
use Illuminate\Contracts\Queue\Queue;
use Illuminate\Support\Arr;
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

    public static $KEY_PREFIX = 'img-size_';

    public static function getImageCacheKey($url = '')
    {
        return self::$KEY_PREFIX.hash('sha256', $url);
    }

    public function __construct(\Illuminate\Cache\Repository $cache, Queue $queue, Config $config)
    {
        $this->cache = $cache;
        $this->queue = $queue;
        $this->config = $config;
        $this->allowList = Arr::get($config, 'fetchImageSizeAllowList', []);
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

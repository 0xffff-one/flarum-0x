<?php

namespace Flarum0x\Extend\ImageSize\Job;

use Flarum0x\Extend\ImageSize\FormatImgs;
use Flarum\Queue\AbstractJob;
use Illuminate\Cache\Repository;

class FetchImageSizeJob extends AbstractJob
{
    private $url = '';

    public static $fastImageSize;

    public static function initializeFastImageLib()
    {
        self::$fastImageSize = new \FastImageSize\FastImageSize();
    }

    public function __construct(string $url = '')
    {
        $this->url = $url;
    }

    public function handle(Repository $cache)
    {
        $size = self::$fastImageSize->getImageSize($this->url);
        $key = FormatImgs::getImageCacheKey($this->url);
        if (!$size) {
          $cache->set($key, [
            'failed' => true,
          ], 28800);
        } else {
          $cache->set($key, [
            'w' => $size['width'],
            'h' => $size['height'],
          ]);
        }
    }
}

FetchImageSizeJob::initializeFastImageLib();

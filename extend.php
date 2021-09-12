<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Discussion\Event\Saving;
use Overtrue\Pinyin\Pinyin;

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
    ])
];

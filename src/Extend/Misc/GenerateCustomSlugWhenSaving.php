<?php

namespace Flarum0x\Extend\Misc;

use Flarum\Discussion\Event\Saving;
use Overtrue\Pinyin\Pinyin;

class GenerateCustomSlugWhenSaving
{
    // https://github.com/overtrue/pinyin
    static $pinyin;

    public function handle(Saving $event)
    {
        // since Flarum v1.3 it supports converting slugs to pinyin, but without a maximum character limit.
        // $event->discussion->slug = getShortSlug(mb_strtolower(self::$pinyin->permalink($event->discussion->title)));
        // remove slug instead
        $event->discussion->slug = '';
    }
}

GenerateCustomSlugWhenSaving::$pinyin = new Pinyin();

function getShortSlug($input) {
    $SLUG_MAX_LEN = 35;
    $resultArr = [];
    $totalLen = 0;
    $inputArr = explode("-", $input);
    foreach ($inputArr as $curWord) {
        $curLen = strlen($curWord);
        if ($totalLen + $curLen > $SLUG_MAX_LEN || empty($curWord)) {
            break;
        }
        $resultArr[] = $curWord;
        $totalLen += strlen($curWord) + 1;
    }
    return implode("-", $resultArr);
}

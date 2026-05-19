<?php

/*
 * This file is part of MathRen.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\MathRen;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Locales(__DIR__.'/locale')),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(LoadSettings::class),

    (new Extend\Formatter())
        ->configure(ConfigureTextFormatter::class),

    (new Extend\Settings())
        ->default('the-turk-mathren.alias_block_delimiters', '$$%e%$$,₺₺%e%₺₺')
        ->default('the-turk-mathren.alias_inline_delimiters', '\\(%e%\\)')
        ->default('the-turk-mathren.block_delimiters', '[math]%e%[/math]')
        ->default('the-turk-mathren.inline_delimiters', '[imath]%e%[/imath]')
        ->default('the-turk-mathren.alias_block_asciimath_delimiters', '\\$%e%\\$')
        ->default('the-turk-mathren.alias_inline_asciimath_delimiters', '\\{%e%\\}')
        ->default('the-turk-mathren.block_asciimath_delimiters', '[asmath]%e%[/asmath]')
        ->default('the-turk-mathren.inline_asciimath_delimiters', '[iasmath]%e%[/iasmath]')
        ->default('the-turk-mathren.color_is_text_color', '0')
        ->default('the-turk-mathren.enable_copy_tex', '1')
        ->default('the-turk-mathren.enable_fleqn', '0')
        ->default('the-turk-mathren.enable_leqno', '0')
        ->default('the-turk-mathren.enable_editor_buttons', '1')
        ->default('the-turk-mathren.throw_on_error', '0')
        ->default('the-turk-mathren.error_color', '#cc0000')
        ->default('the-turk-mathren.max_expand', '1000')
        ->default('the-turk-mathren.max_size', '10')
        ->default('the-turk-mathren.min_rule_thickness', '0.05')
        ->default('the-turk-mathren.output_mode', 'htmlAndMathml')
        ->default('the-turk-mathren.aliases_as_primary', '1')
        ->default('the-turk-mathren.allow_asciimath', '0')
        ->default('the-turk-mathren.cdn_katex', 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js')
        ->default('the-turk-mathren.sri_katex', 'sha384-X/XCfMm41VSsqRNQgDerQczD69XqmjOOOwYQvr/uuC+j4OPoNhVgjdGFwhvN02Ja')
        ->default('the-turk-mathren.cdn_asciimath2tex', 'https://unpkg.com/asciimath2tex@1.4.0/dist/asciimath2tex.umd.js')
        ->default('the-turk-mathren.sri_asciimath2tex', 'sha384-cdvLGvItf6Jz+kIS7cNq6cThfMF6hSoUveHAZJBnJqmEosxD2lUHn2/pUmGKGybo')
        ->registerLessConfigVar(
            'config-copy-tex',
            'the-turk-mathren.enable_copy_tex',
            function ($setting) {
                return \boolval($setting) ? 'true' : 'false';
            }
        ),
];

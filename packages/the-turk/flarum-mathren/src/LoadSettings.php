<?php

/*
 * This file is part of MathRen.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\MathRen;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use TheTurk\MathRen\Helpers\Util;

class LoadSettings
{
    /**
     * @var Util
     */
    protected $util;

    /**
     * Gets the settings variables. Called on Object creation.
     *
     * @param Util $util Helper util that used by this extension.
     */
    public function __construct(Util $util)
    {
        $this->util = $util;
    }

    /**
     * Get the setting values from the database and make them available in the forum.
     *
     * @return array
     */
    public function __invoke(): array
    {
        // We will use these "explicit" arrays for fixing the inline Litedown links issue.
        // All explicit" arrays contains BBCode-type delimiters.
        // @see https://github.com/s9e/TextFormatter/issues/167#issuecomment-882106642
        $explicitAsciiDelimiters = $explicitLatexDelimiters = [];

        $allowAsciiMath = \boolval($this->util->get('allow_asciimath'));

        $bbCodeDelimiters = $aliasDelimiters = [];
        $bbCodeAsciiDelimiters = $aliasAsciiDelimiters = [];
        $bbCodeLatexDelimiters = $this->util->getDelimitersWithOptions('bbcode');
        $aliasLatexDelimiters = $this->util->getDelimitersWithOptions('alias');

        if ($allowAsciiMath) {
            $bbCodeAsciiDelimiters = $this->util->getDelimitersWithOptions('bbcode', true);
            $aliasAsciiDelimiters = $this->util->getDelimitersWithOptions('alias', true);

            $bbCodeDelimiters = \array_merge($bbCodeAsciiDelimiters, $bbCodeLatexDelimiters);
            $aliasDelimiters = \array_merge($aliasAsciiDelimiters, $aliasLatexDelimiters);
        } else {
            $bbCodeDelimiters = $bbCodeLatexDelimiters;
            $aliasDelimiters = $aliasLatexDelimiters;
        }

        foreach ($bbCodeDelimiters as $delimiter) {
            $explicitArray = '';

            if ($delimiter['ascii'] === true) {
                $explicitArray = 'explicitAsciiDelimiters';
            } else {
                $explicitArray = 'explicitLatexDelimiters';
            }

            $$explicitArray[] = [
                'left'    => Str::before($delimiter['left'], ']').':0'.']',
                'right'   => Str::before($delimiter['right'], ']').':0'.']',
                'display' => $delimiter['display'],
                'ascii'   => $delimiter['ascii'],
            ];
        }

        $explicitDelimiters = $allowAsciiMath ? \array_merge($explicitAsciiDelimiters, $explicitLatexDelimiters) : $explicitLatexDelimiters;

        $settings = [
            'mathren.allow_asciimath'       => $allowAsciiMath,
            'mathren.katex_options'         => $this->util->getKatexOptions(),
            'mathren.enable_editor_buttons' => \boolval($this->util->get('enable_editor_buttons')),
            'mathren.aliases_as_primary'    => \boolval($this->util->get('aliases_as_primary')),
            'mathren.enable_copy_tex'       => \boolval($this->util->get('enable_copy_tex')),

            // Get type-specific delimiters.
            'mathren.bbcode_delimiters'          => $bbCodeDelimiters,
            'mathren.alias_delimiters'           => $aliasDelimiters,
            'mathren.explicit_bbcode_delimiters' => $explicitDelimiters,

            // Set primary delimiters.
            // These will be the first delimiters those declared in delimiters list.
            'mathren.primary_block_delimiter' => Arr::first(
                $explicitLatexDelimiters,
                function ($val) {
                    return $val['display'] === true;
                }
            ),
            'mathren.primary_inline_delimiter' => Arr::first(
                $explicitLatexDelimiters,
                function ($val) {
                    return $val['display'] === false;
                }
            ),
            'mathren.primary_block_delimiter_alias' => Arr::first(
                $aliasLatexDelimiters,
                function ($val) {
                    return $val['display'] === true;
                }
            ),
            'mathren.primary_inline_delimiter_alias' => Arr::first(
                $aliasLatexDelimiters,
                function ($val) {
                    return $val['display'] === false;
                }
            ),
        ];

        if ($allowAsciiMath) {
            $settings = \array_merge($settings, [
                'mathren.primary_block_asciimath_delimiter' => Arr::first(
                    $explicitAsciiDelimiters,
                    function ($val) {
                        return $val['display'] === true;
                    }
                ),
                'mathren.primary_inline_asciimath_delimiter' => Arr::first(
                    $explicitAsciiDelimiters,
                    function ($val) {
                        return $val['display'] === false;
                    }
                ),
                'mathren.primary_block_asciimath_delimiter_alias' => Arr::first(
                    $aliasAsciiDelimiters,
                    function ($val) {
                        return $val['display'] === true;
                    }
                ),
                'mathren.primary_inline_asciimath_delimiter_alias' => Arr::first(
                    $aliasAsciiDelimiters,
                    function ($val) {
                        return $val['display'] === false;
                    }
                ),
            ]);
        }

        return $settings;
    }
}

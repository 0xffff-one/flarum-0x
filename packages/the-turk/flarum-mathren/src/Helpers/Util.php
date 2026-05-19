<?php

/*
 * This file is part of MathRen.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\MathRen\Helpers;

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Str;

class Util
{
    const EXPRESSION_PLACEHOLDER = '%e%';

    protected $prefix = 'the-turk-mathren.';

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * Gets the settings variable. Called on Object creation.
     *
     * @param Settings $settings All settings provided by the interface.
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * This method will make prefixed calls easier.
     *
     * @param string $key     The setting key that will be fetched from the db.
     * @param string $default The default value if there is no setting record.
     *
     * @return string
     */
    public function get(string $key, string $default = ''): string
    {
        return $this->settings->get($this->prefix.$key, $default);
    }

    /**
     * KaTeX options those to be used through this extension.
     * `displayMode` will be set on `ConfigureTextFormatter` class.
     *
     * @see    https://katex.org/docs/autorender.html
     *
     * @return array
     */
    public function getKatexOptions(): array
    {
        return [
            'fleqn'            => \boolval($this->get('enable_fleqn')),
            'leqno'            => \boolval($this->get('enable_leqno')),
            'output'           => $this->get('output_mode'),
            'throwOnError'     => \boolval($this->get('throw_on_error')),
            'errorColor'       => $this->get('error_color'),
            'minRuleThickness' => \floatval($this->get('min_rule_thickness')),
            'maxSize'          => \floatval($this->get('max_size')),
            'maxExpand'        => \intval($this->get('max_expand')),
            'macros'           => \json_decode('{'.$this->get('macros').'}'),
            'colorIsTextColor' => \boolval($this->get('color_is_text_color')),
        ];
    }

    /**
     * Create a classes array that will be used to wrap expressions.
     *
     * @return array
     */
    public function getClasses(): array
    {
        return [
            // class for block expressions [displayMode: true]
            'block' => 'mathren-block',

            // class for inline expressions [displayMode: false]
            'inline' => 'mathren-inline',
        ];
    }

    /**
     * Create a delimiters array that categorized by their type.
     *
     * @return array
     */
    private function _getDelimitersByType(): array
    {
        return [
            'block'            => $this->_commaToArray($this->get('block_delimiters')),
            'blockAscii'       => $this->_commaToArray($this->get('block_asciimath_delimiters')),
            'inline'           => $this->_commaToArray($this->get('inline_delimiters')),
            'inlineAscii'      => $this->_commaToArray($this->get('inline_asciimath_delimiters')),
            'aliasBlock'       => $this->_commaToArray($this->get('alias_block_delimiters')),
            'aliasBlockAscii'  => $this->_commaToArray($this->get('alias_block_asciimath_delimiters')),
            'aliasInline'      => $this->_commaToArray($this->get('alias_inline_delimiters')),
            'aliasInlineAscii' => $this->_commaToArray($this->get('alias_inline_asciimath_delimiters')),
        ];
    }

    /**
     * This function creates an array of delimiters to be used in various places.
     * Its elements are also an array and looks like this:
     * [[left] => '[math]', [right] => '[/math]', [display] => true]
     * ^ they're created by `$this->_setOptions();`.
     *
     * @param string $type                 The delimiter type that we're creating an array for.
     *                                     Accepted types are `bbcode` and `alias`. If not set,
     *                                     returning array will include all delimiters.
     * @param bool   $isAsciiMathDelimiter To check whether it's an AsciiMath delimiter.
     *
     * @return array
     */
    public function getDelimitersWithOptions(string $type, bool $isAsciiMathDelimiter = false): array
    {
        $categorizedDelimiters = $this->_getDelimitersByType();
        $delimitersWithOptions = [];
        $desiredKeys = [];

        switch ($type) {
            case 'bbcode':
                if ($isAsciiMathDelimiter) {
                    $desiredKeys = ['blockAscii', 'inlineAscii'];
                } else {
                    $desiredKeys = ['block', 'inline'];
                }
                break;
            case 'alias':
                if ($isAsciiMathDelimiter) {
                    $desiredKeys = ['aliasBlockAscii', 'aliasInlineAscii'];
                } else {
                    $desiredKeys = ['aliasBlock', 'aliasInline'];
                }
                break;
            default:
                if ($isAsciiMathDelimiter) {
                    $desiredKeys = ['blockAscii', 'aliasBlockAscii', 'inlineAscii', 'aliasInlineAscii'];
                } else {
                    $desiredKeys = ['block', 'inline', 'aliasBlock', 'aliasInline'];
                }
                break;
        }

        foreach ($categorizedDelimiters as $key => $delimiterArray) {
            if (!in_array($key, $desiredKeys)) {
                continue;
            }

            $displayMode = in_array($key, ['block', 'blockAscii', 'aliasBlock', 'aliasBlockAscii']);

            foreach ($delimiterArray as $delimiter) {
                $delimitersWithOptions = array_merge(
                    $delimitersWithOptions,
                    $this->_setOptions($delimiter, $displayMode, $isAsciiMathDelimiter)
                );
            }

            // Render AMS environments even if outside our delimiters.
            if ($type == 'alias') {
                $environments = ['equation', 'align', 'alignat', 'gather', 'CD'];

                foreach ($environments as $environment) {
                    array_push(
                        $delimitersWithOptions,
                        [
                            'left'    => '\\\begin{'.$environment.'}',
                            'right'   => '\\\end{'.$environment.'}',
                            'display' => true,
                            'ascii'   => false,
                        ]
                    );
                }
            }
        }

        return $delimitersWithOptions;
    }

    /**
     * Creates delimiter list with options (left, right, display).
     *
     * @param string $syntax      The delimiter syntax that
     *                            also including the expression placeholder.
     *                            i.e. `[math]%e%[/math]`
     * @param bool   $displayMode To check whether it's a block or inline delimiter.
     * @param bool   $asciiMath   To check whether it's an AsciiMath delimiter.
     *
     * @return array
     */
    private function _setOptions(string $syntax, bool $displayMode = false, bool $asciiMath = false): array
    {
        $r = [];

        // left delimiter
        $left = Str::before($syntax, self::EXPRESSION_PLACEHOLDER);

        // right delimiter
        $right = Str::after($syntax, self::EXPRESSION_PLACEHOLDER);

        array_push(
            $r,
            [
                'left'    => $left,
                'right'   => $right,
                'display' => $displayMode,
                'ascii'   => $asciiMath,
            ]
        );

        return $r;
    }

    /**
     * Converts comma seperated list into an array.
     *
     * @param string $list The list to be seperated.
     *
     * @return array
     */
    private function _commaToArray(string $list): array
    {
        $r = [];

        if (!empty($list)) {
            $r = array_filter(preg_split('/[\s,]+/', trim($list)));
        }

        // remove duplicated values
        return array_unique($r);
    }
}

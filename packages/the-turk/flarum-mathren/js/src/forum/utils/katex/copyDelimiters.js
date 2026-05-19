/*
 * This file is part of MathRen.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Define delimiters those will be used in `copy-tex` plugin
// see https://github.com/KaTeX/KaTeX/blob/master/contrib/copy-tex/katex2tex.js#L1-L5
export default function copyDelimiters(delimiters) {
  return {
    inline: [delimiters.inline.left, delimiters.inline.right],
    display: [delimiters.block.left, delimiters.block.right],
  };
}

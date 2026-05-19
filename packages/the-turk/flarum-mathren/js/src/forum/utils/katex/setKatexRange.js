/*
 * This file is part of MathRen.
 *
 * Original Copyright Khan Academy. Licensed under the MIT License.
 * See license text at https://github.com/KaTeX/KaTeX/blob/master/LICENSE.
 */

function closestKatex(node) {
  // If node is a Text Node, for example, go up to containing Element,
  // where we can apply the `closest` method.
  const element = node instanceof Element ? node : node.parentElement;
  return element && element.closest('.katex');
}

export default function setKatexRange(range) {
  // When start point is within a formula, expand to entire formula.
  const startKatex = closestKatex(range.startContainer);
  if (startKatex) {
    range.setStartBefore(startKatex);
  }

  // Similarly, when end point is within a formula, expand to entire formula.
  const endKatex = closestKatex(range.endContainer);
  if (endKatex) {
    range.setEndAfter(endKatex);
  }
}

/*
 * This file is part of MathRen.
 *
 * Original Copyright Khan Academy. Licensed under the MIT License.
 * See license text at https://github.com/KaTeX/KaTeX/blob/master/LICENSE.
 */

import splitAtDelimiters from './splitAtDelimiters';

const replaceDelimitersInText = function (text, options) {
  const data = splitAtDelimiters(text, options.splitAtDelimiters);

  if (data.length === 1 && data[0].type === 'text') {
    // There is no formula in the text.
    // Let's return null which means there is no need to replace
    // the current text node with a new one.
    return null;
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'text') {
      fragment.appendChild(document.createTextNode(data[i].data));
    } else {
      const span = document.createElement('span');
      const math = data[i].data;
      const displayMode = data[i].display === true;
      const asciiMath = data[i].ascii === true;
      const delimiter = displayMode
        ? asciiMath
          ? options.primaryBlockAsciiMathDelimiter
          : options.primaryBlockDelimiter
        : asciiMath
        ? options.primaryInlineAsciiMathDelimiter
        : options.primaryInlineDelimiter;

      span.textContent = delimiter['left'] + math + delimiter['right'];

      fragment.appendChild(span);
    }
  }

  return fragment;
};

/**
 * We'll match with math expressions and replace their
 * BBCode delimiters `[math]...[/math]` with their aliases `($$...$$)`.
 * This function should only be called when we set the
 * `aliases_as_primary` setting to true from the settings page.
 *
 * @param elem    The element that we are looking for math expressions in it.
 * @param options Contains primary replacer delimiter information.
 *
 * @return { string }
 */
const delimiterReplacer = function (elem, options, returnAsText) {
  for (let i = 0; i < elem.childNodes.length; i++) {
    const childNode = elem.childNodes[i];

    if (childNode.nodeType === 3) {
      // Text node
      const frag = replaceDelimitersInText(childNode.textContent, options);

      if (frag) {
        i += frag.childNodes.length - 1;
        elem.replaceChild(frag, childNode);
      }
    } else if (childNode.nodeType === 1) {
      delimiterReplacer(childNode, options);
    }
    // Otherwise, it's something else, and ignore it.
  }

  return returnAsText === true ? elem.innerText : elem;
};

export default delimiterReplacer;

/*
 * This file is part of MathRen.
 *
 * Original Copyright Khan Academy. Licensed under the MIT License.
 * See license text at https://github.com/KaTeX/KaTeX/blob/master/LICENSE.
 */

import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/common/components/DiscussionPage';

import copyDelimiters from './utils/katex/copyDelimiters';
import katexReplaceWithTex from './utils/katex/katex2tex';
import getPrimaryDelimiters from './utils/katex/getPrimaryDelimiters';
import setKatexRange from './utils/katex/setKatexRange';

export default function addCopyListener() {
  extend(DiscussionPage.prototype, 'oncreate', function () {
    if (!app.forum.attribute('mathren.enable_copy_tex')) return;

    const delimiters = getPrimaryDelimiters.bind(this, app.forum)();

    // Global copy handler to modify behavior on .katex elements.
    document.addEventListener('copy', function (event) {
      const selection = window.getSelection();

      if (selection.isCollapsed || !event.clipboardData) {
        return; // default action OK if selection is empty or unchangeable
      }
      const clipboardData = event.clipboardData;
      const range = selection.getRangeAt(0);

      setKatexRange(range);

      const fragment = range.cloneContents();

      if (!fragment.querySelector('.katex-mathml')) {
        return; // default action OK if no .katex-mathml elements
      }

      const htmlContents = Array.prototype.map.call(fragment.childNodes, (el) => (el instanceof Text ? el.textContent : el.outerHTML)).join('');

      // Preserve usual HTML copy/paste behavior.
      clipboardData.setData('text/html', htmlContents);
      // Rewrite plain-text version.
      clipboardData.setData('text/plain', katexReplaceWithTex(fragment, copyDelimiters(delimiters)).textContent);
      // Prevent normal copy handling.
      event.preventDefault();
    });
  });
}

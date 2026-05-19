/*
 * This file is part of MathRen.
 *
 * Original Copyright Stichting Flarum (Flarum Foundation), Toby Zerner (toby.zerner@gmail.com).
 * Licensed under the MIT License. See license text at https://github.com/flarum/mentions/blob/master/LICENSE.
 */

import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/common/components/CommentPost';

import copyDelimiters from './utils/katex/copyDelimiters';
import getPrimaryDelimiters from './utils/katex/getPrimaryDelimiters';
import selectedText from './utils/mentions/selectedText';

export default function addPostQuoteButton() {
  extend(CommentPost.prototype, 'oncreate', function () {
    // "flarum-mentions" is required for showing the Quote button.
    // Main cause of this, the user may not want to use Quote button Flarum-wide.
    // If they using "flarum-mentions" then they're okay with that button.
    if (!('flarum-mentions' in flarum.extensions) || !app.forum.attribute('mathren.enable_copy_tex')) return;

    const PostQuoteButton = require('flarum/mentions/fragments/PostQuoteButton');

    const post = this.attrs.post;
    const delimiters = getPrimaryDelimiters.bind(this, app.forum)();

    if (post.isHidden() || (app.session.user && !post.discussion().canReply())) return;

    const $postBody = this.$('.Post-body');

    // Wrap the quote button in a wrapper element so that we can render
    // button into it.
    const $container = $('<div class="MathRen-quoteButtonContainer"></div>');

    const button = new PostQuoteButton(post);

    const handler = function (e) {
      setTimeout(() => {
        const content = selectedText($postBody, copyDelimiters(delimiters));
        if (content) {
          button.content = content;
          m.render($container[0], button.render());

          const rects = window.getSelection().getRangeAt(0).getClientRects();
          const firstRect = rects[0];

          if (e.clientY < firstRect.bottom && e.clientX - firstRect.right < firstRect.left - e.clientX) {
            button.showStart(firstRect.left, firstRect.top);
          } else {
            const lastRect = rects[rects.length - 1];
            button.showEnd(lastRect.right, lastRect.bottom);
          }
        }
      }, 1);
    };

    this.$().after($container).on('mouseup', handler);

    if ('ontouchstart' in window) {
      document.addEventListener('selectionchange', handler, false);
    }
  });
}

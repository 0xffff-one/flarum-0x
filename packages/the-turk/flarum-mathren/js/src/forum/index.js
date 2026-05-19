/*
 * This file is part of MathRen.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extend, override } from 'flarum/common/extend';

import app from 'flarum/common/app';
import Page from 'flarum/common/components/Page';
import TextEditor from 'flarum/common/components/TextEditor';

import addCopyListener from './addCopyListener';
import addPostQuoteButton from './addPostQuoteButton';
import addTextEditorButton from './addTextEditorButton';
import delimiterReplacer from './utils/katex/delimiterReplacer';
import getPrimaryDelimiters from './utils/katex/getPrimaryDelimiters';
import getFlarumComposers from './utils/getFlarumComposers';

app.initializers.add(
  'the-turk-mathren',
  () => {
    /**
     * Replaces delimiters within a text.
     *
     * @param text    Text that has delimiters to replace.
     *                Might contain line breaks in it.
     * @param reverse True if we're replacing delimiters from
     *                BBCode `[math]...[/math]` to aliases `$$...$$`.
     *
     * @return { string }
     **/
    const replaceDelimiters = (text = '', reverse = false, returnAsText = true) => {
      const span = document.createElement('span');

      // using `span.innerText` destroys line breaks
      // using `span.innerHTML` introduces security concerns
      span.textContent = text;

      return delimiterReplacer(span, delimiterReplacerOptions(reverse), returnAsText);
    };

    /**
     * Wrapping expressions with `code` should preserve alias delimiters
     * if `aliases_as_primary` set to true.
     *
     * @param element The element that we're seeking code nodes inside.
     *
     * @see https://github.com/the-turk/flarum-mathren/issues/27
     * @see https://github.com/s9e/TextFormatter/issues/166
     **/
    const preserveAliasesInCodeTag = (element) => {
      if (!app.forum.attribute('mathren.aliases_as_primary')) return;

      const codeNodeList = element.querySelectorAll('code');

      // using `c.innerText` destroys line breaks
      // using `c.innerHTML` introduces security concerns
      codeNodeList.forEach((c) => {
        // don't break code highlighting
        if (c.classList.contains('hljs')) return;

        c.textContent = replaceDelimiters(c.textContent, true);
      });
    };

    /**
     * Options those will be used in `delimiterReplacer()` function.
     *
     * @param reverse True if we're replacing delimiters from
     *                BBCode `[math]...[/math]` to aliases `$$...$$`.
     *
     * @return { Object }
     **/
    const delimiterReplacerOptions = (reverse = false) => {
      const primaryDelimiters = getPrimaryDelimiters.bind(this, app.forum, !reverse)();
      const bbDelimiters = app.forum.attribute('mathren.bbcode_delimiters');
      const explicitBBDelimiters = app.forum.attribute('mathren.explicit_bbcode_delimiters');
      const aliasDelimiters = app.forum.attribute('mathren.alias_delimiters');
      const splitAtDelimiters = reverse ? bbDelimiters.concat(explicitBBDelimiters) : aliasDelimiters;

      let options = {
        primaryBlockDelimiter: primaryDelimiters.block,
        primaryInlineDelimiter: primaryDelimiters.inline,
        splitAtDelimiters,
      };

      if (app.forum.attribute('mathren.allow_asciimath')) {
        options['primaryBlockAsciiMathDelimiter'] = primaryDelimiters.block_asciimath;
        options['primaryInlineAsciiMathDelimiter'] = primaryDelimiters.inline_asciimath;
      }

      return options;
    };

    /**
     * Show a quote button when post text is selected.
     *
     * We have to run KaTeX's copy-tex plugin on the selected post
     * for returning the source of KaTeX expression when the user clicks
     * the "Quote" button (which comes with the `flarum/mentions` extension).
     * To achieve that, we need to modify the extension's `selectedText` function.
     * Doing that from another extension seems not possible at the moment, so
     * all we do is replicate its "Quote" button functions and showing our
     * button instead of theirs.
     **/
    addPostQuoteButton();

    // Add text editor buttons.
    addTextEditorButton();

    // Hook into global copy handler to modify behavior on `.katex` elements.
    addCopyListener();

    extend(Page.prototype, ['oncreate', 'onupdate'], () => preserveAliasesInCodeTag(document));

    // Replace alias delimiters with BBCode delimiters in preview mode
    // so the `TextFormatter` can render them using BBCode definitions.
    if (s9e && s9e.TextFormatter) {
      override(s9e.TextFormatter, 'preview', function (original, preview, element) {
        original(replaceDelimiters(preview), element);
        preserveAliasesInCodeTag(element);
      });
    }

    // Replace alias delimiters with BBCode delimiters `onsubmit`
    // because they must be saved with BBCode delimiters. Keep in mind that
    // we strictly need BBCode tags (and their `ignoreTags()` method) to support Markdown.
    getFlarumComposers().forEach((composer) => {
      override(composer.prototype, 'onsubmit', function (original) {
        this.composer.fields.content(replaceDelimiters(this.composer.fields.content()));
        original();
      });
    });

    // Replace BBCode delimiters with alias delimiters if `aliases_as_primary` set to true.
    extend(TextEditor.prototype, 'oncreate', function (original, vnode) {
      const $textarea = vnode.dom.querySelector('textarea');
      const composerClass = app.composer.body.componentClass;

      if (getFlarumComposers().indexOf(composerClass) === -1) {
        // If this isn't a native Flarum composer (i.e. it created by an extension)
        // then we will replace alias delimiters with BBCode ones on the fly.
        // Because it seems there is no way to manipulate their `onsubmit` call
        // as we did for native Flarum composers above.
        $textarea.addEventListener('input', function () {
          $textarea.value = replaceDelimiters($textarea.value);
        });
      } else {
        // This is a native Flarum composer and its BBCode delimiters should be
        // replaced with alias delimiters if `aliases_as_primary` set to true.
        // This will take effect on the `EditPostComposer` only at this point
        // because other native composers are empty by default.
        if (!app.forum.attribute('mathren.aliases_as_primary')) return;
        $textarea.value = replaceDelimiters(this.value, true);
      }
    });
  },
  -500 // since we're overriding things...
);

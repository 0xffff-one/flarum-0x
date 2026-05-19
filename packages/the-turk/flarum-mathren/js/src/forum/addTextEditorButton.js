/*
 * This file is part of MathRen.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extend } from 'flarum/common/extend';
import TextEditor from 'flarum/components/TextEditor';

import TextEditorButton from './components/TextEditorButton';

export default function addTextEditorButton() {
  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    if (app.forum.attribute('mathren.enable_editor_buttons') === true) {
      items.add('the-turk-mathren', <TextEditorButton textEditor={this.attrs.composer.editor} />);
    }
  });
}

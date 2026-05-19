/*
 * This file is part of MathRen.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extend } from 'flarum/common/extend';

import app from 'flarum/common/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';

app.initializers.add('the-turk-mathren', (app) => {
  extend(ExtensionPage.prototype, 'sections', function (items) {
    if (this.extension.id != 'the-turk-mathren') return;

    items.has('permissions') ? items.remove('permissions') : '';
  });

  app.extensionData.for('the-turk-mathren').registerSetting(function () {
    return (
      <div className="MathRen-SettingsContainer">
        <div className="MathRen-KatexOptions">
          <h3>{app.translator.trans('the-turk-mathren.admin.settings.katex_options_heading')}</h3>
          <hr />
          <h4>{app.translator.trans('the-turk-mathren.admin.settings.delimiters_label')}</h4>
          <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.delimiters_text')}</div>
          <div className="helpText">
            <i className="fa-icon fas fa-exclamation-circle" />
            {app.translator.trans('the-turk-mathren.admin.settings.bbcode_delimiters_rule_text')}
          </div>
          <div className="MathRen--flex Mathren--binary">
            <div className="MathRen--delimiterGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.block_delimiters_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('the-turk-mathren.block_delimiters')} placeholder="[math]%e%[/math]" />
              </div>
            </div>
            <div className="MathRen--delimiterGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.block_asciimath_delimiters_text')}</div>
              <div className="Form-group">
                <input
                  className="FormControl"
                  type="text"
                  bidi={this.setting('the-turk-mathren.block_asciimath_delimiters')}
                  placeholder="[asmath]%e%[asmath]"
                />
              </div>
            </div>
          </div>
          <div className="MathRen--flex">
            <div className="MathRen--delimiterGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.inline_delimiters_text')}</div>
              <div className="Form-group">
                <input
                  className="FormControl"
                  type="text"
                  bidi={this.setting('the-turk-mathren.inline_delimiters')}
                  placeholder="[imath]%e%[/imath]"
                />
              </div>
            </div>
            <div className="MathRen--delimiterGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.inline_asciimath_delimiters_text')}</div>
              <div className="Form-group">
                <input
                  className="FormControl"
                  type="text"
                  bidi={this.setting('the-turk-mathren.inline_asciimath_delimiters')}
                  placeholder="[iasmath]%e%[iasmath]"
                />
              </div>
            </div>
          </div>
          <div className="MathRen--flex">
            <div className="MathRen--delimiterGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.alias_block_delimiters_text')}</div>
              <div className="Form-group">
                <input
                  className="FormControl"
                  type="text"
                  bidi={this.setting('the-turk-mathren.alias_block_delimiters')}
                  placeholder="$$%e%$$,₺₺%e%₺₺"
                />
              </div>
            </div>
            <div className="MathRen--delimiterGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.alias_block_asciimath_delimiters_text')}</div>
              <div className="Form-group">
                <input
                  className="FormControl"
                  type="text"
                  bidi={this.setting('the-turk-mathren.alias_block_asciimath_delimiters')}
                  placeholder="\$%e%\$"
                />
              </div>
            </div>
          </div>
          <div className="MathRen--flex">
            <div className="MathRen--delimiterGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.alias_inline_delimiters_text')}</div>
              <div className="Form-group">
                <input type="text" className="FormControl" bidi={this.setting('the-turk-mathren.alias_inline_delimiters')} placeholder="\(%e%\)" />
              </div>
            </div>
            <div className="MathRen--delimiterGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.alias_inline_asciimath_delimiters_text')}</div>
              <div className="Form-group">
                <input
                  type="text"
                  className="FormControl"
                  bidi={this.setting('the-turk-mathren.alias_inline_asciimath_delimiters')}
                  placeholder="\{%e%\}"
                />
              </div>
            </div>
          </div>
          <div className="helpText">
            <i className="fa-icon fas fa-exclamation-circle" />
            {app.translator.trans('the-turk-mathren.admin.settings.primary_delimiters_text')}
          </div>
          <div className="MathRen--flex">
            <div className="Form-group">
              <label>{app.translator.trans('the-turk-mathren.admin.settings.output_mode_label')}</label>
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.output_mode_text')}</div>
            </div>
            <div className="Form-group">
              <Select
                value={this.setting(['the-turk-mathren.output_mode'])()}
                options={{
                  html: 'HTML',
                  mathml: 'MathML',
                  htmlAndMathml: 'HTML & MathML',
                }}
                buttonClassName="Button"
                onchange={this.settings['the-turk-mathren.output_mode']}
              />
            </div>
          </div>
          <div className="Form-group">
            <Switch
              state={!!this.setting(['the-turk-mathren.enable_fleqn'])() && this.setting(['the-turk-mathren.enable_fleqn'])() !== '0'}
              onchange={this.settings['the-turk-mathren.enable_fleqn']}
            >
              {app.translator.trans('the-turk-mathren.admin.settings.enable_fleqn_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch
              state={!!this.setting(['the-turk-mathren.enable_leqno'])() && this.setting(['the-turk-mathren.enable_leqno'])() !== '0'}
              onchange={this.settings['the-turk-mathren.enable_leqno']}
            >
              {app.translator.trans('the-turk-mathren.admin.settings.enable_leqno_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch
              state={!!this.setting(['the-turk-mathren.color_is_text_color'])() && this.setting(['the-turk-mathren.color_is_text_color'])() !== '0'}
              onchange={this.settings['the-turk-mathren.color_is_text_color']}
            >
              {app.translator.trans('the-turk-mathren.admin.settings.color_is_text_color_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch
              state={!!this.setting(['the-turk-mathren.throw_on_error'])() && this.setting(['the-turk-mathren.throw_on_error'])() !== '0'}
              onchange={this.settings['the-turk-mathren.throw_on_error']}
            >
              {app.translator.trans('the-turk-mathren.admin.settings.throw_on_error_label')}
            </Switch>
          </div>
          <div className="MathRen--flex">
            <div className="Form-group">
              <label>{app.translator.trans('the-turk-mathren.admin.settings.error_color_label')}</label>
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.error_color_text')}</div>
            </div>
            <div className="Form-group">
              <input type="color" className="FormControl" bidi={this.setting('the-turk-mathren.error_color')} />
            </div>
          </div>
          <h4>{app.translator.trans('the-turk-mathren.admin.settings.sizing_options_heading')}</h4>
          <div className="MathRen--flex">
            <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.minimum_thickness_text')}</div>
            <div className="Form-group">
              <input
                type="number"
                lang="en-US"
                min="0"
                step=".01"
                className="FormControl"
                bidi={this.setting('the-turk-mathren.min_rule_thickness')}
                placeholder="0.05"
              />
            </div>
          </div>
          <div className="MathRen--flex">
            <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.maximum_size_text')}</div>
            <div className="Form-group">
              <input type="number" min="0" className="FormControl" bidi={this.setting('the-turk-mathren.max_size')} placeholder="10" />
            </div>
          </div>
          <div className="Form-group">
            <label>{app.translator.trans('the-turk-mathren.admin.settings.macros_label')}</label>
            <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.macros_text')}</div>
            <div className="helpText">
              <i className="fa-icon fas fa-exclamation-circle" />
              {app.translator.trans('the-turk-mathren.admin.settings.java_syntax_text')}
            </div>
            <textarea className="FormControl" bidi={this.setting('the-turk-mathren.macros')} placeholder='"\\RR": "\\mathbb{R}"' />
          </div>
          <div className="MathRen--flex">
            <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.maximum_expand_limit_text')}</div>
            <div className="Form-group">
              <input type="number" min="0" className="FormControl" bidi={this.setting('the-turk-mathren.max_expand')} placeholder="1000" />
            </div>
          </div>
        </div>
        <div className="MathRen-CDNOptions">
          <h3>{app.translator.trans('the-turk-mathren.admin.settings.cdn_options_heading')}</h3>
          <hr />
          <div className="MathRen--flex Mathren--binary">
            <div className="MathRen--cdnGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.cdn_katex_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('the-turk-mathren.cdn_katex')} />
              </div>
            </div>
            <div className="MathRen--cdnGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.sri_katex_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('the-turk-mathren.sri_katex')} />
              </div>
            </div>
          </div>
          <div className="MathRen--flex Mathren--binary">
            <div className="MathRen--cdnGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.cdn_asciimath2tex_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('the-turk-mathren.cdn_asciimath2tex')} />
              </div>
            </div>
            <div className="MathRen--cdnGroup">
              <div className="helpText">{app.translator.trans('the-turk-mathren.admin.settings.sri_asciimath2tex_text')}</div>
              <div className="Form-group">
                <input className="FormControl" type="text" bidi={this.setting('the-turk-mathren.sri_asciimath2tex')} />
              </div>
            </div>
          </div>
        </div>
        <div className="MathRen-OtherOptions">
          <h3>{app.translator.trans('the-turk-mathren.admin.settings.other_options_heading')}</h3>
          <hr />
          <div className="Form-group">
            <Switch
              state={
                !!this.setting(['the-turk-mathren.enable_editor_buttons'])() && this.setting(['the-turk-mathren.enable_editor_buttons'])() !== '0'
              }
              onchange={this.settings['the-turk-mathren.enable_editor_buttons']}
            >
              {app.translator.trans('the-turk-mathren.admin.settings.enable_editor_buttons_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch
              state={!!this.setting(['the-turk-mathren.aliases_as_primary'])() && this.setting(['the-turk-mathren.aliases_as_primary'])() !== '0'}
              onchange={this.settings['the-turk-mathren.aliases_as_primary']}
            >
              {app.translator.trans('the-turk-mathren.admin.settings.aliases_as_primary_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch
              state={!!this.setting(['the-turk-mathren.allow_asciimath'])() && this.setting(['the-turk-mathren.allow_asciimath'])() !== '0'}
              onchange={this.settings['the-turk-mathren.allow_asciimath']}
            >
              {app.translator.trans('the-turk-mathren.admin.settings.allow_asciimath_label')}
            </Switch>
          </div>
          <div className="Form-group">
            <Switch
              state={!!this.setting(['the-turk-mathren.enable_copy_tex'])() && this.setting(['the-turk-mathren.enable_copy_tex'])() !== '0'}
              onchange={this.settings['the-turk-mathren.enable_copy_tex']}
            >
              {app.translator.trans('the-turk-mathren.admin.settings.enable_copy_tex_label')}
            </Switch>
          </div>
          <div className="helpText">
            <i className="fa-icon fas fa-exclamation-circle" />
            {app.translator.trans('the-turk-mathren.admin.settings.quote_button_text')}
          </div>
        </div>
      </div>
    );
  });
});

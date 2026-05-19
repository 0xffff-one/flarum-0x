import app from 'flarum/common/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';

// just to make things easier
const settingsPrefix = 'the-turk-diff.';
const localePrefix = 'the-turk-diff.admin.settings.';

export default class DiffSettingsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);
  }

  content() {
    return [
      m('.container', [
        m('.DiffSettingsPage', [
          m('.Form-group', [
            m(
              'label',
              Switch.component(
                {
                  state: this.setting(settingsPrefix + 'mainPostOnly', '0')() === '1',
                  onchange: (value) => {
                    this.setting(settingsPrefix + 'mainPostOnly')(value ? '1' : '0');
                  },
                },
                app.translator.trans(localePrefix + 'mainPostOnly')
              )
            ),
          ]),
          m('.Form-group', [
            m(
              'label',
              Switch.component(
                {
                  state: this.setting(settingsPrefix + 'separateBlock', '1')() === '1',
                  onchange: (value) => {
                    this.setting(settingsPrefix + 'separateBlock')(value ? '1' : '0');
                  },
                },
                app.translator.trans(localePrefix + 'separateBlock')
              )
            ),
          ]),
          m('.Form-group', [
            m(
              'label',
              Switch.component(
                {
                  state: this.setting(settingsPrefix + 'textFormatting', '1')() === '1',
                  onchange: (value) => {
                    this.setting(settingsPrefix + 'textFormatting')(value ? '1' : '0');
                  },
                },
                app.translator.trans(localePrefix + 'textFormatting')
              )
            ),
          ]),
          m('.Form-group', [
            m('label', app.translator.trans(localePrefix + 'detailLevel')),
            m(
              'div',
              Select.component({
                options: {
                  none: app.translator.trans(localePrefix + 'noneLevel'),
                  line: app.translator.trans(localePrefix + 'lineLevel'),
                  word: app.translator.trans(localePrefix + 'wordLevel'),
                  char: app.translator.trans(localePrefix + 'charLevel'),
                },
                onchange: this.setting(settingsPrefix + 'detailLevel'),
                value: this.setting(settingsPrefix + 'detailLevel')() || this.setting(settingsPrefix + 'detailLevel')('line'),
              })
            ),
          ]),
          m('.Form-group', [
            m('label', app.translator.trans(localePrefix + 'neighborLines')),
            m('.helpText', app.translator.trans(localePrefix + 'neighborLinesHelp')),
            m(
              'div',
              {
                className: 'helpText',
              },
              m('i', {
                className: 'diffSettingsIcon fas fa-exclamation-circle',
              }),
              m('span', app.translator.trans(localePrefix + 'onlyUnsigned'))
            ),
            m('input[type=text].FormControl', {
              bidi: this.setting(settingsPrefix + 'neighborLines', '2'),
              placeholder: '2',
              style: 'width:25%',
            }),
          ]),
          m('.Form-group', [
            m('label', app.translator.trans(localePrefix + 'mergeThreshold')),
            m('.helpText', app.translator.trans(localePrefix + 'mergeThresholdHelp')),
            m(
              'div',
              {
                className: 'helpText',
              },
              m('i', {
                className: 'diffSettingsIcon fas fa-exclamation-circle',
              }),
              m('span', app.translator.trans(localePrefix + 'usePoint'))
            ),
            m('input[type=text].FormControl', {
              bidi: this.setting(settingsPrefix + 'mergeThreshold', '0.8'),
              placeholder: '0.8',
              style: 'width:25%',
            }),
          ]),
          m('.Form-group', [
            m('label', app.translator.trans(localePrefix + 'dbOptimisation')),
            m('.helpText', app.translator.trans(localePrefix + 'archiveInfo')),
            m(
              'label',
              Switch.component(
                {
                  state: this.setting(settingsPrefix + 'archiveOlds', '0')() === '1',
                  onchange: (value) => {
                    this.setting(settingsPrefix + 'archiveOlds')(value ? '1' : '0');
                  },
                },
                app.translator.trans(localePrefix + 'archiveOlds')
              )
            ),
            m(
              'div',
              {
                className: 'helpText',
              },
              m('span', app.translator.trans(localePrefix + 'archiveOldsInfo'))
            ),
            m(
              'div',
              {
                className: 'helpText',
              },
              m('i', {
                className: 'diffSettingsIcon fas fa-exclamation-circle',
              }),
              m('span', app.translator.trans(localePrefix + 'usePoint'))
            ),
            m(
              'div',
              {
                className: 'diffSettingsFlex',
              },
              m(
                'div',
                m('.Form-group', [
                  m('label', <strong>A:</strong>),
                  m(
                    'div',
                    m('input[type=text].FormControl', {
                      bidi: this.setting(settingsPrefix + 'archiveLimit', '15'),
                      placeholder: '15',
                    })
                  ),
                ])
              ),
              m(
                'div',
                m('.Form-group', [
                  m('label', <strong>m:</strong>),
                  m(
                    'div',
                    m('input[type=text].FormControl', {
                      bidi: this.setting(settingsPrefix + 'archiveSlope', '0.4'),
                      placeholder: '0.4',
                    })
                  ),
                ])
              ),
              m(
                'div',
                m('.Form-group', [
                  m('label', <strong>b:</strong>),
                  m(
                    'div',
                    m('input[type=text].FormControl', {
                      bidi: this.setting(settingsPrefix + 'archiveCoefficient', '0'),
                      placeholder: '0',
                    })
                  ),
                ])
              )
            ),
            m(
              'label',
              Switch.component(
                {
                  state: this.setting(settingsPrefix + 'useCrons', '0')() === '1',
                  onchange: (value) => {
                    this.setting(settingsPrefix + 'useCrons')(value ? '1' : '0');
                  },
                },
                app.translator.trans(localePrefix + 'useCrons')
              )
            ),
            m(
              'div',
              {
                className: 'helpText',
              },
              m('i', {
                className: 'diffSettingsIcon fas fa-exclamation-circle',
              }),
              m('span', app.translator.trans(localePrefix + 'useCronsHelp'))
            ),
          ]),
          this.submitButton(),
        ]),
      ]),
    ];
  }
}

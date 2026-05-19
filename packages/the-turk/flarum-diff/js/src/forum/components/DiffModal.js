import app from 'flarum/common/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Tooltip from 'flarum/common/components/Tooltip';
import username from 'flarum/common/helpers/username';
import humanTime from 'flarum/common/helpers/humanTime';
import avatar from 'flarum/common/helpers/avatar';
import extractText from 'flarum/common/utils/extractText';
import redrawPost from '../utils/redrawPost';
import Alert from 'flarum/common/components/Alert';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Dropdown from 'flarum/common/components/Dropdown';
import DiffList from './DiffList';

/**
 * The `DiffModal` component is the main component of this extension.
 * It also contains DiffList components.
 */
export default class DiffModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    /**
     * Whether or not the modal is loading.
     *
     * @type {Boolean}
     */
    this.loading = false;

    /**
     * Whether the modal is showing or not.
     *
     * @type {Boolean}
     */
    this.showing = false;

    /**
     * We will use this to change modal's content when
     * user clicks on a revision on the list.
     *
     * @type {Number|Null}
     */
    this.diffId = null;

    /**
     * This holds information about which revisions are subjects for comparison.
     *
     * @type {Object}
     */
    this.comparisonBetween = JSON.parse(this.attrs.listState.selectedItem.comparisonBetween());
  }

  className() {
    return 'DiffModal';
  }

  title() {
    return [
      // we also should consider deleted users here
      this.attrs.listState.selectedItem.actor().username() ? avatar(this.attrs.listState.selectedItem.actor()) : '',
      this.attrs.listState.selectedItem.revision() != 0
        ? // x edited y ago
          app.translator.trans('the-turk-diff.forum.editedInfo', {
            username: (
              <a href={app.route.user(this.attrs.listState.selectedItem.actor())} config={m.route}>
                {username(this.attrs.listState.selectedItem.actor())}
              </a>
            ),
            ago: humanTime(this.attrs.listState.selectedItem.createdAt()),
          })
        : // x created y ago
          app.translator.trans('the-turk-diff.forum.createdInfo', {
            username: (
              <a href={app.route.user(this.attrs.listState.selectedItem.actor())} config={m.route}>
                {username(this.attrs.listState.selectedItem.actor())}
              </a>
            ),
            ago: humanTime(this.attrs.listState.post.createdAt()),
          }),
    ];
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.config(vnode);
  }

  onupdate(vnode) {
    this.config(vnode);
  }

  config(vnode) {
    // workaround for missing 'in' class on .ModalManager
    // after redrawing the DiffList component.
    // because i'm done with this shit.
    // https://github.com/flarum/core/pull/2080
    if (this.showing && !$('.ModalManager').hasClass('in')) $('.ModalManager').addClass('in');

    // we should re-Initialize this component after user
    // clicks a different revision while modal is open
    if (this.diffId === this.attrs.listState.selectedItem.id()) return;

    this.showing = true;
    this.diffId = this.attrs.listState.selectedItem.id();

    this.comparisonBetween = JSON.parse(this.attrs.listState.selectedItem.comparisonBetween());

    if (this.attrs.listState.selectedItem.revision() != 0 && this.comparisonBetween.new.revision != this.comparisonBetween.old.revision) {
      // we'll use Side By Side renderer as a fallback
      // if there is no renderer choice
      return this.setDiffContent(app.session.user.preferences().diffRenderer ? app.session.user.preferences().diffRenderer : 'sideBySide');
    } else {
      return this.setDiffContent('preview');
    }
  }

  view() {
    return (
      <div className={'Modal modal-dialog ' + this.className()}>
        <div className="Modal-content">
          <div className="Modal-close App-backControl">
            {Button.component({
              icon: 'fas fa-times',
              onclick: this.hide.bind(this),
              className: 'Button Button--icon Button--link',
            })}
          </div>
          {
            // Revision Options Button
          }
          {(this.attrs.listState.post.canDeleteEditHistory() &&
            this.attrs.listState.selectedItem.revision() != this.attrs.listState.post.revisionCount()) ||
          (this.attrs.listState.post.canRollbackEditHistory() && this.$('.DeletedDiff').length != this.attrs.listState.post.revisionCount()) ? (
            <Dropdown
              className="diffCotrollerDropdown App-primaryControl"
              icon="fas fa-ellipsis-v"
              buttonClassName="Button"
              menuClassName="Dropdown-menu--right"
              label={app.translator.trans('the-turk-diff.forum.optionsButton')}
            >
              {
                // Rollback
                // there must be a revision to rollback,
                // as we can't rollback to current post.
              }
              {this.attrs.listState.post.canRollbackEditHistory() && this.comparisonBetween.old.diffId
                ? Button.component(
                    {
                      icon: 'fas fa-reply',
                      onclick: () => {
                        if (
                          confirm(
                            app.translator.trans('the-turk-diff.forum.confirmRollback', {
                              number: this.attrs.listState.selectedItem.revision(),
                            })
                          )
                        ) {
                          this.loading = true;
                          m.redraw();

                          let rollbackTo =
                            this.attrs.listState.selectedItem.revision() == this.attrs.listState.post.revisionCount()
                              ? this.comparisonBetween.old.diffId
                              : this.attrs.listState.selectedItem.id();

                          app
                            .request({
                              url: `${app.forum.attribute('apiUrl')}/diff/${rollbackTo}`,
                              method: 'POST',
                            })
                            .then(() => {
                              redrawPost(this.attrs.listState.post);
                              app.modal.close();

                              if (app.cache.diffs && app.cache.diffs[this.attrs.listState.post.id()]) {
                                delete app.cache.diffs[this.attrs.listState.post.id()];
                              }

                              this.showAlert('success', 'rollback');
                            })
                            .catch(() => {
                              this.loading = false;
                              m.redraw();
                              redrawPost(this.attrs.listState.post);

                              this.showAlert('error', 'rollback');
                            });
                        }
                      },
                    },
                    this.attrs.listState.selectedItem.revision() == 0
                      ? /* we're viewing the original content */
                        app.translator.trans('the-turk-diff.forum.rollbackToOriginalButton')
                      : this.attrs.listState.selectedItem.revision() == this.attrs.listState.post.revisionCount()
                      ? this.comparisonBetween.old.revision != 0
                        ? /* we're comparing this revision with current content. */
                          app.translator.trans('the-turk-diff.forum.revertChangesButton')
                        : /* we're comparing this revision with original content */
                          app.translator.trans('the-turk-diff.forum.rollbackToOriginalButton')
                      : /* we're comparing this revision with another revision */
                        app.translator.trans('the-turk-diff.forum.rollbackButton', {
                          number: this.attrs.listState.selectedItem.revision(),
                        })
                  )
                : ''}

              {
                // Delete
                // you can't delete last item on the list
                // because it's the current post actually.
              }
              {this.attrs.listState.post.canDeleteEditHistory() &&
              this.attrs.listState.selectedItem.revision() != this.attrs.listState.post.revisionCount()
                ? Button.component(
                    {
                      icon: 'far fa-trash-alt',
                      onclick: () => {
                        if (confirm(app.translator.trans('the-turk-diff.forum.confirmDelete'))) {
                          this.loading = true;
                          m.redraw();

                          this.attrs.listState.selectedItem
                            .delete()
                            .then(() => {
                              app.modal.close();

                              if (app.cache.diffs && app.cache.diffs[this.attrs.listState.post.id()]) {
                                delete app.cache.diffs[this.attrs.listState.post.id()];
                              }

                              this.showAlert('success', 'delete');
                            })
                            .catch(() => {
                              this.loading = false;
                              m.redraw();

                              this.showAlert('error', 'delete');
                            });
                        }
                      },
                    },
                    app.translator.trans('the-turk-diff.forum.deleteButton')
                  )
                : ''}
            </Dropdown>
          ) : (
            ''
          )}

          <div className="Modal-header">
            <h3 className="App-titleControl App-titleControl--text">{this.title()}</h3>
          </div>
          {this.content()}
        </div>
      </div>
    );
  }

  content() {
    const revisionCount = this.attrs.listState.post.revisionCount();

    /**
     * `type` is passed to `setDiffContent` and the tooltip.
     */
    const diffSwitches = [
      {
        type: 'inline',
        icon: 'fas fa-grip-lines',
        class: 'inlineView',
      },
      {
        type: 'sideBySide',
        icon: 'fas fa-columns',
        class: 'sideBySideView',
      },
      {
        type: 'combined',
        icon: 'far fa-square',
        class: 'combinedView',
      },
    ];

    return [
      <div className="diff-grid">
        {/* Renderer Switcher Container */}
        <div className="diff-grid-item diff-grid-controls">
          <div className="diffSwitcher">
            {this.attrs.listState.selectedItem.revision() != 0 && this.comparisonBetween.new.revision != this.comparisonBetween.old.revision
              ? diffSwitches.map((switchData) => (
                  <Tooltip showOnFocus={false} text={app.translator.trans(`the-turk-diff.forum.tooltips.${switchData.type}`)}>
                    <div className="tooltip-wrapper">
                      <Button
                        icon={switchData.icon}
                        onclick={() => this.setDiffContent(switchData.type)}
                        className={`Button Button--icon Button--link ${switchData.class}`}
                      />
                    </div>
                  </Tooltip>
                ))
              : ''}
            <Tooltip showOnFocus={false} text={app.translator.trans('the-turk-diff.forum.tooltips.preview')}>
              <div className="tooltip-wrapper">
                <Button icon="far fa-eye" onclick={() => this.setDiffContent('preview')} className="Button Button--icon Button--link diffPreview" />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Comparison Info Container */}
        <div className="diff-grid-item diff-grid-info">
          <div className="revisionInfo">
            <h4>{app.translator.trans('the-turk-diff.forum.revisions', { revisionCount })}</h4>
            <p class="diffInfoContainer" />
          </div>
        </div>

        {/* Revision List Container */}
        <div className="diff-grid-item diff-grid-revisions">
          <DiffList state={this.attrs.listState}></DiffList>
        </div>

        {/* Diffs Container */}
        <div className="diff-grid-item diff-grid-diff">
          <div className="diffContents">
            {
              // .previewContainer is hidden by default
              // we'll do some nasty switches later
            }
            <div
              className={
                'previewContainer Post-body' + (app.forum.attribute('textFormattingForDiffPreviews') === false ? ' diff-skip-formatting' : '')
              }
            >
              {this.renderHtml(this.attrs.listState.selectedItem.data.attributes.previewHtml)}
            </div>
            <div className="diffContainer" />
          </div>
        </div>
        {this.loading ? <LoadingIndicator containerClassName="DiffModal-loading" size="large" /> : ''}
      </div>,
    ];
  }

  /**
   * Slowly scroll to selected revision.
   */
  onready() {
    const $revisions = this.$('.DiffList-content');
    let $selectedItem = this.$('li#parentDiff' + this.attrs.listState.selectedItem.id());

    $revisions.animate({
      scrollTop: $selectedItem.offset().top - $revisions.offset().top + $revisions.scrollTop(),
    });
  }

  /**
   * Show success and error messages for rollback and delete operations.
   *
   * @param {string} type
   * @param {string} key
   */
  showAlert(type, key) {
    const message = {
      success: 'the-turk-diff.forum.' + key + 'SuccessMessage',
      error: 'the-turk-diff.forum.' + key + 'ErrorMessage',
    }[type];

    app.alerts.show(Alert, { type }, app.translator.trans(message));
  }

  /**
   * Render the diff views provided by external lib.
   *
   * do we need to worry about m.trust() function?
   * well, Flarum itself doing the same way for rendering
   * post items as seen on CommentPost.js#L52
   * also, the diff library itself treat all inputs as plain text:
   * https://github.com/jfcherng/php-diff/issues/9#issuecomment-526808774
   * so no need to use additional Sanitizer lib for this operation.
   *
   * @param {string} content
   */
  renderHtml(content) {
    return m.trust(content);
  }

  /**
   * Insert rendered diff views into their container
   * and disable active views' buttons.
   * Disabling buttons is just for indicating
   * so frontend looks good but the backend sucks.
   *
   * @param {string} contentType
   */
  setDiffContent(contentType) {
    let diffContentHtml;
    const $diffContainer = this.$('.diffContainer');
    const $previewContainer = this.$('.previewContainer');

    // buttons
    const $sideBySideButton = this.$('.Button.sideBySideView');
    const $inlineButton = this.$('.Button.inlineView');
    const $combinedButton = this.$('.Button.combinedView');
    const $previewButton = this.$('.Button.diffPreview');

    if (contentType !== 'preview') {
      if (contentType === 'sideBySide') {
        diffContentHtml = this.renderHtml(this.attrs.listState.selectedItem.data.attributes.sideBySideHtml);
        $sideBySideButton.prop('disabled', true);
        // what a dynasty - LOL
        $sideBySideButton.parent().siblings().children().prop('disabled', false);
      } else if (contentType === 'inline') {
        diffContentHtml = this.renderHtml(this.attrs.listState.selectedItem.data.attributes.inlineHtml);
        $inlineButton.prop('disabled', true);
        $inlineButton.parent().siblings().children().prop('disabled', false);
      } else if (contentType === 'combined') {
        diffContentHtml = this.renderHtml(this.attrs.listState.selectedItem.data.attributes.combinedHtml);
        $combinedButton.prop('disabled', true);
        $combinedButton.parent().siblings().children().prop('disabled', false);
      }
    } else {
      $diffContainer.hide();
      this.$('.previewContainer').show();

      $previewButton.prop('disabled', true);
      $previewButton.parent().siblings().children().prop('disabled', false);
      return this.setInfoContent(true);
    }

    if (diffContentHtml) {
      $diffContainer.html(diffContentHtml.children);

      if ($previewContainer.is(':visible')) {
        $diffContainer.show();
        $previewContainer.hide();
      }

      // let's remember their renderer choice
      app.session.user.savePreferences({
        diffRenderer: contentType,
      });

      return this.setInfoContent();
    }

    return;
  }

  /**
   * Set informations about comparisons.
   *
   * @param {Boolean} preview
   */
  setInfoContent(preview = false) {
    const $infoContainer = this.$('.diffInfoContainer');

    let infoContentHtml =
      !preview && this.attrs.listState.selectedItem.revision() != 0 && this.comparisonBetween.new.revision != this.comparisonBetween.old.revision
        ? extractText(
            app.translator.trans('the-turk-diff.forum.differences.sentence', {
              old:
                this.comparisonBetween.old.revision == -1
                  ? /* we're viewing differences between current content and {new} */
                    app.translator.trans('the-turk-diff.forum.differences.currentContent')
                  : this.comparisonBetween.old.revision == 0
                  ? /* we're viewing differences between original content and {new} */
                    app.translator.trans('the-turk-diff.forum.differences.originalContent')
                  : /* we're viewing differences between revision X and {new} */
                    app.translator.trans('the-turk-diff.forum.differences.revisionWithNumber', {
                      number: this.comparisonBetween.old.revision,
                    }),
              new:
                this.comparisonBetween.new.revision == 0
                  ? /* we're viewing differences between {old} and original content */
                    app.translator.trans('the-turk-diff.forum.differences.originalContent')
                  : this.comparisonBetween.new.revision == this.attrs.listState.post.revisionCount()
                  ? /* we're viewing differences between {old} and current content */
                    app.translator.trans('the-turk-diff.forum.differences.currentContent')
                  : /* we're viewing differences between {old} and revision X */
                    app.translator.trans('the-turk-diff.forum.differences.revisionWithNumber', {
                      number: this.comparisonBetween.new.revision,
                    }),
            })
          )
        : extractText(
            app.translator.trans('the-turk-diff.forum.previewMode.sentence', {
              content:
                this.comparisonBetween.new.revision == 0
                  ? /* we're previewing original content */
                    app.translator.trans('the-turk-diff.forum.previewMode.originalContent')
                  : this.comparisonBetween.new.revision == this.attrs.listState.post.revisionCount()
                  ? /* we're previewing current content */
                    app.translator.trans('the-turk-diff.forum.previewMode.currentContent')
                  : /* we're previewing revision X */
                    app.translator.trans('the-turk-diff.forum.previewMode.revisionWithNumber', {
                      number: this.comparisonBetween.new.revision,
                    }),
            })
          );

    return $infoContainer.html(infoContentHtml);
  }
}

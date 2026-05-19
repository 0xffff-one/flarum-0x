import Dropdown from 'flarum/common/components/Dropdown';
import DiffList from './DiffList';
import icon from 'flarum/common/helpers/icon';
import DiffListState from '../states/DiffListState';

/**
 * The `DiffDropdown` component is the entrance point for this extension.
 * It's the component that you see when you click on "Edited" button.
 * It also contains DiffList components.
 */
export default class DiffDropdown extends Dropdown {
  static initAttrs(attrs) {
    attrs.className = 'DiffDropdown';
    attrs.buttonClassName = 'Button Button--link';
    attrs.menuClassName = attrs.menuClassName;
    attrs.label = app.translator.trans('the-turk-diff.forum.editedText');
    attrs.icon = 'fas fa-history';

    super.initAttrs(attrs);
  }

  oninit(vnode) {
    super.oninit(vnode);

    /**
     * The post that we're working with.
     *
     * @type {Post[]}
     */
    this.post = this.attrs.post;

    /**
     * Create a new revision list.
     *
     * @type {DiffListState}
     */
    this.listState = new DiffListState(this.post, false, null);
  }

  getButton() {
    const vdom = super.getButton();

    vdom.attrs.title = this.attrs.label;
    vdom.attrs.onclick = this.onclick.bind(this);

    return vdom;
  }

  getButtonContent() {
    return [
      icon(this.attrs.icon, {
        className: 'Button-icon',
      }),
      <span className="Button-label">{this.attrs.label}</span>,
    ];
  }

  getMenu() {
    const revisionCount = this.attrs.post.revisionCount();

    return (
      <div className={'Dropdown-menu ' + this.attrs.menuClassName}>
        <div className="DiffList-header">
          <h4>
            {/* edited 1 time | edited x times */}
            {app.translator.trans('the-turk-diff.forum.revisionInfo', { revisionCount })}
          </h4>
        </div>
        {this.showing ? <DiffList state={this.listState}></DiffList> : ''}
      </div>
    );
  }

  /**
   * Load revision list.
   */
  onclick() {
    this.listState.load();
  }
}

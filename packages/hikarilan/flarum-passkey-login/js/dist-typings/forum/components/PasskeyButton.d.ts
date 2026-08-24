import Button, { IButtonAttrs } from 'flarum/common/components/Button';
import Mithril from 'mithril';
export default class PasskeyButton extends Button {
    disabled: boolean;
    oncreate(vnode: Mithril.VnodeDOM<IButtonAttrs, this>): Promise<void>;
    view(vnode: Mithril.VnodeDOM<IButtonAttrs, this>): JSX.Element;
}

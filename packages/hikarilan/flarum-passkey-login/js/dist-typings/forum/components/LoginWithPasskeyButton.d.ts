import Mithril from 'mithril';
import { IButtonAttrs } from 'flarum/common/components/Button';
import PasskeyButton from './PasskeyButton';
export default class LoginWithPasskeyButton extends PasskeyButton {
    static initAttrs(attrs: any): void;
    view(vnode: Mithril.VnodeDOM<IButtonAttrs>): JSX.Element;
}

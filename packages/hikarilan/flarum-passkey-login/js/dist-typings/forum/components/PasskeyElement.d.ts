import Component from 'flarum/common/Component';
import Passkey from '../models/Passkey';
import Mithril from 'mithril';
interface IAttrs {
    passkey: Passkey;
}
export default class PasskeyElement extends Component<IAttrs> {
    view(vnode: Mithril.Vnode<IAttrs>): Mithril.Children;
    revoke(): Promise<void>;
}
export {};

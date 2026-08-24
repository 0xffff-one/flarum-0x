import Component, { ComponentAttrs } from 'flarum/common/Component';
import Mithril from 'mithril';
import Passkey from '../models/Passkey';
import ItemList from 'flarum/common/utils/ItemList';
interface IState {
    loading: boolean;
    error: boolean;
}
export default class PasskeySettings extends Component<ComponentAttrs, IState> {
    state: IState;
    oncreate(vnode: Mithril.VnodeDOM<ComponentAttrs, this>): Promise<void>;
    view(vnode: Mithril.Vnode<ComponentAttrs, this>): Mithril.Children;
    loadPasskey(): Promise<void>;
    generatePasskeysList(passkeys: Passkey[]): ItemList<Mithril.Children>;
}
export {};

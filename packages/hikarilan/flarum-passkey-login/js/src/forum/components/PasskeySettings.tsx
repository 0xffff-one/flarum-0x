import app from 'flarum/forum/app';
import Component, {ComponentAttrs} from "flarum/common/Component";
import Mithril from "mithril";
import FieldSet from "flarum/common/components/FieldSet";
import AddPasskeyButton from "./AddPasskeyButton";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import Passkey from "../models/Passkey";
import listItems from "flarum/common/helpers/listItems";
import ItemList from "flarum/common/utils/ItemList";
import PasskeyElement from "./PasskeyElement";

interface IState {
    loading: boolean;
    error: boolean;
}

export default class PasskeySettings extends Component<ComponentAttrs, IState> {

    state: IState = {
        loading: true,
        error: false
    };

    async oncreate(vnode: Mithril.VnodeDOM<ComponentAttrs, IState>): Promise<void> {
        super.oncreate(vnode);
        await this.loadPasskey();
    }

    view(vnode: Mithril.Vnode<ComponentAttrs, IState>): Mithril.Children {
        const passkeys = app.store.all<Passkey>('passkeys');

        return <FieldSet label={app.translator.trans('hikarilan-passkey-login.forum.user.settings.passkeys.title')}>
            <span
                className="helpText">{app.translator.trans('hikarilan-passkey-login.forum.user.settings.passkeys.label')}</span>
            {this.state.loading ? (
                <LoadingIndicator containerClassName="Passkeys-Loading"/>
            ) : this.state.error ? (
                <p>{app.translator.trans('hikarilan-passkey-login.forum.user.settings.passkeys.error')}</p>
            ) : !passkeys.length ? (
                <div className="PasskeyList--empty">{app.translator.trans('core.forum.security.empty_text')}</div>
            ) : (
                <div className="PasskeysList">{listItems(this.generatePasskeysList(passkeys).toArray(), 'div')}</div>
            )}
            <AddPasskeyButton/>
        </FieldSet>
    }

    async loadPasskey() {
        try {
            await app.store.find<Passkey[]>('passkeys');
            m.redraw();
        } catch (e: unknown) {
            this.state.error = true;
            throw e;
        } finally {
            this.state.loading = false;
        }
    }

    generatePasskeysList(passkeys: Passkey[]): ItemList<Mithril.Children> {
        const items = new ItemList<Mithril.Children>();

        passkeys.forEach((passkey) => {
            items.add(passkey.identifier(), <PasskeyElement passkey={passkey}/>);
        });

        return items;
    }

}

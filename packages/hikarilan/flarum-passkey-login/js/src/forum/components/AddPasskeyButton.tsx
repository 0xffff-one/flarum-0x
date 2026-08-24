import app from 'flarum/forum/app';
import Mithril from 'mithril'

import {IButtonAttrs} from "flarum/common/components/Button";
import PasskeyButton from "./PasskeyButton";
import {createPasskeyCredential} from "../hooks/passkey";

export default class AddPasskeyButton extends PasskeyButton {

    static initAttrs(attrs: any) {
        super.initAttrs(attrs);

        attrs.className = `Button`;

        attrs.onclick = async () => {
            await createPasskeyCredential()
        };
    }

    view(vnode: Mithril.VnodeDOM<IButtonAttrs>): JSX.Element {
        // @ts-ignore
        const vdom = super.view(vnode);
        vdom.text = app.translator.trans('hikarilan-passkey-login.forum.user.settings.passkeys.add-new-passkey') as string

        return vdom;
    }
}

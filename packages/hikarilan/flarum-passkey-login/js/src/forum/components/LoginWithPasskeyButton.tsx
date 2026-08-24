import app from 'flarum/forum/app';
import Mithril from 'mithril'

import {IButtonAttrs} from "flarum/common/components/Button";
import PasskeyButton from "./PasskeyButton";
import {validatePasskeyCredential} from "../hooks/passkey";

export default class LoginWithPasskeyButton extends PasskeyButton {

    static initAttrs(attrs: any) {
        super.initAttrs(attrs);

        attrs.className = `Button Button--primary Button--block LogInButton`;

        attrs.onclick = async () => {
            await validatePasskeyCredential()
        };
    }

    view(vnode: Mithril.VnodeDOM<IButtonAttrs>): JSX.Element {
        // @ts-ignore
        const vdom = super.view(vnode);
        vdom.text = app.translator.trans('hikarilan-passkey-login.forum.login.with-passkey') as string

        return vdom;
    }
}

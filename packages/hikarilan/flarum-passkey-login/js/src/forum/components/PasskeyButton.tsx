import Button, {IButtonAttrs} from "flarum/common/components/Button";
import Mithril from "mithril";
import {isAvailable} from "../hooks/passkey";

export default class PasskeyButton extends Button {

    disabled = false;

    async oncreate(vnode: Mithril.VnodeDOM<IButtonAttrs>) {
        super.oncreate(vnode);

        this.disabled = !await isAvailable();
        m.redraw();
    }

    view(vnode: Mithril.VnodeDOM<IButtonAttrs, this>): JSX.Element {
        const vdom = super.view(vnode);
        // @ts-ignore
        vdom.attrs.disabled = this.disabled

        return vdom
    }

}

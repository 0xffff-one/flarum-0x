import app from 'flarum/forum/app';
import Component from "flarum/common/Component";
import Passkey from "../models/Passkey";
import Mithril from "mithril";
import icon from "flarum/common/helpers/icon";
import LabelValue from "flarum/common/components/LabelValue";
import humanTime from "flarum/common/helpers/humanTime";
import Button from "flarum/common/components/Button";

interface IAttrs {
    passkey: Passkey
}

export default class PasskeyElement extends Component<IAttrs> {

    view(vnode: Mithril.Vnode<IAttrs>): Mithril.Children {
        if (!this.attrs.passkey.exists) return null
        return <div className='PasskeysList-item'>
            <div className='PasskeysList-item-icon'>
                {icon('fas fa-key')}
            </div>
            <div className="PasskeysList-item-info">
                <div className="PasskeysList-item-title">
                    <span className="PasskeysList-item-title-main">
                        {this.attrs.passkey.alias()?.length ? this.attrs.passkey.alias() : this.attrs.passkey.identifier()}
                    </span>
                </div>
                <div className="PasskeysList-item-createdAt">
                    <LabelValue label={app.translator.trans('core.forum.security.created')}
                                value={humanTime(this.attrs.passkey.createdAt())}/>
                </div>
                <div className="PasskeysList-item-lastSeenAt">
                    <LabelValue label={app.translator.trans('core.forum.security.last_activity')}
                                value={humanTime(this.attrs.passkey.lastSeenAt())}/>
                </div>
            </div>
            <div className="PasskeysList-item-actions">
                <Button className="Button Button--danger" onclick={() => this.revoke()}>
                    {app.translator.trans(`hikarilan-passkey-login.forum.user.settings.item.revoke`)}
                </Button>
            </div>
        </div>
    }

    async revoke() {
        await this.attrs.passkey.delete()

        app.alerts.show({type: 'success'}, app.translator.trans(`hikarilan-passkey-login.forum.user.settings.item.revoke_success`, {count: 1}));
        m.redraw();
    }

}

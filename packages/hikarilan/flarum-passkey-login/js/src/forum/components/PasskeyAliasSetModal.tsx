import app from 'flarum/forum/app';
import Modal, {IInternalModalAttrs} from 'flarum/common/components/Modal';
import Mithril from "mithril";
import Button from "flarum/common/components/Button";
import Passkey from "../models/Passkey";

interface IAttrs extends IInternalModalAttrs {
    id: string
}

interface IState {
    redraw: boolean
}

export default class PasskeyAliasSetModal extends Modal<IAttrs, IState> {

    state: IState = {
        redraw: false
    };

    className(): string {
        return "passkey-alias-set-modal"
    }

    title(): Mithril.Children {
        return <p>{app.translator.trans("hikarilan-passkey-login.forum.user.settings.alias-modal.title")}</p>
    }

    content(): Mithril.Children {
        return <div className="Modal-body">
            <div className="Form Form--centered">
                <p className="helpText">
                    {app.translator.trans("hikarilan-passkey-login.forum.user.settings.alias-modal.label")}
                </p>
                <div className="Form-group">
                    <input className="FormControl" type="text" name="alias" required minlength="1" maxlength="255"
                           placeholder={window.navigator.platform}
                           disabled={this.loading}/>
                </div>
                <div className="Form-group">
                    <Button className="Button Button--primary Button--block" type="submit" loading={this.loading}>
                        {app.translator.trans('core.forum.change_email.submit_button')}
                    </Button>
                </div>
            </div>
        </div>
    }

    async onsubmit(e: SubmitEvent) {
        e.preventDefault()

        this.loading = true;

        try {
            await (await app.store.find<Passkey>('passkeys', this.attrs.id)).save({
                alias: ((e.target as HTMLFormElement).elements.namedItem('alias') as HTMLInputElement)?.value
            });
            this.state.redraw = true;
        } catch (e: unknown) {
            throw e;
        } finally {
            this.loading = false;
        }

        await this.hide()
    }

    async hide() {
        try {
            super.hide();
            if (!this.state.redraw) {
                await app.store.find<Passkey>('passkeys', this.attrs.id)
                m.redraw();
            }
        } finally {
            this.state.redraw = false;
        }
    }

}

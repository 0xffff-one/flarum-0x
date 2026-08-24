import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Mithril from 'mithril';
interface IAttrs extends IInternalModalAttrs {
    id: string;
}
interface IState {
    redraw: boolean;
}
export default class PasskeyAliasSetModal extends Modal<IAttrs, IState> {
    state: IState;
    className(): string;
    title(): Mithril.Children;
    content(): Mithril.Children;
    onsubmit(e: SubmitEvent): Promise<void>;
    hide(): Promise<void>;
}
export {};

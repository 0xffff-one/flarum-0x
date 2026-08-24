import app from 'flarum/forum/app';
import {extend} from "flarum/common/extend";
import UserSecurityPage from "flarum/forum/components/UserSecurityPage";
import ItemList from "flarum/common/utils/ItemList";
import Mithril from "mithril";
import PasskeySettings from "../components/PasskeySettings";

export default function addPasskeySettings() {
    extend(UserSecurityPage.prototype, 'settingsItems', function (items: ItemList<Mithril.Children>) {
        if (this.user !== app.session.user) {
            return;
        }

        items.add('passkeys', <PasskeySettings/>, 5);
    });
}

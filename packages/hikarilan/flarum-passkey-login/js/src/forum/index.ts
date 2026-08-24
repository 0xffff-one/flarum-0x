import app from 'flarum/forum/app';
import addPasskeyButton from "./extenders/add_passkey_button";
import addPasskeySettings from "./extenders/add_passkey_settings";

export {default as extend} from './extend';

app.initializers.add('hikarilan/flarum-passkey-login', () => {
    addPasskeyButton()
    addPasskeySettings()
});

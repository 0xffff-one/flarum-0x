import Extend from 'flarum/common/extenders';
import Passkey from "./models/Passkey";

export default [
    new Extend.Store()
        .add('passkeys', Passkey),
];

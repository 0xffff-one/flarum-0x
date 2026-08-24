import {extend} from 'flarum/common/extend';
import LogInButtons from 'flarum/forum/components/LogInButtons';
import LoginWithPasskeyButton from "../components/LoginWithPasskeyButton";

export default function addPasskeyButton() {
  extend(LogInButtons.prototype, 'items', function (items) {
    items.add(
        "login-with-passkey",
        <LoginWithPasskeyButton/>,
        1
    );
  });

}

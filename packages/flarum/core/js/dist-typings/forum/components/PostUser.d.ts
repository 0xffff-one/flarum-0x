/**
 * The `PostUser` component shows the avatar and username of a post's author.
 *
 * ### Attrs
 *
 * - `post`
 */
export default class PostUser extends Component<import("../../common/Component").ComponentAttrs, undefined> {
    constructor();
    view(): JSX.Element;
    noUserViewItems(user: any): ItemList<any>;
    userViewItems(user: any, post: any): ItemList<any>;
    linkChildren(user: any): ItemList<any>;
    oncreate(vnode: any): void;
    /**
     * Show the user card.
     */
    showCard(): void;
    /**
     * Hide the user card.
     */
    hideCard(): void;
}
import Component from "../../common/Component";
import ItemList from "../../common/utils/ItemList";

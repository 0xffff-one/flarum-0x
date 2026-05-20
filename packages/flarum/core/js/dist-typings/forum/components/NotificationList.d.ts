/**
 * The `NotificationList` component displays a list of the logged-in user's
 * notifications, grouped by discussion.
 */
export default class NotificationList extends Component<import("../../common/Component").ComponentAttrs, undefined> {
    constructor();
    view(): JSX.Element;
    viewItems(): ItemList<any>;
    headerItems(): ItemList<any>;
    controlItems(): ItemList<any>;
    content(state: any): any;
    pageItems(page: any): ItemList<any>;
    buildGroups(page: any): any[];
    groupKey(group: any, fallbackIndex: any): any;
    groupView(group: any): JSX.Element;
    groupItems(group: any, badges: any): ItemList<any>;
    groupHeaderItems(group: any, badges: any): ItemList<any>;
    groupBodyItems(group: any): ItemList<any>;
    notificationItem(notification: any): JSX.Element | null;
    groupTitle(group: any): unknown;
    oncreate(vnode: any): void;
    $notifications: JQuery<HTMLElement> | undefined;
    $scrollParent: JQuery<HTMLElement> | JQuery<Window & typeof globalThis> | undefined;
    boundScrollHandler: (() => void) | undefined;
    onremove(vnode: any): void;
    scrollHandler(): void;
    /**
     * If the NotificationList component isn't in a panel (e.g. on NotificationPage when mobile),
     * we need to listen to scroll events on the window, and get scroll state from the body.
     */
    inPanel(): boolean;
}
import Component from "../../common/Component";
import ItemList from "../../common/utils/ItemList";

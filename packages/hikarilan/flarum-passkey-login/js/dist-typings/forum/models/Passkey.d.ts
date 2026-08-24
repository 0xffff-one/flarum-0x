import Model from 'flarum/common/Model';
export default class Passkey extends Model {
    identifier: () => string;
    userId: () => number;
    alias: () => string;
    createdAt: () => Date;
    lastSeenAt: () => Date;
}

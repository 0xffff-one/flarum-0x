import Model from 'flarum/common/Model';

export default class Passkey extends Model {
    identifier = Model.attribute<string>('id');
    userId = Model.attribute<number>('user_id');
    alias = Model.attribute<string>('alias');
    createdAt = Model.attribute<Date>('created_at', (o) => Model.transformDate(o as string));
    lastSeenAt = Model.attribute<Date>('last_seen_at', (o) => Model.transformDate(o as string));
}

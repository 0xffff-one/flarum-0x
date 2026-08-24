<?php

namespace Hikarilan\FlarumPasskeyLogin\Models;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;

/**
 * @property string $id
 * @property string $raw_id
 * @property int $user_id
 * @property string $passkey
 * @property string|null $alias
 * @property Carbon $created_at
 * @property Carbon|null $last_seen_at
 */
class Passkey extends AbstractModel
{

    public const table_name = 'flarum_passkey_login_passkeys';
    public const UPDATED_AT = 'last_seen_at';
    public $timestamps = true;
    public $incrementing = false;
    protected $table = self::table_name;
    protected $keyType = 'string';

    protected $fillable = ['id', 'raw_id', 'user_id', 'passkey', 'alias'];


}

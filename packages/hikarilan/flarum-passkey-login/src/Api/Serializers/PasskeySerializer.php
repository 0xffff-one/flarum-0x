<?php

namespace Hikarilan\FlarumPasskeyLogin\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Hikarilan\FlarumPasskeyLogin\Models\Passkey;

class PasskeySerializer extends AbstractSerializer
{

    protected $type = 'passkeys';

    /**
     * @param Passkey $model
     */
    protected function getDefaultAttributes($model): array
    {
        return [
            'id' => $model->id,
            'user_id' => $model->user_id,
            'alias' => $model->alias,
            'created_at' => $this->formatDate($model->created_at),
            'last_seen_at' => $this->formatDate($model->last_seen_at),
        ];
    }
}

<?php

namespace Hikarilan\FlarumPasskeyLogin\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Hikarilan\FlarumPasskeyLogin\Api\Serializers\PasskeySerializer;
use Hikarilan\FlarumPasskeyLogin\Models\Passkey;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdatePasskeyController extends AbstractShowController
{

    public $serializer = PasskeySerializer::class;

    /**
     * @throws NotAuthenticatedException
     * @throws ValidationException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $actor->assertRegistered();

        $data = Arr::get($request->getParsedBody(), 'data');
        $attributes = Arr::get($data, 'attributes');

        $queryId = Arr::get($request->getQueryParams(), 'id');
        $bodyId = Arr::get($data, 'id');
        if ($queryId !== $bodyId) {
            throw new ValidationException(['passkey' => "It's very suspicious that the id in the query and the id in the body are mismatch."]);
        }

        /** @var Passkey $passkey */
        $passkey = Passkey::query()->findOrFail($bodyId);

        if ($passkey->user_id !== $actor->id) {
            throw new ValidationException(['passkey' => 'You are not allowed to update this passkey.']);
        }

        Passkey::query()->where([
            "id" => $passkey->id
        ])->update([
            "alias" => Arr::get($attributes, 'alias')
        ]);


        return Passkey::query()->find($passkey->id);
    }
}

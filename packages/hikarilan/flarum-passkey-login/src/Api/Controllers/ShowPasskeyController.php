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

class ShowPasskeyController extends AbstractShowController
{

    public $serializer = PasskeySerializer::class;

    /**
     * @throws NotAuthenticatedException
     * @throws ValidationException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');

        $actor->assertRegistered();

        /** @var Passkey $passkey */
        $passkey = Passkey::query()->findOrFail($id);

        if ($passkey->user_id !== $actor->id) {
            throw new ValidationException(['passkey' => 'You are not allowed to access this passkey.']);
        }

        return $passkey;
    }
}

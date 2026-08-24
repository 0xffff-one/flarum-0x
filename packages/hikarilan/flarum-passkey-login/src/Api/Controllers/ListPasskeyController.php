<?php

namespace Hikarilan\FlarumPasskeyLogin\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Hikarilan\FlarumPasskeyLogin\Api\Serializers\PasskeySerializer;
use Hikarilan\FlarumPasskeyLogin\Models\Passkey;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListPasskeyController extends AbstractListController
{

    public $serializer = PasskeySerializer::class;

    /**
     * @throws NotAuthenticatedException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $actor->assertRegistered();

        return Passkey::query()->where([
            "user_id" => $actor->id
        ])->get();
    }
}

<?php

namespace Hikarilan\FlarumPasskeyLogin\Api\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Hikarilan\FlarumPasskeyLogin\Models\Passkey;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeletePasskeyController extends AbstractDeleteController
{

    /**
     * @throws NotAuthenticatedException
     * @throws ValidationException
     */
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');

        $actor->assertRegistered();

        /** @var Passkey $passkey */
        $passkey = Passkey::query()->findOrFail($id);

        if ($passkey->user_id !== $actor->id) {
            throw new ValidationException(['passkey' => 'You are not allowed to delete this passkey.']);
        }

        $passkey->delete();
    }
}

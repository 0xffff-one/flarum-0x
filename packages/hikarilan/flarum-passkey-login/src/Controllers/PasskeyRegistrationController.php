<?php

namespace Hikarilan\FlarumPasskeyLogin\Controllers;

use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Hikarilan\FlarumPasskeyLogin\Models\Passkey;
use Illuminate\Contracts\Cache;
use Illuminate\Session;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Ramsey\Uuid\Uuid;
use Throwable;
use Webauthn\AuthenticatorAttestationResponse;
use Webauthn\AuthenticatorAttestationResponseValidator;
use Webauthn\Exception\InvalidDataException;
use Webauthn\PublicKeyCredentialCreationOptions;
use Webauthn\PublicKeyCredentialLoader;
use Webauthn\PublicKeyCredentialUserEntity;

class PasskeyRegistrationController implements RequestHandlerInterface
{

    protected Cache\Store $cache;

    protected PublicKeyCredentialLoader $publicKeyCredentialLoader;
    protected AuthenticatorAttestationResponseValidator $authenticatorAttestationResponseValidator;

    public function __construct(Cache\Store $cache, PublicKeyCredentialLoader $publicKeyCredentialLoader, AuthenticatorAttestationResponseValidator $authenticatorAttestationResponseValidator)
    {
        $this->cache = $cache;
        $this->publicKeyCredentialLoader = $publicKeyCredentialLoader;
        $this->authenticatorAttestationResponseValidator = $authenticatorAttestationResponseValidator;
    }

    /**
     * @throws NotAuthenticatedException
     * @throws InvalidDataException
     * @throws Throwable
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        $actor->assertRegistered();

        $data = (string)$request->getBody();

        $publicKeyCredential = $this->publicKeyCredentialLoader->load($data);

        $authenticatorAttestationResponse = $publicKeyCredential->response;
        if (!$authenticatorAttestationResponse instanceof AuthenticatorAttestationResponse) {
            return new JsonResponse([
                "error_msg" => "The public key credential you requested not a AuthenticatorAttestationResponse"
            ], 400);
        }

        /** @var Session\Store $session */
        $session = $request->getAttribute('session');

        /** @var PublicKeyCredentialUserEntity $userEntity */
        $userEntity = $this->cache->get("passkey_registration_user_entity_{$session->getId()}");
        /** @var PublicKeyCredentialCreationOptions $publicKeyCredentialCreationOptions */
        $publicKeyCredentialCreationOptions = $this->cache->get("passkey_registration_options_{$session->getId()}");

        $publicKeyCredentialSource = $this->authenticatorAttestationResponseValidator->check(
            $authenticatorAttestationResponse,
            $publicKeyCredentialCreationOptions,
            $data
        );

        /** @var Passkey $passkey */
        $passkey = Passkey::query()->create([
            "id" => Uuid::uuid4(),
            "raw_id" => $publicKeyCredentialSource->jsonSerialize()['publicKeyCredentialId'],
            "user_id" => $userEntity->id,
            "passkey" => json_encode($publicKeyCredentialSource)
        ]);

        $this->cache->forget("passkey_registration_user_entity_{$session->getId()}");
        $this->cache->forget("passkey_registration_options_{$session->getId()}");

        return new JsonResponse([
            "id" => $passkey->id,
        ], 200);
    }
}

<?php

namespace Hikarilan\FlarumPasskeyLogin\Controllers;

use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Hikarilan\FlarumPasskeyLogin\PasskeyWebauthn;
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
use Webauthn\Exception\InvalidDataException;
use Webauthn\PublicKeyCredentialCreationOptions;
use Webauthn\PublicKeyCredentialUserEntity;

class PasskeyRegistrationController implements RequestHandlerInterface
{

    protected Cache\Store $cache;

    protected PasskeyWebauthn $webauthn;

    public function __construct(Cache\Store $cache, PasskeyWebauthn $webauthn)
    {
        $this->cache = $cache;
        $this->webauthn = $webauthn;
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

        /** @var Session\Store $session */
        $session = $request->getAttribute('session');

        $timeout = $this->webauthn->getTimeout();
        if (!$this->cache->add("passkey_registration_consumed_{$session->getId()}", true, $timeout)) {
            return new JsonResponse(['error_msg' => 'Passkey registration challenge was already used.'], 400);
        }

        /** @var PublicKeyCredentialUserEntity $userEntity */
        $userEntity = $this->cache->get("passkey_registration_user_entity_{$session->getId()}");
        /** @var PublicKeyCredentialCreationOptions $publicKeyCredentialCreationOptions */
        $publicKeyCredentialCreationOptions = $this->cache->get("passkey_registration_options_{$session->getId()}");

        if (!$userEntity instanceof PublicKeyCredentialUserEntity || !$publicKeyCredentialCreationOptions instanceof PublicKeyCredentialCreationOptions) {
            return new JsonResponse(['error_msg' => 'Passkey registration challenge is missing or expired.'], 400);
        }

        if (!hash_equals((string)$userEntity->id, (string)$actor->id)) {
            return new JsonResponse(['error_msg' => 'Passkey registration challenge belongs to another user.'], 400);
        }

        $data = (string)$request->getBody();
        $publicKeyCredential = $this->webauthn->loadCredential($data);
        $authenticatorAttestationResponse = $publicKeyCredential->response;
        if (!$authenticatorAttestationResponse instanceof AuthenticatorAttestationResponse) {
            return new JsonResponse([
                'error_msg' => 'The public key credential is not an attestation response.'
            ], 400);
        }

        $credentialRecord = $this->webauthn->attestationValidator($request)->check(
            $authenticatorAttestationResponse,
            $publicKeyCredentialCreationOptions,
            $this->webauthn->getRelyingPartyId()
        );

        $serializedCredential = $this->webauthn->serializeCredential($credentialRecord);
        $normalizedCredential = $this->webauthn->normalize($credentialRecord);

        /** @var Passkey $passkey */
        $passkey = Passkey::query()->create([
            "id" => Uuid::uuid4(),
            "raw_id" => $normalizedCredential['publicKeyCredentialId'],
            "user_id" => $userEntity->id,
            "passkey" => $serializedCredential
        ]);

        $this->cache->forget("passkey_registration_user_entity_{$session->getId()}");
        $this->cache->forget("passkey_registration_options_{$session->getId()}");

        return new JsonResponse([
            "id" => $passkey->id,
        ], 200);
    }
}

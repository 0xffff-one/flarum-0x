<?php

namespace Hikarilan\FlarumPasskeyLogin\Controllers;

use Exception;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Hikarilan\FlarumPasskeyLogin\PasskeyWebauthn;
use Illuminate\Contracts\Cache;
use Illuminate\Session;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Webauthn\AuthenticatorSelectionCriteria;
use Webauthn\PublicKeyCredentialCreationOptions;
use Webauthn\PublicKeyCredentialParameters;
use Webauthn\PublicKeyCredentialRpEntity;
use Webauthn\PublicKeyCredentialUserEntity;

class PasskeyRegistrationOptionsController implements RequestHandlerInterface
{

    protected Cache\Store $cache;
    protected PasskeyWebauthn $webauthn;

    public function __construct(PasskeyWebauthn $webauthn, Cache\Store $cache)
    {
        $this->webauthn = $webauthn;
        $this->cache = $cache;
    }

    /**
     * @throws NotAuthenticatedException
     * @throws Exception
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        $actor->assertRegistered();

        $rpName = $this->webauthn->getRelyingPartyName();
        $rpId = $this->webauthn->getRelyingPartyId();
        $timeout = $this->webauthn->getTimeout();

        $rpEntity = PublicKeyCredentialRpEntity::create($rpName, $rpId);

        $userEntity = PublicKeyCredentialUserEntity::create(
            $actor->username,
            $actor->id,
            empty($actor->display_name) ? $actor->username : $actor->display_name,
        );

        $authenticatorSelectionCriteria = AuthenticatorSelectionCriteria::create(
            userVerification: AuthenticatorSelectionCriteria::USER_VERIFICATION_REQUIREMENT_REQUIRED,
            residentKey: AuthenticatorSelectionCriteria::RESIDENT_KEY_REQUIREMENT_REQUIRED,
            requireResidentKey: null
        );

        $publicKeyCredentialCreationOptions = PublicKeyCredentialCreationOptions::create(
            $rpEntity,
            $userEntity,
            random_bytes(16),
            [
                PublicKeyCredentialParameters::createPk(-7), // ES256
                PublicKeyCredentialParameters::createPk(-257), // RS256
            ],
            authenticatorSelection: $authenticatorSelectionCriteria,
            timeout: $timeout * 1000,
        );

        /** @var Session\Store $session */
        $session = $request->getAttribute('session');

        $this->cache->put("passkey_registration_user_entity_{$session->getId()}", $userEntity, $timeout);
        $this->cache->put("passkey_registration_options_{$session->getId()}", $publicKeyCredentialCreationOptions, $timeout);
        $this->cache->forget("passkey_registration_consumed_{$session->getId()}");

        return new JsonResponse($this->webauthn->normalize($publicKeyCredentialCreationOptions));
    }
}

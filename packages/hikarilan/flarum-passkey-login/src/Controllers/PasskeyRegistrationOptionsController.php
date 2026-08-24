<?php

namespace Hikarilan\FlarumPasskeyLogin\Controllers;

use Exception;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Contracts\Cache;
use Illuminate\Session;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Webauthn\AuthenticatorSelectionCriteria;
use Webauthn\PublicKeyCredentialCreationOptions;
use Webauthn\PublicKeyCredentialRpEntity;
use Webauthn\PublicKeyCredentialUserEntity;

class PasskeyRegistrationOptionsController implements RequestHandlerInterface
{

    protected Cache\Store $cache;
    protected SettingsRepositoryInterface $settings;

    public function __construct(SettingsRepositoryInterface $settings, Cache\Store $cache)
    {
        $this->settings = $settings;
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

        $_rpName = $this->settings->get('hikarilan-passkey-login.relying_party.name');
        $rpName = empty($_rpName) ? $this->settings->get('forum_title', 'Flarum Forum') : $_rpName;

        $_rpId = $this->settings->get('hikarilan-passkey-login.relying_party.id');
        $rpId = empty($_rpId) ? $request->getUri()->getHost() : $_rpId;

        $timeout = $this->settings->get('hikarilan-passkey-login.timeout', 60);

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
            authenticatorSelection: $authenticatorSelectionCriteria,
            timeout: $timeout * 1000,
        );

        /** @var Session\Store $session */
        $session = $request->getAttribute('session');

        $this->cache->put("passkey_registration_user_entity_{$session->getId()}", $userEntity, $timeout);
        $this->cache->put("passkey_registration_options_{$session->getId()}", $publicKeyCredentialCreationOptions, $timeout);

        return new JsonResponse($publicKeyCredentialCreationOptions);
    }
}

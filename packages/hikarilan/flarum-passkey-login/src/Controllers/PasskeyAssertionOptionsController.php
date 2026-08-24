<?php

namespace Hikarilan\FlarumPasskeyLogin\Controllers;

use Exception;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Cache;
use Illuminate\Session;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Webauthn\PublicKeyCredentialRequestOptions;

class PasskeyAssertionOptionsController implements RequestHandlerInterface
{

    protected Cache\Store $cache;
    protected SettingsRepositoryInterface $settings;

    public function __construct(SettingsRepositoryInterface $settings, Cache\Store $cache)
    {
        $this->settings = $settings;
        $this->cache = $cache;
    }

    /**
     * @throws Exception
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $_rpId = $this->settings->get('hikarilan-passkey-login.relying_party.id');
        $rpId = empty($_rpId) ? $request->getUri()->getHost() : $_rpId;

        $timeout = $this->settings->get('hikarilan-passkey-login.timeout', 60);

        $publicKeyCredentialRequestOptions = PublicKeyCredentialRequestOptions::create(
            random_bytes(32),
            rpId: $rpId,
            userVerification: PublicKeyCredentialRequestOptions::USER_VERIFICATION_REQUIREMENT_REQUIRED,
            timeout: $timeout * 1000,
        );

        /** @var Session\Store $session */
        $session = $request->getAttribute('session');

        $this->cache->put("passkey_assertion_options_{$session->getId()}", $publicKeyCredentialRequestOptions, $timeout);

        return new JsonResponse($publicKeyCredentialRequestOptions);
    }
}

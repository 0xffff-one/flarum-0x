<?php

namespace Hikarilan\FlarumPasskeyLogin\Controllers;

use Exception;
use Hikarilan\FlarumPasskeyLogin\PasskeyWebauthn;
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
    protected PasskeyWebauthn $webauthn;

    public function __construct(PasskeyWebauthn $webauthn, Cache\Store $cache)
    {
        $this->webauthn = $webauthn;
        $this->cache = $cache;
    }

    /**
     * @throws Exception
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $rpId = $this->webauthn->getRelyingPartyId();
        $timeout = $this->webauthn->getTimeout();

        $publicKeyCredentialRequestOptions = PublicKeyCredentialRequestOptions::create(
            random_bytes(32),
            rpId: $rpId,
            userVerification: PublicKeyCredentialRequestOptions::USER_VERIFICATION_REQUIREMENT_REQUIRED,
            timeout: $timeout * 1000,
        );

        /** @var Session\Store $session */
        $session = $request->getAttribute('session');

        $this->cache->put("passkey_assertion_options_{$session->getId()}", $publicKeyCredentialRequestOptions, $timeout);
        $this->cache->forget("passkey_assertion_consumed_{$session->getId()}");

        return new JsonResponse($this->webauthn->normalize($publicKeyCredentialRequestOptions));
    }
}

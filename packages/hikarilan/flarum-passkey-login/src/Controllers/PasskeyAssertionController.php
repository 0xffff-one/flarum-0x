<?php

namespace Hikarilan\FlarumPasskeyLogin\Controllers;

use Flarum\Http\RememberAccessToken;
use Flarum\Http\RequestUtil;
use Flarum\Http\SessionAuthenticator;
use Flarum\User\Event\LoggedIn;
use Flarum\User\User;
use Flarum\User\UserRepository;
use Hikarilan\FlarumPasskeyLogin\PasskeyWebauthn;
use Hikarilan\FlarumPasskeyLogin\Models\Passkey;
use Illuminate\Contracts\Cache;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Session;
use Laminas\Diactoros\Response\EmptyResponse;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Throwable;
use Paragonie\ConstantTime\Base64UrlSafe;
use Webauthn\AuthenticatorAssertionResponse;
use Webauthn\Exception\InvalidDataException;
use Webauthn\PublicKeyCredentialRequestOptions;

class PasskeyAssertionController implements RequestHandlerInterface
{

    protected Cache\Store $cache;

    protected PasskeyWebauthn $webauthn;
    protected UserRepository $users;
    protected SessionAuthenticator $authenticator;
    protected Dispatcher $events;

    public function __construct(Cache\Store $cache, PasskeyWebauthn $webauthn, UserRepository $users, SessionAuthenticator $authenticator, Dispatcher $events)
    {
        $this->cache = $cache;
        $this->webauthn = $webauthn;

        $this->users = $users;
        $this->authenticator = $authenticator;
        $this->events = $events;
    }

    /**
     * @throws InvalidDataException
     * @throws Throwable
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        // when already logged in, just return ok and skip.
        if (!$actor->isGuest()) {
            return new EmptyResponse();
        }

        /** @var Session\Store $session */
        $session = $request->getAttribute('session');

        $timeout = $this->webauthn->getTimeout();
        if (!$this->cache->add("passkey_assertion_consumed_{$session->getId()}", true, $timeout)) {
            return new JsonResponse(['error_msg' => 'Passkey assertion challenge was already used.'], 400);
        }

        /** @var PublicKeyCredentialRequestOptions $publicKeyCredentialRequestOptions */
        $publicKeyCredentialRequestOptions = $this->cache->get("passkey_assertion_options_{$session->getId()}");
        if (!$publicKeyCredentialRequestOptions instanceof PublicKeyCredentialRequestOptions) {
            return new JsonResponse(['error_msg' => 'Passkey assertion challenge is missing or expired.'], 400);
        }

        $data = (string)$request->getBody();
        $publicKeyCredential = $this->webauthn->loadCredential($data);
        $authenticatorAssertionResponse = $publicKeyCredential->response;
        if (!$authenticatorAssertionResponse instanceof AuthenticatorAssertionResponse) {
            return new JsonResponse([
                'error_msg' => 'The public key credential is not an assertion response.'
            ], 400);
        }

        /** @var Passkey|null $passkey
         */
        $passkey = Passkey::query()->where([
            'raw_id' => Base64UrlSafe::encodeUnpadded($publicKeyCredential->rawId)
        ])->first();
        if (!$passkey) {
            return new JsonResponse([
                "error_msg" => "Passkey not found"
            ], 400);
        }

        $credentialRecord = $this->webauthn->loadStoredCredential($passkey->passkey);

        $credentialRecord = $this->webauthn->assertionValidator($request)->check(
            $credentialRecord,
            $authenticatorAssertionResponse,
            $publicKeyCredentialRequestOptions,
            $this->webauthn->getRelyingPartyId(),
            null
        );

        $passkey->update([
            'passkey' => $this->webauthn->serializeCredential($credentialRecord)
        ]);

        $this->cache->forget("passkey_assertion_options_{$session->getId()}");

        /** @var User $user */
        $user = $this->users->query()->where([
            'id' => $passkey->user_id
        ])->first();
        if (!$user) {
            return new JsonResponse([
                "error_msg" => "User not found"
            ], 400);
        }

        $token = RememberAccessToken::generate($user->id);
        $this->authenticator->logIn($session, $token);
        $this->events->dispatch(new LoggedIn($this->users->findOrFail($user->id), $token));

        return new EmptyResponse();
    }
}

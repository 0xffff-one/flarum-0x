<?php

namespace Hikarilan\FlarumPasskeyLogin\Controllers;

use Flarum\Http\RememberAccessToken;
use Flarum\Http\RequestUtil;
use Flarum\Http\SessionAuthenticator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\LoggedIn;
use Flarum\User\User;
use Flarum\User\UserRepository;
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
use Webauthn\AuthenticatorAssertionResponse;
use Webauthn\AuthenticatorAssertionResponseValidator;
use Webauthn\Exception\InvalidDataException;
use Webauthn\PublicKeyCredentialLoader;
use Webauthn\PublicKeyCredentialRequestOptions;
use Webauthn\PublicKeyCredentialSource;

class PasskeyAssertionController implements RequestHandlerInterface
{

    protected Cache\Store $cache;
    protected SettingsRepositoryInterface $settings;

    protected PublicKeyCredentialLoader $publicKeyCredentialLoader;
    protected UserRepository $users;
    protected SessionAuthenticator $authenticator;
    protected Dispatcher $events;
    private AuthenticatorAssertionResponseValidator $authenticatorAssertionResponseValidator;

    public function __construct(SettingsRepositoryInterface $settings, Cache\Store $cache, PublicKeyCredentialLoader $publicKeyCredentialLoader, AuthenticatorAssertionResponseValidator $authenticatorAssertionResponseValidator, UserRepository $users, SessionAuthenticator $authenticator, Dispatcher $events)
    {
        $this->cache = $cache;
        $this->settings = $settings;

        $this->publicKeyCredentialLoader = $publicKeyCredentialLoader;
        $this->authenticatorAssertionResponseValidator = $authenticatorAssertionResponseValidator;

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

        $data = (string)$request->getBody();

        $publicKeyCredential = $this->publicKeyCredentialLoader->load($data);

        $authenticatorAssertionResponse = $publicKeyCredential->response;
        if (!$authenticatorAssertionResponse instanceof AuthenticatorAssertionResponse) {
            return new JsonResponse([
                "error_msg" => "The public key credential you requested not a AuthenticatorAssertionResponse"
            ], 400);
        }

        /** @var Passkey|null $passkey
         */
        $passkey = Passkey::query()->where([
            'raw_id' => $publicKeyCredential->id
        ])->first();
        if (!$passkey) {
            return new JsonResponse([
                "error_msg" => "Passkey not found"
            ], 400);
        }

        $publicKeyCredentialSource = PublicKeyCredentialSource::createFromArray(json_decode($passkey->passkey, true));

        /** @var Session\Store $session */
        $session = $request->getAttribute('session');

        /** @var PublicKeyCredentialRequestOptions $publicKeyCredentialRequestOptions */
        $publicKeyCredentialRequestOptions = $this->cache->get("passkey_assertion_options_{$session->getId()}");

        $_rpId = $this->settings->get('hikarilan-passkey-login.relying_party.id');
        $rpId = empty($_rpId) ? $request->getUri()->getHost() : $_rpId;

        $publicKeyCredentialSource = $this->authenticatorAssertionResponseValidator->check(
            $publicKeyCredentialSource,
            $authenticatorAssertionResponse,
            $publicKeyCredentialRequestOptions,
            $data,
            null,
            [$rpId]
        );

        $passkey->update([
            'passkey' => json_encode($publicKeyCredentialSource)
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

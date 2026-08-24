<?php

/*
 * This file is part of hikarilan/flarum-passkey-login.
 *
 * Copyright (c) 2023 HikariLan.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Hikarilan\FlarumPasskeyLogin;

use Cose\Algorithm\Manager;
use Cose\Algorithm\Signature\ECDSA\ES256;
use Cose\Algorithm\Signature\RSA\RS256;
use Flarum\Extend;
use Illuminate\Container\Container;
use Lcobucci\Clock\SystemClock;
use Webauthn\AttestationStatement\AndroidKeyAttestationStatementSupport;
use Webauthn\AttestationStatement\AppleAttestationStatementSupport;
use Webauthn\AttestationStatement\AttestationObjectLoader;
use Webauthn\AttestationStatement\AttestationStatementSupportManager;
use Webauthn\AttestationStatement\FidoU2FAttestationStatementSupport;
use Webauthn\AttestationStatement\NoneAttestationStatementSupport;
use Webauthn\AttestationStatement\PackedAttestationStatementSupport;
use Webauthn\AttestationStatement\TPMAttestationStatementSupport;
use Webauthn\AuthenticationExtensions\ExtensionOutputCheckerHandler;
use Webauthn\AuthenticatorAssertionResponseValidator;
use Webauthn\AuthenticatorAttestationResponseValidator;
use Webauthn\PublicKeyCredentialLoader;

$algorithmManager = Manager::create();
$algorithmManager->add(new ES256());
$algorithmManager->add(new RS256());

$attestationStatementSupportManager = AttestationStatementSupportManager::create();
$attestationStatementSupportManager->add(new NoneAttestationStatementSupport());
$attestationStatementSupportManager->add(new PackedAttestationStatementSupport($algorithmManager));
$attestationStatementSupportManager->add(new FidoU2FAttestationStatementSupport());
$attestationStatementSupportManager->add(new TPMAttestationStatementSupport(SystemClock::fromSystemTimezone()));
$attestationStatementSupportManager->add(new AppleAttestationStatementSupport());
$attestationStatementSupportManager->add(new AndroidKeyAttestationStatementSupport());

$extensionOutputCheckerHandler = ExtensionOutputCheckerHandler::create();

$publicKeyCredentialLoader = PublicKeyCredentialLoader::create(AttestationObjectLoader::create($attestationStatementSupportManager));
$authenticatorAttestationResponseValidator = AuthenticatorAttestationResponseValidator::create(
    $attestationStatementSupportManager,
    null,
    null,
    $extensionOutputCheckerHandler
);
$authenticatorAssertionResponseValidator = AuthenticatorAssertionResponseValidator::create(
    null,
    null,
    $extensionOutputCheckerHandler,
    $algorithmManager
);

Container::getInstance()->instance(PublicKeyCredentialLoader::class, $publicKeyCredentialLoader);
Container::getInstance()->instance(AuthenticatorAttestationResponseValidator::class, $authenticatorAttestationResponseValidator);
Container::getInstance()->instance(AuthenticatorAssertionResponseValidator::class, $authenticatorAssertionResponseValidator);

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Routes('api'))
        ->get("/passkeys", "passkeys.index", Api\Controllers\ListPasskeyController::class)
        ->get('/passkeys/{id}', 'passkeys.show', Api\Controllers\ShowPasskeyController::class)
        ->patch("/passkeys/{id}", "passkeys.update", Api\Controllers\UpdatePasskeyController::class)
        ->delete("/passkeys/{id}", "passkeys.delete", Api\Controllers\DeletePasskeyController::class),
    (new Extend\Routes('forum'))
        ->get("/authorization/passkey/registration/options", "authorization.passkey.registration.options", Controllers\PasskeyRegistrationOptionsController::class)
        ->post("/authorization/passkey/registration", "authorization.passkey.registration", Controllers\PasskeyRegistrationController::class)
        ->get("/authorization/passkey/assertion/options", "authorization.passkey.assertion.options", Controllers\PasskeyAssertionOptionsController::class)
        ->post("/authorization/passkey/assertion", "authorization.passkey.assertion", Controllers\PasskeyAssertionController::class),

    (new Extend\Middleware('forum'))
        ->add(Middleware\ErrorHandler::class),

    (new Extend\Settings)
        ->default("hikarilan-passkey-login.timeout", 60)
];

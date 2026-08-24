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
use Flarum\Foundation\Config;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Container\Container;
use Webauthn\AttestationStatement\AndroidKeyAttestationStatementSupport;
use Webauthn\AttestationStatement\AppleAttestationStatementSupport;
use Webauthn\AttestationStatement\AttestationStatementSupportManager;
use Webauthn\AttestationStatement\FidoU2FAttestationStatementSupport;
use Webauthn\AttestationStatement\PackedAttestationStatementSupport;
use Webauthn\AttestationStatement\TPMAttestationStatementSupport;
use Webauthn\Denormalizer\WebauthnSerializerFactory;

$algorithmManager = Manager::create();
$algorithmManager->add(new ES256());
$algorithmManager->add(new RS256());

$attestationStatementSupportManager = AttestationStatementSupportManager::create();
$attestationStatementSupportManager->add(new PackedAttestationStatementSupport($algorithmManager));
$attestationStatementSupportManager->add(new FidoU2FAttestationStatementSupport());
$attestationStatementSupportManager->add(new TPMAttestationStatementSupport());
$attestationStatementSupportManager->add(new AppleAttestationStatementSupport());
$attestationStatementSupportManager->add(new AndroidKeyAttestationStatementSupport());

$webauthnSerializer = (new WebauthnSerializerFactory($attestationStatementSupportManager))->create();

Container::getInstance()->singleton(PasskeyWebauthn::class, function (Container $container) use (
    $algorithmManager,
    $attestationStatementSupportManager,
    $webauthnSerializer
) {
    return new PasskeyWebauthn(
        $container->make(SettingsRepositoryInterface::class),
        $container->make(Config::class),
        $webauthnSerializer,
        $attestationStatementSupportManager,
        $algorithmManager
    );
});

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

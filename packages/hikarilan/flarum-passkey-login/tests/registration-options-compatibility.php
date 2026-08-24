<?php

declare(strict_types=1);

use Webauthn\AuthenticatorSelectionCriteria;
use Webauthn\PublicKeyCredentialCreationOptions;
use Webauthn\PublicKeyCredentialParameters;
use Webauthn\PublicKeyCredentialRpEntity;
use Webauthn\PublicKeyCredentialUserEntity;

if ($argc !== 2) {
    throw new InvalidArgumentException('Usage: php tests/registration-options-compatibility.php /path/to/vendor/autoload.php');
}

require $argv[1];

$controllerSource = file_get_contents(dirname(__DIR__) . '/src/Controllers/PasskeyRegistrationOptionsController.php');
is_string($controllerSource) || throw new RuntimeException('Unable to read the registration options controller.');

str_contains($controllerSource, 'requireResidentKey:')
    && throw new RuntimeException('WebAuthn 5 does not accept requireResidentKey as a named factory argument.');

$selection = AuthenticatorSelectionCriteria::create(
    userVerification: AuthenticatorSelectionCriteria::USER_VERIFICATION_REQUIREMENT_REQUIRED,
    residentKey: AuthenticatorSelectionCriteria::RESIDENT_KEY_REQUIREMENT_REQUIRED,
);

$selection->requireResidentKey === true
    || throw new RuntimeException('WebAuthn 5 must derive requireResidentKey from residentKey.');

$options = PublicKeyCredentialCreationOptions::create(
    PublicKeyCredentialRpEntity::create('0xFFFF', '0xffff.one'),
    PublicKeyCredentialUserEntity::create('0x0001', '1', '0x0001'),
    random_bytes(16),
    [
        PublicKeyCredentialParameters::createPk(-7),
        PublicKeyCredentialParameters::createPk(-257),
    ],
    authenticatorSelection: $selection,
    timeout: 60_000,
);

count($options->pubKeyCredParams) === 2
    || throw new RuntimeException('Registration options must retain ES256 and RS256 algorithms.');

echo "Registration options compatibility passed.\n";

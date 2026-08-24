<?php

declare(strict_types=1);

use Cose\Algorithm\Manager;
use Flarum\Foundation\Config;
use Flarum\Settings\SettingsRepositoryInterface;
use Hikarilan\FlarumPasskeyLogin\PasskeyWebauthn;
use Webauthn\AttestationStatement\AttestationStatementSupportManager;
use Webauthn\Denormalizer\WebauthnSerializerFactory;

if ($argc !== 2) {
    throw new InvalidArgumentException('Usage: php tests/legacy-credential-roundtrip.php /path/to/vendor/autoload.php');
}

require $argv[1];
require dirname(__DIR__) . '/src/PasskeyWebauthn.php';

$settings = new class implements SettingsRepositoryInterface {
    public function all(): array
    {
        return [];
    }

    public function get($key, $default = null)
    {
        return $default;
    }

    public function set($key, $value)
    {
    }

    public function delete($keyLike)
    {
    }
};

$attestationStatementSupportManager = AttestationStatementSupportManager::create();
$webauthn = new PasskeyWebauthn(
    $settings,
    new Config(['url' => 'https://0xffff.one']),
    (new WebauthnSerializerFactory($attestationStatementSupportManager))->create(),
    $attestationStatementSupportManager,
    Manager::create()
);

$fixture = file_get_contents(__DIR__ . '/fixtures/legacy-public-key-credential-source.json');
is_string($fixture) || throw new RuntimeException('Unable to read legacy credential fixture.');

$serialized = json_decode(
    $webauthn->serializeCredential($webauthn->loadStoredCredential($fixture)),
    true,
    512,
    JSON_THROW_ON_ERROR
);
$legacy = json_decode($fixture, true, 512, JSON_THROW_ON_ERROR);

foreach (['publicKeyCredentialId', 'counter', 'transports', 'backupEligible', 'backupStatus', 'uvInitialized'] as $field) {
    ($serialized[$field] ?? null) === $legacy[$field]
        || throw new RuntimeException("Legacy credential field changed: {$field}");
}

($serialized['trustPath'] ?? null) === []
    || throw new RuntimeException('Legacy empty trust path was not converted.');

echo "Legacy WebAuthn credential round-trip passed.\n";

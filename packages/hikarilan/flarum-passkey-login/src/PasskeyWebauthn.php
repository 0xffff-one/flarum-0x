<?php

declare(strict_types=1);

namespace Hikarilan\FlarumPasskeyLogin;

use Cose\Algorithm\Manager;
use Flarum\Foundation\Config;
use Flarum\Settings\SettingsRepositoryInterface;
use InvalidArgumentException;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Webauthn\AttestationStatement\AttestationStatementSupportManager;
use Webauthn\AuthenticatorAssertionResponseValidator;
use Webauthn\AuthenticatorAttestationResponseValidator;
use Webauthn\CeremonyStep\CeremonyStepManagerFactory;
use Webauthn\CredentialRecord;
use Webauthn\Exception\InvalidDataException;
use Webauthn\PublicKeyCredential;
use Webauthn\TrustPath\EmptyTrustPath;

class PasskeyWebauthn
{
    public function __construct(
        private SettingsRepositoryInterface $settings,
        private Config $config,
        private SerializerInterface $serializer,
        private AttestationStatementSupportManager $attestationStatementSupportManager,
        private Manager $algorithmManager
    ) {
    }

    public function loadCredential(string $data): PublicKeyCredential
    {
        $credential = $this->serializer->denormalize($this->decodeJson($data), PublicKeyCredential::class, 'json');
        $credential instanceof PublicKeyCredential || throw InvalidDataException::create($data, 'Invalid public key credential.');

        return $credential;
    }

    public function loadStoredCredential(string $data): CredentialRecord
    {
        $credential = $this->serializer->denormalize(
            $this->adaptLegacyCredential($this->decodeJson($data)),
            CredentialRecord::class,
            'json'
        );
        $credential instanceof CredentialRecord || throw InvalidDataException::create($data, 'Invalid stored passkey credential.');

        return $credential;
    }

    public function serializeCredential(CredentialRecord $credential): string
    {
        return json_encode($this->serializer->normalize($credential), JSON_THROW_ON_ERROR);
    }

    /**
     * @return array<string, mixed>
     */
    public function normalize(mixed $value): array
    {
        /** @var array<string, mixed> $normalized */
        $normalized = $this->serializer->normalize($value);

        return $normalized;
    }

    public function getRelyingPartyId(): string
    {
        $configuredRelyingPartyId = $this->settings->get('hikarilan-passkey-login.relying_party.id');
        $relyingPartyId = is_string($configuredRelyingPartyId) && $configuredRelyingPartyId !== ''
            ? strtolower($configuredRelyingPartyId)
            : strtolower($this->config->url()->getHost());

        $this->isValidHost($relyingPartyId) || throw new InvalidArgumentException('Invalid relying party ID.');

        $canonicalHost = strtolower($this->config->url()->getHost());
        ($canonicalHost === $relyingPartyId || str_ends_with($canonicalHost, '.' . $relyingPartyId))
            || throw new InvalidArgumentException('The relying party ID does not match the configured forum URL.');

        return $relyingPartyId;
    }

    public function getRelyingPartyName(): string
    {
        $configuredRelyingPartyName = $this->settings->get('hikarilan-passkey-login.relying_party.name');
        $forumTitle = $this->settings->get('forum_title', 'Flarum Forum');

        return is_string($configuredRelyingPartyName) && $configuredRelyingPartyName !== ''
            ? $configuredRelyingPartyName
            : (string) $forumTitle;
    }

    public function getTimeout(): int
    {
        $timeout = (int) $this->settings->get('hikarilan-passkey-login.timeout', 60);

        return max(1, $timeout);
    }

    public function assertCanonicalRequest(ServerRequestInterface $request): string
    {
        $configuredUrl = $this->config->url();
        $requestUri = $request->getUri();
        $configuredHost = strtolower($configuredUrl->getHost());
        $requestHost = strtolower($requestUri->getHost());

        $configuredHost !== '' && $requestHost !== '' && hash_equals($configuredHost, $requestHost)
            || throw new InvalidArgumentException('Request host does not match the configured forum URL.');

        $configuredPort = $configuredUrl->getPort() ?? $this->defaultPort($configuredUrl->getScheme());
        $requestPort = $requestUri->getPort() ?? $this->defaultPort($configuredUrl->getScheme());
        $configuredPort === $requestPort || throw new InvalidArgumentException('Request port does not match the configured forum URL.');

        $scheme = strtolower($configuredUrl->getScheme());
        if ($scheme !== 'https' && !($scheme === 'http' && $configuredHost === 'localhost')) {
            throw new InvalidArgumentException('Passkeys require an HTTPS forum URL.');
        }

        return (string) $configuredUrl->withPath('')->withQuery('')->withFragment('');
    }

    public function assertionValidator(ServerRequestInterface $request): AuthenticatorAssertionResponseValidator
    {
        return AuthenticatorAssertionResponseValidator::create($this->ceremonyStepManager($request)->requestCeremony());
    }

    public function attestationValidator(ServerRequestInterface $request): AuthenticatorAttestationResponseValidator
    {
        return AuthenticatorAttestationResponseValidator::create($this->ceremonyStepManager($request)->creationCeremony());
    }

    private function ceremonyStepManager(ServerRequestInterface $request): CeremonyStepManagerFactory
    {
        $manager = new CeremonyStepManagerFactory();
        $manager->setAllowedOrigins([$this->assertCanonicalRequest($request)]);
        $manager->setAttestationStatementSupportManager($this->attestationStatementSupportManager);
        $manager->setAlgorithmManager($this->algorithmManager);

        return $manager;
    }

    /**
     * @return array<string, mixed>
     */
    private function decodeJson(string $data): array
    {
        $decoded = json_decode($data, true, 512, JSON_THROW_ON_ERROR);
        is_array($decoded) || throw new InvalidArgumentException('Expected a JSON object.');

        return $decoded;
    }

    /**
     * @param array<string, mixed> $credential
     * @return array<string, mixed>
     */
    private function adaptLegacyCredential(array $credential): array
    {
        // WebAuthn 4.x serialized EmptyTrustPath as a JsonSerializable class marker.
        // WebAuthn 5.x represents that same trust path as an empty array.
        $trustPath = $credential['trustPath'] ?? null;
        if (is_array($trustPath) && ($trustPath['type'] ?? null) === EmptyTrustPath::class) {
            $credential['trustPath'] = [];
        }

        return $credential;
    }

    private function isValidHost(string $host): bool
    {
        return $host === 'localhost'
            || filter_var($host, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME) !== false
            || filter_var($host, FILTER_VALIDATE_IP) !== false;
    }

    private function defaultPort(string $scheme): int
    {
        return strtolower($scheme) === 'http' ? 80 : 443;
    }
}

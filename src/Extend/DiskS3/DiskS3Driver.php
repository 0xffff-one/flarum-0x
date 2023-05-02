<?php

namespace Flarum0x\Extend\DiskS3;

use Aws\S3\S3Client;
use Flarum\Filesystem\DriverInterface;
use Flarum\Foundation\Config;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Filesystem\Cloud;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Arr;
use League\Flysystem\Filesystem;

class DiskS3Driver implements DriverInterface
{
    public function build(string $diskName, SettingsRepositoryInterface $settings, Config $config, array $localConfig): Cloud
    {
        $s3Config = $this->formatS3Config($config['disk_s3_config']);
        $root = $diskName;
        $options = $config['options'] ?? [];
        $streamReads = $config['stream_reads'] ?? false;
        $publicBaseUrl = $s3Config['public_base_url'] ?? null;

        return new FilesystemAdapter(new Filesystem(
            new DiskS3Adapter(new S3Client($s3Config), $s3Config['bucket'], $root, $options, $streamReads, $publicBaseUrl)
        ));
    }

    /**
     * Format the given S3 configuration with the default options.
     *
     * @param  array  $config
     * @return array
     */
    protected function formatS3Config(array $config)
    {
        $config += ['version' => 'latest'];

        if (!empty($config['key']) && !empty($config['secret'])) {
            $config['credentials'] = Arr::only($config, ['key', 'secret', 'token']);
        }

        return $config;
    }
}

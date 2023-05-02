<?php

namespace Flarum0x\Extend\DiskS3;

use Aws\S3\S3ClientInterface;
use League\Flysystem\AwsS3v3\AwsS3Adapter;

class DiskS3Adapter extends AwsS3Adapter
{
    protected $publicBaseUrl = '';

    public function __construct(S3ClientInterface $client, $bucket, $prefix = '', array $options = [], $streamReads = true, $publicBaseUrl = '')
    {
        parent::__construct($client, $bucket, $prefix, $options, $streamReads);
        $this->publicBaseUrl = $publicBaseUrl;
    }

    /**
     * Get the file URL by given path.
     *
     * @param  string $path Path.
     *
     * @return string
     */
    public function getUrl(string $path)
    {
        if ($this->publicBaseUrl) {
            return $this->concatPathToUrl($this->publicBaseUrl, $this->getPathPrefix() . $path);
        }
        return $this->getClient()->getObjectUrl($this->getBucket(), $this->getPathPrefix() . $path);
    }

    /**
     * Concatenate a path to a URL.
     *
     * @param  string  $url
     * @param  string  $path
     * @return string
     */
    protected function concatPathToUrl($url, $path)
    {
        return rtrim($url, '/') . '/' . ltrim($path, '/');
    }
}

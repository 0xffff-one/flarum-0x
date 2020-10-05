<?php

namespace Zgq354\AppShell\Forum\Controller;

use Flarum\Foundation\Application;
use Laminas\Diactoros\Response\TextResponse;
use Flarum\Settings\SettingsRepositoryInterface;;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class AppShellController implements RequestHandlerInterface
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var Application
     */
    protected $app;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings, Application $app)
    {
        $this->settings = $settings;
        $this->app = $app;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $response = new TextResponse("test");
        return $response;
    }
}

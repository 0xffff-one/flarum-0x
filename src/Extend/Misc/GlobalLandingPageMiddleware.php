<?php

namespace Flarum0x\Extend\Misc;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\HtmlResponse;

class GlobalLandingPageMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $ua = $request->getHeader('User-Agent')[0];
        // landing page for Mobile QQ WebView
        if (strpos($ua, 'QQ') !== false && strpos($ua, '_SQ_') !== false) {
            return new HtmlResponse(file_get_contents(__DIR__ . '/../../resources/views/jump.html'));
        }
        // Logic to run before the request is processed and later middleware is called.
        $response = $handler->handle($request);
        // Logic to run after the request is processed.
        return $response;
    }
}

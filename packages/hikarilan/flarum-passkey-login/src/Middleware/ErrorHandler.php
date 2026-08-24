<?php

namespace Hikarilan\FlarumPasskeyLogin\Middleware;

use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Throwable;

class ErrorHandler implements MiddlewareInterface
{

    private array $appliedRoutes = [
        '/authorization/passkey/registration',
        '/authorization/passkey/registration/options',
        '/authorization/passkey/assertion',
        '/authorization/passkey/assertion/options',
        '/api/passkeys',
        '/api/passkeys/*'
    ];

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        // make this middleware only work for the specified routes
        $path = $request->getUri()->getPath();
        $find = false;
        foreach ($this->appliedRoutes as $route) {
            if (preg_match('/^' . str_replace('/', '\/', $route) . '$/', $path)) {
                $find = true;
                break;
            }
        }

        if (!$find) {
            return $handler->handle($request);
        }

        try {
            return $handler->handle($request);
        } catch (Throwable $e) {
            return new JsonResponse([
                'error_msg' => $e->getMessage(),
                'stacktrace' => $e->getTraceAsString(),
            ], 500);
        }
    }
}

<?php

namespace Zgq354\AppShell;

use Flarum\Extend;
use Flarum\Frontend\Controller;

return [
  (new Extend\Routes('api'))
    ->get('/preload', 'zgq354.app-shell.preload-api', Api\Controller\PreloadApiController::class),
  (new Extend\Routes('forum'))
    ->get('/app-shell', 'zgq354.app-shell', Forum\Controller\AppShellController::class),
];

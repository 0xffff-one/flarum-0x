<?php

namespace TheTurk\Diff\Api\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use TheTurk\Diff\Api\Serializers\DiffSerializer;
use TheTurk\Diff\Commands\DeleteDiff;

class DeleteDiffController extends AbstractDeleteController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = DiffSerializer::class;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    /**
     * {@inheritdoc}
     */
    protected function delete(ServerRequestInterface $request)
    {
        return $this->bus->dispatch(
            new DeleteDiff(
                $request->getAttribute('actor'),
                Arr::get($request->getQueryParams(), 'id')
            )
        );
    }
}

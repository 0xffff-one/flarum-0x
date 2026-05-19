<?php

namespace TheTurk\Diff\Commands;

use Flarum\User\User;

class RollbackToDiff
{
    /**
     * @var User
     */
    public $actor;

    /**
     * @var int
     */
    public $diffId;

    /**
     * @param User $actor
     * @param int  $diffId
     */
    public function __construct(User $actor, int $diffId)
    {
        $this->actor = $actor;
        $this->diffId = $diffId;
    }
}

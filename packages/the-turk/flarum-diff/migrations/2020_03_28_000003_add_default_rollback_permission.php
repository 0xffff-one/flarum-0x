<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    'rollbackEditHistory'     => Group::MODERATOR_ID,
    'selfRollbackEditHistory' => Group::MEMBER_ID,
]);

<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    'viewEditHistory'       => Group::MEMBER_ID,
    'deleteEditHistory'     => Group::MODERATOR_ID,
    'selfDeleteEditHistory' => Group::MEMBER_ID,
]);

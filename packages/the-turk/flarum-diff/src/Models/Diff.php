<?php

namespace TheTurk\Diff\Models;

use Flarum\Database\AbstractModel;
use Flarum\User\User;

/**
 * @property int               $id
 * @property int               $revision
 * @property string            $content
 * @property int               $post_id
 * @property \Flarum\Post\Post $post
 * @property int|null          $rollbacked_to
 * @property int|null          $actor_id
 * @property User|null         $actor
 * @property int|null          $deleted_user_id
 * @property int|null          $rollbacked_user_id
 * @property User|null         $deleted_user
 * @property User|null         $rollbacked_user
 * @property \Carbon\Carbon    $created_at
 * @property \Carbon\Carbon    $deleted_at
 * @property \Carbon\Carbon    $rollbacked_at
 * @property int               $archive_id
 */
class Diff extends AbstractModel
{
    /**
     * {@inheritdoc}
     */
    protected $table = 'post_edit_histories';

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'deleted_at', 'rollbacked_at'];

    /**
     * @param $revision
     * @param $postId
     * @param $actorId
     * @param $content
     *
     * @return static
     */
    public static function build($revision, $postId, $actorId, $content)
    {
        $diff = new static();

        $diff->revision = $revision;
        $diff->post_id = $postId;
        $diff->actor_id = $actorId;
        $diff->content = $content;

        return $diff;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function deletedUser()
    {
        return $this->belongsTo(User::class, 'deleted_user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rollbackedUser()
    {
        return $this->belongsTo(User::class, 'rollbacked_user_id');
    }
}

<?php

namespace TheTurk\Diff\Api\Serializers;

use Flarum\Api\Serializer\PostSerializer;
use Flarum\Extension\ExtensionManager;
use Flarum\Post\Post;
use TheTurk\Diff\Models\Diff;

class SerializeDiffsOnPosts
{
    /**
     * @var ExtensionManager
     */
    protected $extensions;

    /**
     * @param ExtensionManager $extensions
     */
    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
    }

    /**
     * @param PostSerializer $serializer
     * @param Post           $model
     * @param array          $attributes
     *
     * @return array
     */
    public function __invoke(PostSerializer $serializer, Post $model, array $attributes)
    {
        $isSelf = $serializer->getActor()->id === $model->user_id;

        // integration with kvothe/reply-to-see extension
        $replied = true;

        if ($this->extensions->isEnabled('kvothe-reply-to-see')) {
            $users = [];
            $usersModel = $model['discussion']->participants()->get('id');

            foreach ($usersModel as $user) {
                $users[] = $user->id;
            }

            $replied = !$serializer->getActor()->isGuest() && in_array($serializer->getActor()->id, $users);
        }

        // set permission attributes
        $attributes['canViewEditHistory'] =
            $serializer->getActor()->can('viewEditHistory') && $replied;

        $attributes['canDeleteEditHistory'] =
            ($serializer->getActor()->can('deleteEditHistory')
                || ($isSelf && $serializer->getActor()->can('selfDeleteEditHistory')));

        $attributes['canRollbackEditHistory'] =
            ($serializer->getActor()->can('rollbackEditHistory')
                || ($isSelf && $serializer->getActor()->can('selfRollbackEditHistory')));

        // get post's revision count
        $diffSubject = Diff::where('post_id', $model->id);
        $revisionCount = ($diffSubject->exists() ? $diffSubject->max('revision') : 0);

        $attributes['revisionCount'] = $revisionCount;

        return $attributes;
    }
}

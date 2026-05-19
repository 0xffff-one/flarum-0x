/*
 * This file is part of MathRen.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import EditPostComposer from 'flarum/forum/components/EditPostComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';

/**
 * Returns a list of native Flarum composer components.
 * This list will be used to determine if a composer
 * defined by a third-party extension.
 *
 * @return { Array }
 */
export default function getFlarumComposers() {
  return [DiscussionComposer, EditPostComposer, ReplyComposer];
}

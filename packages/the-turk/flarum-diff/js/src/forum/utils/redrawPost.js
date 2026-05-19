/**
 * Redraw the post.
 * Workaround for - SubtreeRetainer doesn't allow redrawing post
 * https://discuss.flarum.org/d/22755-mithril-related-issues-on-poststream-items
 *
 * @param {Object} post
 */
export default function redrawPost(post) {
  return post.save({}).then(() => m.redraw());
}

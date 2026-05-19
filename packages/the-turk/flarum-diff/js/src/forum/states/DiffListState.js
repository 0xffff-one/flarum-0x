import redrawPost from '../utils/redrawPost';

export default class DiffListState {
  constructor(post, forModal, moreResults, selectedItem) {
    this.post = post;
    this.forModal = forModal;
    this.moreResults = moreResults || false;
    this.selectedItem = selectedItem;
    this.loading = false;

    if (!app.cache.diffs) {
      app.cache.diffs = [];
    }
  }

  /**
   * Load revisions.
   *
   * @public
   */
  load() {
    // don't do anthing if we already cached revisions for the post.
    // lazy-loading will perform loadMore() if there are moreResults
    if (app.cache.diffs[this.post.id()]) return this.redrawList();

    this.loadMore();
  }

  /**
   * Load the next page of revision results.
   *
   * @public
   */
  loadMore() {
    this.loading = true;
    this.redrawList();

    // don't do anthing if we already cached ALL revisions for the post.
    if (app.cache.diffs[this.post.id()] && app.cache.diffs[this.post.id()].length == this.post.revisionCount()) {
      return;
    }

    // set URL parameters
    const params = app.cache.diffs[this.post.id()]
      ? {
          id: this.post.id(),
          page: {
            offset: app.cache.diffs[this.post.id()].length * 10,
          },
        }
      : {
          id: this.post.id(),
        };

    return app.store
      .find('diff', params)
      .then(this.parseResults.bind(this))
      .catch(() => {})
      .then(() => {
        this.loading = false;
        this.redrawList();
      });
  }

  /**
   * Parse results and append them to the revision list.
   *
   * @param {Diff[]} results
   * @return {Diff[]}
   */
  parseResults(results) {
    app.cache.diffs[this.post.id()] = app.cache.diffs[this.post.id()] || [];

    if (results.length) app.cache.diffs[this.post.id()].push(results);

    this.moreResults = !!results.payload.links.next;

    return results;
  }

  /**
   * Redraw the list based on parent component.
   */
  redrawList() {
    m.redraw();

    // because we don't need to redraw the post
    // to update DiffList in DiffModal.
    // We just need it for updating DiffDropdown.
    if (this.forModal) return;

    return redrawPost(this.post);
  }
}

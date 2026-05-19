import { extend } from 'flarum/common/extend';

import app from 'flarum/common/app';
import CommentPost from 'flarum/common/components/CommentPost';
import Page from 'flarum/common/components/Page';
import Post from 'flarum/common/models/Post';
import Model from 'flarum/common/Model';

import Diff from './models/Diff';
import DiffDropdown from './components/DiffDropdown';

app.initializers.add('the-turk-diff', () => {
  app.store.models.diff = Diff;
  Post.prototype.revisionCount = Model.attribute('revisionCount');
  Post.prototype.canViewEditHistory = Model.attribute('canViewEditHistory');
  Post.prototype.canRollbackEditHistory = Model.attribute('canRollbackEditHistory');
  Post.prototype.canDeleteEditHistory = Model.attribute('canDeleteEditHistory');

  extend(CommentPost.prototype, 'headerItems', function (items) {
    const post = this.attrs.post;

    // replace "edited" text to "edited" button
    if (post.isEdited() && !post.isHidden() && post.canViewEditHistory() && post.revisionCount() > 0) {
      items.replace('edited', DiffDropdown.component({ post }));
    }

    // remove diffs cache when post is editing
    if (this.isEditing() && app.cache.diffs && app.cache.diffs[this.attrs.post.id()]) {
      delete app.cache.diffs[this.attrs.post.id()];
    }
  });

  // prevent dropdown from closing when user clicks on deleted diff
  extend(Page.prototype, 'oninit', function () {
    $('body').on('click', 'li.ParentDiff.DeletedDiff, li.SubDiff', function (e) {
      e.stopPropagation();
    });
  });
});

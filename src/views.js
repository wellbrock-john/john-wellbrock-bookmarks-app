import store from './store';
import templates from './bookmark-app';

const bookmarkList = function () {
  const theButtons = templates.theButtons();
  const bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  const bookmarkList = templates.bookmarkList(bookmarks);
  const errorMessage = templates.errorMessage();
  return [ theButtons, bookmarkList, errorMessage ];
};

const newBookmark = function () {
  const newBookmarkForm = templates.newBookmarkForm();
  const errorMessage = templates.errorMessage();
  return [ newBookmarkForm, errorMessage ];
};
export default {
  bookmarkList,
  newBookmark
};
const bookmarks = [
  {
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'A description should go here.',
    expanded: false
  },
  {
    id: '6ffw',
    title: 'Title 2',
    rating: 5,
    url: 'http://www.title2.com',
    description: 'A description should go here.',
    expanded: false
  },
  {
    id: 'fw544',
    title: 'This is a test for how a long title will fit into the bookmark app.',
    rating: 4,
    url: 'http://an-ex.ample',
    description: `A description should go here.`,
    expanded: false
  }
];

let error = null;
let newBookmark = {};
let filter = 0;
let currentView = 'bookmarkList';

const updateBookmark = function (id, newData) {
  const item = this.bookmarks.find(currentItem => currentItem.id === id);
  Object.assign(item, newData);
};

const deleteBookmark = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const expandBookmark = function (id) {
  const item = this.bookmarks.find(currentItem => currentItem.id === id);
  item.expanded = !item.expanded;
};

const addBookmarkInStore = function (bookmark) {
  this.bookmarks.push({
    id: bookmark.id,
    title: bookmark.title,
    rating: bookmark.rating,
    url: bookmark.url,
    description: bookmark.desc ? bookmark.desc : '',
    expanded: false
  });
};

export default {
  bookmarks,
  newBookmark,
  filter,
  currentView,
  error,

  updateBookmark,
  deleteBookmark,
  addBookmarkInStore,

  expandBookmark
};
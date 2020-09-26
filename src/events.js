import $ from 'jquery';
import store from './store';
import api from './api';
import { render } from './render';

const findId = function (target) {
  return $(target).closest('li').data('id');
};

const handleNewFormSubmit = function () {
  $('main').on('submit', '#new-bookmark-form', event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBookmark = {};
    formData.forEach((val, name) => newBookmark[name] = val);
    api.createDataRecord(newBookmark)
      .then(data => {
        store.addBookmarkInStore(data);
        store.newBookmark = {};
        store.currentView = 'bookmarkList';
        render();
      })
      .catch(error => {
        store.error = error;
        render();
        store.error = null;
      });
  });
};

const handleFilter = function () {
    $('main').on('change', '#filter-select', event => {
      store.filter = $(event.target).val();
      render();
    });
  };

const handleExpandBookmark = function () {
  $('main').on('click', '.js-bookmark-name, .collapse-bookmark', event => {
    const id = findId(event.currentTarget);
    store.expandBookmark(id);
    render();
  });
};

const handleAddNew = function () {
  $('main').on('click', '.js-new-bookmark', () => {
    store.currentView = 'newBookmark';
    render();
  });
};

const handleRatingChange = function () {
    $('main').on('change', '.js-bookmark-rating', event => {
      const newRating = $(event.currentTarget)
        .find('input[type="radio"]:checked').val();
      const id = findId(event.currentTarget);
      const updateData = {
        rating: parseInt(newRating)
      };
      api.updateDataRecord(id, updateData)
        .then(() => {
          store.updateBookmark(id, updateData);
          render();
        })
        .catch(error => {
          store.error = error;
          render();
          store.error = null;
        });
    });
  };

const handleNewBookmarkRatingChange = function () {
  $('main').on('change', '.js-new-bookmark-rating', event => {
    const newBookmark = {
      title: $('#new-bookmark-name').val(),
      rating: parseInt($(event.currentTarget)
        .find('input[type="radio"]:checked').val()),
      url: $('#new-bookmark-url').val(),
      description: $('#new-bookmark-description').val()
    };
    Object.assign(store.newBookmark, newBookmark);
    render();
  });
};

const handleDelete = function () {
    $('main').on('click', '.js-bookmark-delete', event => {
      const id = findId(event.currentTarget);
      api.deleteDataRecord(id)
        .then(() => {
          store.deleteBookmark(id);
          render();
        })
        .catch(error => {
          store.error = error;
          render();
          store.error = null;
        });
    });
  };

const bindEventHandlers = function () {
  handleExpandBookmark();
  handleRatingChange();
  handleDelete();
  handleAddNew();
  handleNewBookmarkRatingChange();
  handleFilter();
  handleNewFormSubmit();
};

export { bindEventHandlers };
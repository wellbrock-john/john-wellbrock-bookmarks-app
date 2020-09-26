import './index.css';

import $ from 'jquery';

import { bindEventHandlers } from './events';
import { render } from './render';
import store from './store';

import api from './api';

const main = function () {

  bindEventHandlers();

  store.bookmarks = [];
  api.readDataRecords()
    .then(response => {
      response.forEach(bookmark => store.addBookmarkInStore(bookmark));
      render();
    })
    .catch(error => {
      store.error = error;
      render();
      store.error = null;
    });
};

$(main);
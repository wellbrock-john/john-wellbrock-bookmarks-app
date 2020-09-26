import store from './store';

const errorMessage = function () {
    return store.error ? `<footer class="error">API Error ${store.error.code}: ${store.error.message}</footer>` : '';
};

const ratingId = function (id, rating) {
    return `${id}-rating-${rating}`;
};

const ratingByStars = function (item) {

    let stars = [];
    for (let i = 1; i <= item.rating; i++) {
        stars.push({
            rating: i,
            class: '',
            checked: i === item.rating ? 'checked' : ''
        });
    }

    for (let i = item.rating; i < 5; i++) {
        stars.push({
            rating: i + 1,
            class: '',
            checked: ''
        });
    }

    return stars.map(star => {
        return `<label for="${ratingId(item.id, star.rating)}">
    <input class='hidden' type="radio" ${star.checked}
      name="rating" 
      id="${ratingId(item.id, star.rating)}" value="${star.rating}"/>
      <span class="hidden">
         ${star.rating} stars.
    </span>
    `;
    }).join('');
};

const listItem = function (item) {
    if (item.expanded) {
        return `
    <li class="js-bookmark-item bookmark-item-expanded" data-id="${item.id}">
    
    <h2 class="js-bookmark-name bookmark-name">${item.title}</h2>
      <section class="bookmark">  
        <section class="bookmark-row">
          <div class="js-bookmark-rating bookmark-rating">
            ${ratingByStars(item)}
          </div>
        </section>
      <section class="bookmark-body">
        <p class="bookmark-description">
          ${item.description}
        <footer>
        <button class="js-bookmark-delete bookmark-delete">
            <span>Delete Bookmark</span>
          </button>
          <button class="collapse-bookmark">Collapse</button>
          <button class="bookmark-link">Visit Site</button>
        </footer>
      </section>
    </section>
  </li>
    `;
    } else {
        return `
    <li class="js-bookmark-item bookmark-item" data-id="${item.id}">
      <section class="bookmark-row">
        <button class="js-bookmark-name bookmark-name">${item.title}</button>
        <div class="bookmark-rating js-bookmark-rating">
        ${ratingByStars(item)}
        </div>
      </section>
    </li>
    `;
    }
};

const bookmarkList = function (bookmarks) {
    let elementList = bookmarks.map(item => listItem(item));
    return `
    <ul class="bookmark-list">
      ${elementList.join('')}
    </ul>
  `;
};

const theButtons = function () {
    return `
    <section class="js-the-buttons the-buttons">
      <button class="js-new-bookmark new-bookmark">
        <div class="new-bookmark-button">Add new bookmark</div>
      </button>
      <div class="filter-bookmarks">
        <select id="filter-select">
          <option disabled selected hidden>Filter by</option>
          <option value=5>Show 5 Stars</option>
          <option value=4>Show 4+ Stars</option>
          <option value=3>Show 3+ Stars</option>
          <option value=2>Show 2+ Stars</option>
          <option value=1>Show 1+ Stars</option>
          <option value=0>Show All</option>
        </select>
      </div>
    </section>
  `;
};

const newBookmarkForm = function () {
    const title = store.newBookmark.title ?
        `value="${store.newBookmark.title}"` : '';
    const rating = ratingByStars({
        rating: store.newBookmark.rating ? store.newBookmark.rating : 0,
        title: 'new-bookmark'
    });
    const description = store.newBookmark.description ?
        store.newBookmark.description : '';
    const url = store.newBookmark.url ?
        `value="${store.newBookmark.url}"` : '';
    return `
  <h2>Add New Bookmark</h2>
    <form id="new-bookmark-form">
      <section>
        <p>
          <label class="hidden" for="new-bookmark-name">
            New Bookmark name</label>
          <input class="new-bookmark-form-input" type="text" name="title" id="new-bookmark-name" placeholder="New Bookmark Name"
          required ${title}/>
        </p >
        <p><label class="hidden" for="new-bookmark-url">
    New Bookmark Url</label>
          <input class="new-bookmark-form-input" type="url" name="url" id="new-bookmark-url"
            placeholder="URL, eg. https://example.code" required ${url}/></p>
        <p><label class="hidden" for="new-bookmark-rating">
    New Bookmark Rating</label>
          <div class="js-new-bookmark-rating new-bookmark-rating">
      ${rating}
          </div>
        </p>
      </section >
      <section class="bookmark-body">
        <p><label class="hidden" for="new-bookmark-description">
      New Bookmark Description</label>
          <textarea class="new-bookmark-form-input" name="desc" id="new-bookmark-description" rows=4 placeholder="Enter description">${description}</textarea>
        </p>
        <p><button type="submit" class="new-bookmark-form-input">Submit</button></p>
      </section >
    </form >
  `;
};

export default {
    listItem,
    ratingByStars,
    errorMessage,
    bookmarkList,
    theButtons,
    newBookmarkForm
};


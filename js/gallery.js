'use strict';

(function () {
  var PHOTO_COUNT = 25;
  var NEW_PHOTO_COUNT = 10;

  var isLoaded = false;
  var photos = [];
  var filtersSection = document.querySelector('.img-filters');
  var filters = filtersSection.querySelectorAll('.img-filters__button');
  var state = '';

  function filterPhotos() {
    var filtered = photos;

    if (state === 'filter-new') {
      filtered = window.utils.shuffleArray(photos.slice()).slice(PHOTO_COUNT - NEW_PHOTO_COUNT);
    }
    if (state === 'filter-discussed') {
      filtered = photos.slice().sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return filtered;
  }

  function updatePhotoList(evt) {
    filters.forEach(function (filter) {
      filter.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');

    window.render.clearPhotoList();

    var filteredList = filterPhotos();
    window.render.renderPhotoList(filteredList, filteredList.length);
  }

  function changeFilter(evt) {
    state = evt.target.id;
    window.utils.setDebounce(function () {
      updatePhotoList(evt);
    });
  }

  function onFilterClick(evt) {
    changeFilter(evt);
  }

  function onFilterEnterPress(evt) {
    window.utils.isEnterEvent(evt, function () {
      changeFilter(evt);
    });
  }

  function onPhotosSuccess(data) {
    window.render.renderPhotoList(data, PHOTO_COUNT);
    isLoaded = true;
    photos = data;

    filtersSection.classList.remove('img-filters--inactive');
    filters.forEach(function (filter) {
      filter.addEventListener('click', onFilterClick);
      filter.addEventListener('keydown', onFilterEnterPress);
    });
  }

  function galleryLoad() {
    if (!isLoaded) {
      window.backend.load(onPhotosSuccess);
    }
  }

  galleryLoad();
})();

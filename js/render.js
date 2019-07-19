'use strict';

(function () {
  var PHOTO_COUNT = 25;
  var pictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();


  function renderPhoto(photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  }

  window.render = {
    renderPhotoList: function (data) {
      for (var i = 0; i < PHOTO_COUNT; i++) {
        fragment.appendChild(renderPhoto(data[i]));
      }

      pictures.appendChild(fragment);
    }
  };
})();

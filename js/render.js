'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();


  function renderPhoto(photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    function openPicture() {
      window.picture.open(photo);
    }

    function onPhotoClick() {
      openPicture();
    }

    photoElement.addEventListener('click', onPhotoClick);
    return photoElement;
  }

  window.render = {
    renderPhotoList: function (data, count) {
      for (var i = 0; i < count; i++) {
        fragment.appendChild(renderPhoto(data[i]));
      }

      pictures.appendChild(fragment);
    },
    clearPhotoList: function () {
      var list = document.querySelector('.pictures');
      var photos = list.children;

      for (var i = photos.length - 1; i > 0; i--) {
        if (photos[i].classList.contains('picture')) {
          photos[i].remove();
        }
      }
    }
  };
})();

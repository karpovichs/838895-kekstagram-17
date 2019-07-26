'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  function Photo(data) {
    this.url = data.url;
    this.comments = data.comments;
    this.likes = data.likes;
    this.element = null;
  }

  Photo.prototype.create = function create() {
    this.element = photoTemplate.cloneNode(true);
    return this;
  };

  Photo.prototype.fill = function fill() {
    this.element.querySelector('img').src = this.url;
    this.element.querySelector('.picture__comments').textContent = this.comments.length;
    this.element.querySelector('.picture__likes').textContent = this.likes;
    return this;
  };

  function renderPhoto(data) {
    var photo = new Photo(data);
    photo.create()
      .fill();

    function openPicture() {
      window.picture.open(data);
    }

    function onPhotoClick() {
      openPicture();
    }

    function onPhotoEnterPress(evt) {
      window.utils.isEnterEvent(evt, openPicture);
    }

    photo.element.addEventListener('click', onPhotoClick);
    photo.element.addEventListener('keydown', onPhotoEnterPress);

    return photo.element;
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

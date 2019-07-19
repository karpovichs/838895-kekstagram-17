'use strict';

(function () {
  var photoInput = document.querySelector('#upload-file');
  var isLoaded = false;
  var photos = [];

  function onPhotoInputClick() {
    window.edit.openEdit();
  }

  function onPhotosSuccess(data) {
    window.render.renderPhotoList(data);
    isLoaded = true;
    photos = data;
  }

  function onPhotosError() {
    console.log('oups');
  }

  function galleryLoad() {
    if (!isLoaded) {
      window.backend.load(onPhotosSuccess, onPhotosError);
    }
  }

  galleryLoad();
  photoInput.addEventListener('change', onPhotoInputClick);
})();

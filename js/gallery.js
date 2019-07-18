'use strict';

(function () {
  var photoInput = document.querySelector('#upload-file');

  function onPhotoInputClick() {
    window.edit.openEdit();
  }

  photoInput.addEventListener('change', onPhotoInputClick);
  window.render.renderPhotoList();
})();

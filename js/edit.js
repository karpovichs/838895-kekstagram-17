'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var photoInput = document.querySelector('#upload-file');
  var photoEdit = document.querySelector('.img-upload__form');
  var photoPreview = photoEdit.querySelector('.img-upload__preview').querySelector('img');
  var effectsPreview = photoEdit.querySelectorAll('.effects__preview');
  var photoOverlay = photoEdit.querySelector('.img-upload__overlay');
  var closeButton = photoEdit.querySelector('#upload-cancel');
  var effectLevelPin = photoEdit.querySelector('.effect-level__pin ');
  var effects = photoEdit.querySelectorAll('.effects__radio');
  var commentInput = photoEdit.querySelector('.text__description');
  var hashtagInput = photoEdit.querySelector('.text__hashtags');

  function readAndPreview(file, image, type) {
    var matches = FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (type === 'effects') {
          image.style = 'background-image: url(' + reader.result + ')';
        } else {
          image.src = reader.result;
        }
      });
      reader.readAsDataURL(file);

      return true;
    } else {
      return false;
    }
  }

  function onEditEscPress(evt) {
    window.utils.isEscEvent(evt, function () {
      if (evt.target !== commentInput && evt.target !== hashtagInput) {
        closeEdit();
      }
    });
  }

  function onCloseButtonClick() {
    closeEdit();
  }

  function onCloseButtonEnterPress(evt) {
    window.utils.isEnterEvent(evt, function () {
      closeEdit();
    });
  }

  function addEffectsChange() {
    effects.forEach(function (effect) {
      if (effect.checked) {
        window.effect.setEffectClass(effect);
      }
      effect.addEventListener('click', window.effect.addEffect);
    });
  }

  function removeEffectsChange() {
    effects.forEach(function (effect) {
      effect.removeEventListener('click', window.effect.addEffect);
    });
  }

  function closeEdit() {
    photoOverlay.classList.add('hidden');
    photoEdit.reset();

    removeEffectsChange();
    window.effect.resetEffectLevel();
    effectLevelPin.removeEventListener('mousedown', window.effect.onPinMove);

    photoEdit.removeEventListener('submit', onFormSubmit);

    hashtagInput.removeEventListener('change', window.form.onHashtagInputValidation);

    window.removeEventListener('keydown', onEditEscPress);
    closeButton.removeEventListener('click', onCloseButtonClick);
    closeButton.removeEventListener('keydown', onCloseButtonEnterPress);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();

    window.backend.save(new FormData(photoEdit), onSubmitSuccess, onSubmitError);
  }

  function onSubmitSuccess() {
    closeEdit();
    window.alerts.showSuccess();
    photoEdit.reset();
  }

  function onTryAgainErrorButtonClick() {
    window.alerts.hide();
  }

  function onReloadErrorButtonCLick() {
    window.alerts.hide();
    closeEdit();
  }

  function onSubmitError() {
    window.alerts.showError();
    var errorButtons = document.querySelectorAll('.error__button');
    errorButtons[0].addEventListener('click', onTryAgainErrorButtonClick);
    errorButtons[1].addEventListener('click', onReloadErrorButtonCLick);
  }

  function openEdit() {
    photoOverlay.classList.remove('hidden');

    addEffectsChange();
    window.effect.changeEffectLevel();
    effectLevelPin.addEventListener('mousedown', window.effect.onPinMove);

    photoEdit.addEventListener('submit', onFormSubmit);

    hashtagInput.addEventListener('change', window.form.onHashtagInputValidation);

    window.addEventListener('keydown', onEditEscPress);
    closeButton.addEventListener('click', onCloseButtonClick);
    closeButton.addEventListener('keydown', onCloseButtonEnterPress);
  }

  function onPhotoInputClick() {
    openEdit();
  }

  photoInput.addEventListener('change', function () {
    var file = photoInput.files[0];
    readAndPreview(file, photoPreview);
    onPhotoInputClick();

    effectsPreview.forEach(function (preview) {
      readAndPreview(file, preview, 'effects');
    });
  });
})();

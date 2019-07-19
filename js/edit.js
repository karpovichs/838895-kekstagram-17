'use strict';

(function () {
  var photoEdit = document.querySelector('.img-upload__form');
  var photoOverlay = photoEdit.querySelector('.img-upload__overlay');
  var closeButton = photoEdit.querySelector('#upload-cancel');
  var effectLevelPin = photoEdit.querySelector('.effect-level__pin ');
  var effects = photoEdit.querySelectorAll('.effects__radio');
  var commentInput = photoEdit.querySelector('.text__description');
  var hashtagInput = photoEdit.querySelector('.text__hashtags');

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

  window.edit = {
    openEdit: function () {
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
  };
})();

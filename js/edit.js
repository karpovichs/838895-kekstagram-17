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

    // Убрать обработчик событий на сабмит

    hashtagInput.removeEventListener('change', window.form.onHashtagInputValidation);

    window.removeEventListener('keydown', onEditEscPress);
    closeButton.removeEventListener('click', onCloseButtonClick);
    closeButton.removeEventListener('keydown', onCloseButtonEnterPress);
  }

  window.edit = {
    openEdit: function () {
      photoOverlay.classList.remove('hidden');

      addEffectsChange();
      window.effect.changeEffectLevel();
      effectLevelPin.addEventListener('mousedown', window.effect.onPinMove);

      photoEdit.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      hashtagInput.addEventListener('change', window.form.onHashtagInputValidation);

      window.addEventListener('keydown', onEditEscPress);
      closeButton.addEventListener('click', onCloseButtonClick);
      closeButton.addEventListener('keydown', onCloseButtonEnterPress);
    }
  };
})();

'use strict';

(function () {
  var Limit = {
    RIGHT: 100,
    LEFT: 0
  };
  var photoEdit = document.querySelector('.img-upload__form');
  var preview = photoEdit.querySelector('.img-upload__preview');
  var effectLevelPin = photoEdit.querySelector('.effect-level__pin ');
  var effectLevelValue = photoEdit.querySelector('.effect-level__value');
  var effectLevelDepth = photoEdit.querySelector('.effect-level__depth');
  var effectDefault = effectLevelPin.style.left;
  var scaleValue = photoEdit.querySelector('.scale__control--value');

  function Coordinates(x) {
    this.x = x;
  }

  Coordinates.prototype.setCoordinates = function setCoordinates(x) {
    this.x = x;
  };

  function changeEffectLevelValue() {
    effectLevelValue.value = parseInt(effectLevelPin.style.left, 10);
  }

  function changeScale(evt) {
    var valueNumber = parseInt(scaleValue.value, 10);

    if ((valueNumber - 25) >= 25 && evt.target.classList.contains('scale__control--smaller')) {
      scaleValue.value = valueNumber - 25 + '%';
    }

    if ((valueNumber + 25) <= 100 && evt.target.classList.contains('scale__control--bigger')) {
      scaleValue.value = valueNumber + 25 + '%';
    }

    preview.querySelector('img').style.transform = 'scale(' + parseInt(scaleValue.value, 10) * 0.01 + ')';
  }

  window.effect = {
    onPinMove: function (evt) {
      var effectLevelLine = document.querySelector('.effect-level__line').offsetWidth;
      var startCoords = new Coordinates(evt.clientX);
      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        var shift = new Coordinates(startCoords.x - moveEvt.clientX);
        startCoords.setCoordinates(moveEvt.clientX);
        effectLevelPin.style.left = Math.max(Math.min(((effectLevelPin.offsetLeft - shift.x) * 100 / effectLevelLine), Limit.RIGHT), Limit.LEFT) + '%';
        effectLevelDepth.style.width = effectLevelPin.style.left;
        changeEffectLevelValue();
        window.effect.changeEffectLevel();
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();
        window.effect.changeEffectLevel();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    setEffectClass: function (effect) {
      var classes = preview.classList;
      classes.forEach(function (item) {
        if (item !== 'img-upload__preview') {
          preview.classList.remove(item);
        }
      });

      var className = 'effects__preview--' + effect.value;
      preview.classList.add(className);
    },
    addEffect: function (evt) {
      window.effect.setEffectClass(evt.target);

      preview.style = 'none';
      effectLevelValue.value = 100;
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
    },
    changeEffectLevel: function () {
      if (preview.classList.contains('effects__preview--none')) {
        preview.style.filter = 'none';
      }
      if (preview.classList.contains('effects__preview--chrome')) {
        preview.style.filter = 'grayscale(' + (effectLevelValue.value / 100) + ')';
      }
      if (preview.classList.contains('effects__preview--sepia')) {
        preview.style.filter = 'sepia(' + (effectLevelValue.value / 100) + ')';
      }
      if (preview.classList.contains('effects__preview--marvin')) {
        preview.style.filter = 'invert(' + effectLevelValue.value + '%)';
      }
      if (preview.classList.contains('effects__preview--phobos')) {
        preview.style.filter = 'blur(' + (effectLevelValue.value * 3 / 100) + 'px)';
      }
      if (preview.classList.contains('effects__preview--heat')) {
        preview.style.filter = 'brightness(' + (effectLevelValue.value * 2 / 100 + 1) + ')';
      }
    },
    resetEffectLevel: function () {
      effectLevelPin.style.left = effectDefault;
      effectLevelDepth.style.width = effectDefault;
      preview.querySelector('img').style.transform = 'none';
      changeEffectLevelValue();
    },
    onScaleClick: function (evt) {
      changeScale(evt);
    }
  };
})();

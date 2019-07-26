'use strict';

(function () {
  var HASHTAG_LENGTH = 21;
  var MAX_HASHTAGS = 5;
  var photoEdit = document.querySelector('.img-upload__form');
  var hashtagInput = photoEdit.querySelector('.text__hashtags');

  function isHashtagRepeat(array, input) {
    var lowerCasedArr = array.map(function (el) {
      return el.toLowerCase();
    }).sort();
    for (var i = 0; i < lowerCasedArr.length; i++) {
      if (lowerCasedArr[i] === lowerCasedArr[i + 1]) {
        input.setCustomValidity('Хэштеги не должны повторяться');
        return;
      }
    }
  }

  window.form = {
    onHashtagInputValidation: function () {
      hashtagInput.setCustomValidity('');
      var hashtagArr = hashtagInput.value.split(' ').filter(function (el) {
        return el;
      });

      if (hashtagArr.length > MAX_HASHTAGS) {
        hashtagInput.setCustomValidity('Хэштегов не должно быть больше 5');
        return;
      }

      hashtagArr.forEach(function (tag) {
        if (tag.charAt(0) !== '#') {
          hashtagInput.setCustomValidity('Хэштег должен начинаться с #');
          return;
        }

        if (tag.length > HASHTAG_LENGTH) {
          hashtagInput.setCustomValidity('Хэштег не должен быть длиннее 20 символов');
          return;
        }

        if (tag.length === 1 && tag.charAt(0) === '#') {
          hashtagInput.setCustomValidity('Хэштег не должен состоять только из #');
          return;
        }

        if (tag.charAt(tag.length - 1) === ',') {
          hashtagInput.setCustomValidity('Хэштеги долны разделяться пробелом, запятых быть не должно');
        }
      });

      isHashtagRepeat(hashtagArr, hashtagInput);
    }
  };
})();

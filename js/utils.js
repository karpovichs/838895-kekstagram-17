'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ENTER) {
        action();
      }
    },
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
      return array;
    },
    setDebounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };
})();

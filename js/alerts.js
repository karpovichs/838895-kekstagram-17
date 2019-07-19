'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function createAlert(template, className) {
    var fragment = document.createDocumentFragment();
    var element = template.cloneNode(true);
    fragment.appendChild(element);
    document.querySelector('main').appendChild(fragment);
    element.style = 'z-index: 1000';
    element.classList.add(className);
  }

  function hideAlert() {
    var alerts = document.querySelectorAll('.error, .success');
    alerts.forEach(function (alert) {
      alert.remove();
    });
    document.removeEventListener('click', onAlertClick);
    document.removeEventListener('keydown', onAlertEscPress);
  }

  function onAlertEscPress(evt) {
    window.utils.isEscEvent(evt, hideAlert);
  }

  function onAlertClick(evt) {
    if (!evt.target.classList.contains('error__button')) {
      hideAlert();
    }
  }

  window.alerts = {
    showError: function () {
      createAlert(errorTemplate, 'error');
      document.addEventListener('click', onAlertClick);
      document.addEventListener('keydown', onAlertEscPress);
    },
    showSuccess: function () {
      createAlert(successTemplate, 'success');
      document.addEventListener('click', onAlertClick);
      document.addEventListener('keydown', onAlertEscPress);
    },
    hide: function () {
      hideAlert();
    }
  };
})();

'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var closePictureButton = bigPicture.querySelector('#picture-cancel');
  var loadMoreButton = bigPicture.querySelector('.comments-loader');

  function userCommentsReset() {
    var userComments = bigPicture.querySelectorAll('.social__comment');
    userComments.forEach(function (comment) {
      comment.remove();
    });
  }

  function setComment(data) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    var image = document.createElement('img');
    image.classList.add('social__picture');
    image.src = data.avatar;
    image.alt = 'Аватар комментатора фотографии';
    image.width = '35';
    image.height = '35';
    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = data.message;
    comment.appendChild(image);
    comment.appendChild(text);
    bigPicture.querySelector('.social__comments').appendChild(comment);
  }

  function renderComments(data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < takeNumber; i++) {
      setComment(data[i]);
    }
  }

  function openPicture(photo) {
    var commentsList = photo.comments;
    userCommentsReset();
    renderComments(commentsList);

    loadMoreButton.classList.remove('hidden');
    if (commentsList.length < 5) {
      loadMoreButton.classList.add('hidden');
    }

    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    loadMoreButton.addEventListener('click', loadMore);

    bigPicture.classList.remove('hidden');

    window.addEventListener('keydown', onPictureEscPress);
    closePictureButton.addEventListener('click', onClosePictureClick);

    function loadMore() {
      commentsList = commentsList.slice(5);
      if (commentsList.length < 5) {
        loadMoreButton.classList.add('hidden');
      }
      renderComments(commentsList);
      bigPicture.querySelector('.social__comment-count').firstChild.textContent = bigPicture.querySelectorAll('.social__comment').length + ' из ';
    }

    function closePicture() {
      bigPicture.classList.add('hidden');
      loadMoreButton.removeEventListener('click', loadMore);
      bigPicture.querySelector('.social__comment-count').firstChild.textContent = '5 из ';
      window.removeEventListener('keydown', onPictureEscPress);
      closePictureButton.removeEventListener('click', onClosePictureClick);
    }

    function onClosePictureClick() {
      closePicture();

    }

    function onPictureEscPress(evt) {
      window.utils.isEscEvent(evt, closePicture);
    }
  }

  window.picture = {
    open: function (photo) {
      openPicture(photo);
    }
  };
})();

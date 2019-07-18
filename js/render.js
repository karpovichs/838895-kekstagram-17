'use strict';

(function () {
  var PHOTO_COUNT = 25;
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Артём', 'Даша', 'Максим', 'Алла', 'Марина', 'Аня'];
  var pictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var userPictures = createPhotoArray();
  var fragment = document.createDocumentFragment();

  function getComments() {
    var quantity = window.utils.getRandomNumber(1, 7);
    var comments = [];
    var commentsNames = window.utils.shuffleArray(NAMES);
    var commentsMessages = window.utils.shuffleArray(MESSAGES);
    for (var i = 0; i < quantity; i++) {
      comments.push({
        avatar: 'img/avatar-' + (i + 1) + '.svg',
        message: commentsMessages[i],
        name: commentsNames[i]
      });
    }
    return comments;
  }

  function createPhotoArray() {
    var photos = [];
    for (var i = 0; i < PHOTO_COUNT; i++) {
      photos.push({
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.utils.getRandomNumber(15, 200),
        comments: getComments()
      });
    }
    return photos;
  }

  function renderPhoto(photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  }

  window.render = {
    renderPhotoList: function () {
      for (var i = 0; i < PHOTO_COUNT; i++) {
        fragment.appendChild(renderPhoto(userPictures[i]));
      }

      pictures.appendChild(fragment);
    }
  };
})();

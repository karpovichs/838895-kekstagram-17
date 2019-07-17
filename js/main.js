'use strict';

var PHOTO_COUNT = 25;
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артём', 'Даша', 'Максим', 'Алла', 'Марина', 'Аня'];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

function getComments() {
  var quantity = getRandomNumber(1, 7);
  var comments = [];
  var commentsNames = shuffleArray(NAMES);
  var commentsMessages = shuffleArray(MESSAGES);
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
      likes: getRandomNumber(15, 200),
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

var pictures = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var userPictures = createPhotoArray();
var fragment = document.createDocumentFragment();

for (var i = 0; i < PHOTO_COUNT; i++) {
  fragment.appendChild(renderPhoto(userPictures[i]));
}

pictures.appendChild(fragment);


var photoInput = document.querySelector('#upload-file');
var photoEdit = document.querySelector('.img-upload__overlay');
var closeButton = photoEdit.querySelector('#upload-cancel');
var preview = photoEdit.querySelector('.img-upload__preview');
var effects = photoEdit.querySelectorAll('.effects__radio');
var effectLevelPin = photoEdit.querySelector('.effect-level__pin ');
var effectLevelValue = photoEdit.querySelector('.effect-level__value');

function addEffect(effect) {
  var classes = preview.classList;
  classes.forEach(function (item) {
    if (item !== 'img-upload__preview') {
      preview.classList.remove(item);
    }
  });
  var className = 'effects__preview--' + effect.value;
  preview.classList.add(className);
  preview.style = 'none';
}

function changeEffectLevel() {
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
}

function openEdit() {
  photoEdit.classList.remove('hidden');
  effects.forEach(function (effect) {
    if (effect.checked) {
      addEffect(effect);
    }
    effect.addEventListener('click', function () {
      addEffect(effect);
    });
  });
  changeEffectLevel();
  effectLevelPin.addEventListener('mouseup', changeEffectLevel);
  window.addEventListener('keydown', onEditEscPress);
  closeButton.addEventListener('click', onCloseButtonClick);
  closeButton.addEventListener('keydown', onCloseButtonEnterPress);
}

function closeEdit() {
  photoEdit.classList.add('hidden');
  window.removeEventListener('keydown', onEditEscPress);
  closeButton.removeEventListener('click', onCloseButtonClick);
  closeButton.removeEventListener('keydown', onCloseButtonEnterPress);
}

function onPhotoInputClick() {
  openEdit();
}

function onEditEscPress(evt) {
  if (evt.keyCode === 27) {
    closeEdit();
  }
}

function onCloseButtonClick() {
  closeEdit();
}

function onCloseButtonEnterPress(evt) {
  if (evt.keyCode === 13) {
    closeEdit();
  }
}

photoInput.addEventListener('change', onPhotoInputClick);

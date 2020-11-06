"use strict";

// Отрисовка карточек

const TYPE_FLAT = ["palace", "flat", "house", "bungalow"];
const TYPE_FLAT_DESCRIPTION = {
  palace: "Дворец",
  flat: "Квартира",
  bungalow: "Бунгало",
  house: "Дом"
};
const TIME_IN = ["12:00", "13:00", "14:00"];
const TIME_OUT = ["12:00", "13:00", "14:00"];
const ROOM_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const ROOM_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const similarAds = 8;
const similarAdsList = document.querySelector(".map__pins");
const similarCardList = document.querySelector(".map");
const filtersContainer = document.querySelector(".map__filters-container");
const sreenWidth = similarAdsList.clientWidth;
const adsTemplate = document.querySelector("#pin").content.querySelector(".map__pin");
const cardTemplate = document.querySelector("#card").content.querySelector(".map__card");
let flats = [];

const getRandomNumber = (min, max) => {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
};

const getrandomArray = (array) => {
  let randomArray = [];
  let randomArrayLength = getRandomNumber(1, array.length);
  for (let i = 0; i < randomArrayLength; i++) {
    randomArray.push(array[i]);
  }
  return randomArray;
};

const renderData = (arrData) => {
  let adsData = {};
  for (let i = 1; i <= similarAds; i++) {
    adsData[i] = {
      author: {
        avatar: "img/avatars/user0" + i + ".png"
      },
      location: {
        x: getRandomNumber(0, (sreenWidth - (sreenWidth / 10))),
        y: getRandomNumber(130, 630)
      },
      offer: {
        title: "Заголовок предложения" + i,
        address: location.x + ", " + location.y,
        price: getRandomNumber(0, 100000),
        type: TYPE_FLAT[getRandomNumber(0, TYPE_FLAT.length - 1)],
        rooms: getRandomNumber(0, 3),
        guests: getRandomNumber(0, 2),
        checkin: TIME_IN[getRandomNumber(0, TIME_IN.length - 1)],
        checkout: TIME_OUT[getRandomNumber(0, TIME_OUT.length - 1)],
        features: getrandomArray(ROOM_FEATURES),
        description: "Описание" + i,
        photos: getrandomArray(ROOM_PHOTOS)
      }
    };
    adsData[i].offer.address = adsData[i].location.x + ", " + adsData[i].location.y;
    arrData.push(adsData[i]);
  }
  return arrData;
};

const renderSimilarAds = (template) => {
  let adsElement = adsTemplate.cloneNode(true);
  adsElement.style = "left: " + (template.location.x + adsElement.style.width) + "px; top: " + (template.location.y + adsElement.style.height) + "px;";
  let image = adsElement.querySelector("img");
  image.src = template.author.avatar;
  image.alt = template.offer.title;
  return adsElement;
};

const renderCards = (template) => {
  let cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector(".popup__title");
  let cardAddress = cardElement.querySelector(".popup__text--address");
  let cardPrice = cardElement.querySelector(".popup__text--price");
  let cardType = cardElement.querySelector(".popup__type");
  let cardRoom = cardElement.querySelector(".popup__text--capacity");
  let cardTime = cardElement.querySelector(".popup__text--time");
  let cardFeaturesList = cardElement.querySelector(".popup__features");
  let cardFeaturesItem = cardFeaturesList.querySelectorAll(".popup__feature");
  let cardDescription = cardElement.querySelector(".popup__description");
  let cardPhotos = cardElement.querySelector(".popup__photos");
  let cardImage = cardPhotos.querySelector(".popup__photo");
  let cardAvatar = cardElement.querySelector(".popup__avatar");
  cardTitle.textContent = template.offer.title;
  cardAddress.textContent = template.offer.address;
  cardPrice.textContent = template.offer.price + "₽/ночь";
  cardType.textContent = TYPE_FLAT_DESCRIPTION[template.offer.type];
  cardRoom.textContent = template.offer.rooms + " комнаты для " + template.offer.guests + " гостей.";
  cardTime.textContent = "Заезд после " + template.offer.checkin + ", выезд до " + template.offer.checkout + ".";
  cardFeaturesItem.forEach(function (value, index) {
    if (!value.classList.contains("popup__feature--" + template.offer.features[index])) {
      value.remove();
    }
  });
  cardDescription.textContent = template.offer.description;
  cardImage.src = template.offer.photos[0];
  if (template.offer.photos.length > 1) {
    for (let i = 1; i < template.offer.photos.length; i++) {
      let cardImageTemplate = cardImage.cloneNode(true);
      let imgFragment = document.createDocumentFragment();
      cardImageTemplate.src = template.offer.photos[i];
      imgFragment.append(cardImageTemplate);
      cardPhotos.append(imgFragment);
    }
  }

  cardAvatar.src = template.author.avatar;
  cardElement.classList.add("hidden");
  return cardElement;
};


const renderPin = (pins) => {
  let adsFragment = document.createDocumentFragment();
  let cardFragment = document.createDocumentFragment();
  for (let j = 0; j < pins.length; j++) {
    adsFragment.appendChild(renderSimilarAds(pins[j]));
    cardFragment.appendChild(renderCards(pins[j]));
    similarAdsList.appendChild(adsFragment);
    similarCardList.insertBefore(cardFragment, filtersContainer);
  }
  addLisnenerCards();
};


// События для карточек объявлений

let change;

const escKeydownHandler = (evt) => {
  if (evt.keyCode === 27) {
    closePopup();
  }
};

const openPopup = () => {
  change.classList.remove("hidden");
  document.addEventListener("keydown", escKeydownHandler);
};

const closePopup = () => {
  change.classList.add("hidden");
  document.removeEventListener("keydown", escKeydownHandler);
};

const hiddenAllPopups = (popups) => {
  for (let popup of popups) {
    popup.classList.add("hidden");
  }
};

const addLisnenerCards = () => {
  const allPopups = document.querySelectorAll(".popup");
  const allPins = document.querySelectorAll(".map__pin:not(.map__pin--main)");
  const closePopups = document.querySelectorAll(".popup__close");
  allPopups.forEach(function (value, index) {
    allPins[index].addEventListener("click", function () {
      change = value;
      hiddenAllPopups(allPopups);
      openPopup();
    });

    allPins[index].addEventListener("keydown", function (evt) {
      if (evt.keyCode === 13) {
        change = value;
        hiddenAllPopups(allPopups);
        openPopup();
      }
    });

    closePopups[index].addEventListener("click", function () {
      closePopup();
    });

    closePopups[index].addEventListener("keydown", function (evt) {
      if (evt.keyCode === 13) {
        closePopup();
      }
    });
  });
};


// Неактивное состояние страницы

const map = document.querySelector(".map");
const form = document.querySelector(".ad-form");
const fieldsets = form.querySelectorAll("fieldset");
const mapPin = document.querySelector(".map__pin--main");
let check = true;

const PIN_ANGLE_HEIGHT = 22;
const addressInput = form.querySelector("input[name='address']");
const getAddress = (input, element, angleHeight) => {
  if (check) {
    input.value = Math.floor((parseInt(element.style.left, 10) + element.offsetWidth / 2)) + ", " + Math.floor((parseInt(element.style.top, 10) + element.offsetHeight / 2));
  } else {
    input.value = Math.floor((parseInt(element.style.left, 10) + element.offsetWidth / 2)) + ", " + Math.floor((parseInt(element.style.top, 10) + element.offsetHeight + angleHeight));
  }
};

const disabledInput = () => {
  if (check) {
    for (let fieldset of fieldsets) {
      fieldset.setAttribute("disabled", "true");
    }
  } else {
    for (let fieldset of fieldsets) {
      fieldset.removeAttribute("disabled", "true");
    }
  }
};

const activateMap = () => {
  map.classList.remove("map--faded");
  form.classList.remove("ad-form--disabled");
  disabledInput();
  getAddress(addressInput, mapPin, PIN_ANGLE_HEIGHT);
  renderPin(renderData(flats));
};

const enterKeydownHandler = (evt) => {
  if (evt.keyCode === 13) {
    activateMap();
    if (!map.classList.contains("map--faded")) {
      deliteListener();
    }
  }
};

const leftClickHandler = (evt) => {
  if (evt.which === 1) {
    activateMap();
    if (!map.classList.contains("map--faded")) {
      deliteListener();
    }
  }
};

const deliteListener = () => {
  mapPin.removeEventListener("keydown", enterKeydownHandler);
  mapPin.removeEventListener("mousedown", leftClickHandler);
};

const addActiveMap = () => {
  disabledInput();
  getAddress(addressInput, mapPin, PIN_ANGLE_HEIGHT);
  if (map.classList.contains("map--faded")) {
    check = false;
    mapPin.addEventListener("keydown", enterKeydownHandler);
    mapPin.addEventListener("mousedown", leftClickHandler);
  }
};

addActiveMap();


// Валидация формы
const timeinSelect = form.querySelector("#timein");
const timeoutSelect = form.querySelector("#timeout");

timeinSelect.addEventListener("change", function () {
  if (timeinSelect.value !== timeoutSelect.value) {
    timeoutSelect.value = timeinSelect.value;
  }
});

timeoutSelect.addEventListener("change", function () {
  if (timeoutSelect.value !== timeinSelect.value) {
    timeinSelect.value = timeoutSelect.value;
  }
});

const roomsNumber = form.querySelector("#room_number");
const guestsNumber = form.querySelector("#capacity");

roomsNumber.addEventListener("change", function () {
  if (Number(roomsNumber.value) < Number(guestsNumber.value)) {
    roomsNumber.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат");
  } else if (Number(roomsNumber.value) === 100 && Number(guestsNumber.value) !== 0) {
    roomsNumber.setCustomValidity("Это помещение не для гостей!");
  } else if (Number(guestsNumber.value) === 0 && Number(roomsNumber.value) !== 100) {
    roomsNumber.setCustomValidity("Выберете помещение с 100 комнатами");
  } else {
    roomsNumber.setCustomValidity("");
  }
  roomsNumber.reportValidity();
});

guestsNumber.addEventListener("change", function () {
  if (Number(guestsNumber.value) > Number(roomsNumber.value)) {
    guestsNumber.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат");
  } else if (Number(guestsNumber.value) === 0 && Number(roomsNumber.value) !== 100) {
    guestsNumber.setCustomValidity("Выберете помещение с 100 комнатами");
  } else if (Number(roomsNumber.value) === 100 && Number(guestsNumber.value) !== 0) {
    guestsNumber.setCustomValidity("Выберете пункт «не для гостей»");
  } else {
    guestsNumber.setCustomValidity("");
  }
  guestsNumber.reportValidity();
});

const typeSelect = form.querySelector("#type");
const costInput = form.querySelector("#price");

costInput.min = "1000";

typeSelect.addEventListener("change", function () {
  if (typeSelect.value === "bungalow") {
    costInput.min = "0";
  } else if (typeSelect.value === "flat") {
    costInput.min = "1000";
  } else if (typeSelect.value === "house") {
    costInput.min = "5000";
  } else if (typeSelect.value === "palace") {
    costInput.min = "10000";
  }
});

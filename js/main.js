"use strict";

const TYPE_FLAT = ["palace", "flat", "house", "bungalow"];
const TIME_IN = ["12:00", "13:00", "14:00"];
const TIME_OUT = ["12:00", "13:00", "14:00"];
const ROOM_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const ROOM_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const similarAds = 8;
const similarAdsList = document.querySelector(".map__pins");
const sreenWidth = similarAdsList.clientWidth;
const adsTemplate = document.querySelector("#pin").content.querySelector(".map__pin");
let flats = [];


const map = document.querySelector(".map");
map.classList.remove("map--faded");

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
        price: getRandomNumber(0, 1000000),
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

const renderPin = (pins) => {
  let adsFragment = document.createDocumentFragment();
  for (let j = 0; j < pins.length; j++) {
    adsFragment.appendChild(renderSimilarAds(pins[j]));
    similarAdsList.appendChild(adsFragment);
  }
};

renderPin(renderData(flats));

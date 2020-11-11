"use strict";

(function () {
  const similarCardList = document.querySelector(".map");
  const filtersContainer = document.querySelector(".map__filters-container");
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  window.map = {
    isEscKeyCode: (evt, action) => {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        action();
      }
    },
    isEnterKeyCode: (evt, action) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        evt.preventDefault();
        action();
      }
    }
  };

  window.renderPin = (pins) => {
    let adsFragment = document.createDocumentFragment();
    let cardFragment = document.createDocumentFragment();
    for (let j = 0; j < pins.length; j++) {
      adsFragment.appendChild(window.renderSimilarAds(pins[j]));
      cardFragment.appendChild(window.renderCards(pins[j]));
      window.data.similarAds.appendChild(adsFragment);
      similarCardList.insertBefore(cardFragment, filtersContainer);
    }
    addLisnenerCards();
  };

  let change;

  const escKeydownHandler = (evt) => {
    window.map.isEscKeyCode(evt, closePopup);
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
        window.map.isEnterKeyCode(evt, closePopup);
      });
    });
  };


  window.getAddress = (input, element, angleHeight, isTrue) => {
    if (isTrue) {
      input.value = Math.floor((parseInt(element.style.left, 10) + element.offsetWidth / 2)) + ", " + Math.floor((parseInt(element.style.top, 10) + element.offsetHeight / 2));
    } else {
      input.value = Math.floor((parseInt(element.style.left, 10) + element.offsetWidth / 2)) + ", " + Math.floor((parseInt(element.style.top, 10) + element.offsetHeight + angleHeight));
    }
  };


  const mapPin = document.querySelector(".map__pin--main");

  const PIN_ANGLE_HEIGHT = 22;
  const MIN_COORD_Y = 130;
  const MAX_COORD_Y = 630;

  window.map = {
    pin: mapPin,
    angle: PIN_ANGLE_HEIGHT
  };

  window.map.pin.addEventListener("mousedown", function (evt) {
    evt.preventDefault();
    let isDisabledMap = false;

    let starCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const mouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();

      if (moveEvt.pageY < MAX_COORD_Y && moveEvt.pageY > MIN_COORD_Y && moveEvt.pageX < (window.main.generalMap.clientWidth - window.map.pin.offsetWidth) && moveEvt.pageX > window.map.pin.offsetWidth) {
        let moving = {
          x: starCoords.x - moveEvt.clientX,
          y: starCoords.y - moveEvt.clientY
        };

        starCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.pin.style.left = (window.map.pin.offsetLeft - moving.x) + "px";
        window.map.pin.style.top = (window.map.pin.offsetTop - moving.y) + "px";

        window.getAddress(window.main.address, window.map.pin, window.map.angle, isDisabledMap);

      }
    };

    const mouseUpHandler = (upEvt) => {
      upEvt.preventDefault();
      window.getAddress(window.main.address, window.map.pin, window.map.angle, isDisabledMap);
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  });

})();

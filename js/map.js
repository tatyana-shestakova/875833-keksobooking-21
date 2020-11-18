"use strict";

const COUNT_PINS = 5;
const similarCardList = document.querySelector(".map");
const filtersContainer = document.querySelector(".map__filters-container");
const sortedPins = [];

let changeCard;
let changePin;

window.map = {
  count: COUNT_PINS,
  sortedList: sortedPins,
  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13,
  isEscKeyCode: (evt, action) => {
    if (evt.keyCode === window.map.ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  },
  isEnterKeyCode: (evt, action) => {
    if (evt.keyCode === window.map.ENTER_KEYCODE) {
      evt.preventDefault();
      action();
    }
  },
  renderPin: () => {
    window.data.load(loadHandler, ErrorHandler);
  },
  addListenerCards: () => {
    const allPins = (window.map.getElements(".map__pin:not(.map__pin--main)"));
    const allPopups = document.querySelectorAll(".popup");
    const closePopups = document.querySelectorAll(".popup__close");
    allPopups.forEach((value, index) => {
      allPins[index].addEventListener("click", () => {
        hiddenPopup(allPopups, allPins);
        changeCard = value;
        changePin = allPins[index];
        openPopup();
      });

      allPins[index].addEventListener("keydown", (evt) => {
        if (evt.keyCode === window.map.ENTER_KEYCODE) {
          hiddenPopup(allPopups, allPins);
          changeCard = value;
          changePin = allPins[index];
          openPopup();
        }
      });

      closePopups[index].addEventListener("click", () => {
        closePopup();
      });

      closePopups[index].addEventListener("keydown", (evt) => {
        window.map.isEnterKeyCode(evt, closePopup);
      });
    });
  },
  getElements: (selector) => {
    const elements = document.querySelectorAll(selector);
    return elements;
  },
  clearElement: (element) => {
    element.forEach((value) => {
      value.remove();
    });
  },
  renderNewPin: (pins) => {
    window.map.clearElement(window.map.getElements(".map__pin:not(.map__pin--main)"));
    window.map.clearElement(window.map.getElements(".popup"));
    const adsFragment = document.createDocumentFragment();
    const cardFragment = document.createDocumentFragment();
    const takeNumber = window.map.count > pins.length ? pins.length : window.map.count;

    for (let j = 0; j < takeNumber; j++) {
      adsFragment.appendChild(window.card.renderSimilarAds(pins[j]));
      cardFragment.appendChild(window.card.renderAds(pins[j]));
      window.data.similarAds.appendChild(adsFragment);
      similarCardList.insertBefore(cardFragment, filtersContainer);
    }
    window.map.addListenerCards();
  }
};

const loadHandler = (data) => {
  window.map.sortedList = data;
  window.map.renderNewPin(window.map.sortedList);
};

const ErrorHandler = (errorMessage) => {
  const node = document.createElement("div");
  node.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: white; border: 1px red solid; width: 100%; height: 40px;";
  node.style.position = "absolute";
  node.style.left = 0;
  node.style.fontSize = "18px";

  node.textContent = errorMessage;
  document.body.insertAdjacentElement("afterbegin", node);
};

const escKeydownHandler = (evt) => {
  window.map.isEscKeyCode(evt, closePopup);
};

const openPopup = () => {
  changeCard.classList.remove("hidden");
  changePin.classList.add("map__pin--active");
  document.addEventListener("keydown", escKeydownHandler);
};

const closePopup = () => {
  changeCard.classList.add("hidden");
  changePin.classList.remove("map__pin--active");
  document.removeEventListener("keydown", escKeydownHandler);
};

const hiddenPopup = (popups, pins) => {
  popups.forEach((opened, count) => {
    if (!opened.classList.contains("hidden")) {
      opened.classList.add("hidden");
      pins[count].classList.remove("map__pin--active");
    }
  });
};


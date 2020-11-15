"use strict";

(function () {
  const COUNT_PINS = 5;
  const similarCardList = document.querySelector(".map");
  const filtersContainer = document.querySelector(".map__filters-container");
  let sortedPins = [];

  let change;

  window.map = {
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
    },
    getElements: (selector) => {
      let elements = document.querySelectorAll(selector);
      return elements;
    },
    clearElement: (element) => {
      element.forEach(function (value) {
        value.remove();
      });
    },
    renderNewPin: (pins) => {
      window.map.clearElement(window.map.getElements(".map__pin:not(.map__pin--main)"));
      window.map.clearElement(window.map.getElements(".popup"));
      let adsFragment = document.createDocumentFragment();
      let cardFragment = document.createDocumentFragment();
      const takeNumber = pins.length > COUNT_PINS ? COUNT_PINS : pins.length;

      for (let j = 0; j < takeNumber; j++) {
        adsFragment.appendChild(window.card.renderSimilarAds(pins[j]));
        cardFragment.appendChild(window.card.renderCards(pins[j]));
        window.data.similarAds.appendChild(adsFragment);
        similarCardList.insertBefore(cardFragment, filtersContainer);
      }
      window.map.addListenerCards();
    }
  };

  const loadHandler = (data) => {
    window.map.sortedList = data;
    window.sort.changePins();
  };

  const ErrorHandler = (errorMessage) => {
    let node = document.createElement("div");
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

})();

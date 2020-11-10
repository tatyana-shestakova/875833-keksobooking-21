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

})();

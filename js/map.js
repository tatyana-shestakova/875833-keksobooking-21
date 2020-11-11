"use strict";

(function () {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;
  const similarCardList = document.querySelector(".map");
  const filtersContainer = document.querySelector(".map__filters-container");

  const renderPinHandler = (pins) => {
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

  const ErrorHandler = (errorMessage) => {
    let node = document.createElement("div");
    node.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: white; border: 1px red solid; width: 100%; height: 40px;";
    node.style.position = "absolute";
    node.style.left = 0;
    node.style.fontSize = "18px";

    node.textContent = errorMessage;
    document.body.insertAdjacentElement("afterbegin", node);
  };

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
    },
    renderPin: () => {
      window.data.load(renderPinHandler, ErrorHandler);
    }
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

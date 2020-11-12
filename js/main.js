"use strict";

(function () {
  const form = document.querySelector(".ad-form");
  const map = document.querySelector(".map");
  let isDisabledMap = true;
  const addressInput = document.querySelector("input[name='address']");
  let isRepeatedClick = false;

  window.main = {
    siteForm: form,
    address: addressInput,
    generalMap: map,
    check: isDisabledMap,
    repeat: isRepeatedClick
  };

  const fieldsets = window.main.siteForm.querySelectorAll("fieldset");

  window.disabledInput = () => {
    const similarPins = document.querySelectorAll(".map__pin:not(.map__pin--main)");
    if (window.main.check) {
      map.classList.add("map--faded");
      form.classList.add("ad-form--disabled");
      for (let pin of similarPins) {
        pin.classList.add("hidden");
      }
      for (let fieldset of fieldsets) {
        fieldset.setAttribute("disabled", "true");
      }
    } else {
      map.classList.remove("map--faded");
      form.classList.remove("ad-form--disabled");
      for (let fieldset of fieldsets) {
        fieldset.removeAttribute("disabled", "true");
      }
      for (let pin of similarPins) {
        pin.classList.remove("hidden");
      }
    }
  };

  const enterKeydownHandler = (evt) => {
    if (evt.keyCode === 13 && !window.main.repeat) {
      activateMap();
      if (!map.classList.contains("map--faded")) {
        deliteListener();
      }
    } else if (evt.keyCode === 13 && window.main.repeat) {
        window.disabledInput();
    }
  };

  const leftClickHandler = (evt) => {
    if (evt.which === 1 && !window.main.repeat) {
      activateMap();
      if (!map.classList.contains("map--faded")) {
        deliteListener();
      }
    } else if(evt.which === 1 && window.main.repeat) {
      window.disabledInput();
    }
  };

  const deliteListener = () => {
    window.move.pin.removeEventListener("keydown", enterKeydownHandler);
    window.move.pin.removeEventListener("mousedown", leftClickHandler);
  };

  const activateMap = () => {
    disabledInput();
    window.move.getAddress(addressInput, window.move.pin, window.move.angle, window.main.check);
    window.map.renderPin();
    window.main.repeat = true;
  };

  window.addActiveMap = () => {
    disabledInput();
    window.move.getAddress(addressInput, window.move.pin, window.move.angle, window.main.check);
    if (map.classList.contains("map--faded")) {
      window.main.check = false;
      window.move.pin.addEventListener("keydown", enterKeydownHandler);
      window.move.pin.addEventListener("mousedown", leftClickHandler);
    }
  };

  addActiveMap();

})();

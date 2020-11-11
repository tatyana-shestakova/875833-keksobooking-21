"use strict";

(function () {
  const form = document.querySelector(".ad-form");
  const map = document.querySelector(".map");
  let isDisabledMap = true;
  const addressInput = document.querySelector("input[name='address']");

  window.main = {
    siteForm: form,
    address: addressInput,
    generalMap: map,
    check: isDisabledMap
  };

  const fieldsets = window.main.siteForm.querySelectorAll("fieldset");

  const disabledInput = () => {
    if (window.main.check) {
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
    window.move.getAddress(addressInput, window.move.pin, window.move.angle, window.main.check);
    window.map.renderPin();
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
    window.move.pin.removeEventListener("keydown", enterKeydownHandler);
    window.move.pin.removeEventListener("mousedown", leftClickHandler);
  };

  const addActiveMap = () => {
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

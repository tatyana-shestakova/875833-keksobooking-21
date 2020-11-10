"use strict";

(function () {

  const form = document.querySelector(".ad-form");

  let flats = [];
  const map = document.querySelector(".map");
  let check = true;
  const addressInput = document.querySelector("input[name='address']");

  window.main = {
    siteForm: form,
    address: addressInput,
    generalMap: map
  };

  const fieldsets = window.main.siteForm.querySelectorAll("fieldset");

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
    window.getAddress(addressInput, window.map.pin, window.map.angle, check);
    window.renderPin(window.renderData(flats));
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
    window.map.pin.removeEventListener("keydown", enterKeydownHandler);
    window.map.pin.removeEventListener("mousedown", leftClickHandler);
  };

  const addActiveMap = () => {
    disabledInput();
    window.getAddress(addressInput, window.map.pin, window.map.angle, check);
    if (map.classList.contains("map--faded")) {
      check = false;
      window.map.pin.addEventListener("keydown", enterKeydownHandler);
      window.map.pin.addEventListener("mousedown", leftClickHandler);
    }
  };

  addActiveMap();

})();

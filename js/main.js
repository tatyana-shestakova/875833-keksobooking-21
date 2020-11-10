"use strict";

(function () {

  const form = document.querySelector(".ad-form");

  window.main = {
    siteForm: form
  };

  let flats = [];

  const map = document.querySelector(".map");
  const fieldsets = window.main.siteForm.querySelectorAll("fieldset");
  const mapPin = document.querySelector(".map__pin--main");
  let check = true;

  const PIN_ANGLE_HEIGHT = 22;
  const addressInput = window.main.siteForm.querySelector("input[name='address']");
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

})();

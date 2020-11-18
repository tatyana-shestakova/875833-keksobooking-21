"use strict";

const MAP_PIN_X = "570px";
const MAP_PIN_Y = "375px";
const LEFT_CLICK_MOUSE = 1;
const form = document.querySelector(".ad-form");
const mapFilters = document.querySelectorAll(".map__filter");
const mapFeatureFieldset = document.querySelector(".map__features");
const isDisabledMap = true;
const addressInput = document.querySelector("input[name=address]");

window.main = {
  siteForm: form,
  address: addressInput,
  check: isDisabledMap,
  disabledMap: () => {
    window.move.pin.style.left = MAP_PIN_X;
    window.move.pin.style.top = MAP_PIN_Y;
    if (window.main.check) {
      window.map.clearElement(window.map.getElements(".map__pin:not(.map__pin--main)"));
      window.map.clearElement(window.map.getElements(".map__card"));
      window.move.generalMap.classList.add("map--faded");
      form.classList.add("ad-form--disabled");
      activateInput(window.main.check);
    } else {
      window.move.generalMap.classList.remove("map--faded");
      form.classList.remove("ad-form--disabled");
      activateInput(window.main.check);
    }
  },
  addActiveMap: () => {
    window.main.disabledMap();
    window.move.getAddress(window.main.address, window.move.pin, window.move.angle, window.main.check);
    if (window.move.generalMap.classList.contains("map--faded")) {
      window.move.pin.addEventListener("keydown", enterKeydownHandler);
      window.move.pin.addEventListener("mousedown", leftClickHandler);
    }
  }
};

const fieldsets = window.main.siteForm.querySelectorAll("fieldset");

const activateInput = (value) => {
  fieldsets.forEach((input) => {
    input.disabled = value;
  });
  mapFilters.forEach((input) => {
    input.disabled = value;
  });
  mapFeatureFieldset.disabled = value;
};

const enterKeydownHandler = (evt) => {
  if (evt.keyCode === window.map.ENTER_KEYCODE) {
    activateMap();
    if (!window.move.generalMap.classList.contains("map--faded")) {
      deleteListener();
    }
  }
};

const leftClickHandler = (evt) => {
  if (evt.which === LEFT_CLICK_MOUSE) {
    activateMap();
    if (!window.move.generalMap.classList.contains("map--faded")) {
      deleteListener();
    }
  }
};

const deleteListener = () => {
  window.move.pin.removeEventListener("keydown", enterKeydownHandler);
  window.move.pin.removeEventListener("mousedown", leftClickHandler);
};

const activateMap = () => {
  window.main.check = false;
  window.main.disabledMap();
  window.move.getAddress(window.main.address, window.move.pin, window.move.angle, window.main.check);
  window.map.renderPin();
};

window.main.addActiveMap();


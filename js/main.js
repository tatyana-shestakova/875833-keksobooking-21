"use strict";

(function () {

  const MAP_PIN_X = "570px";
  const MAP_PIN_Y = "375px";
  const LEFT_CLICK_MOUSE = 1;
  const form = document.querySelector(".ad-form");
  const map = document.querySelector(".map");
  let isDisabledMap = true;
  const addressInput = document.querySelector("input[name='address']");

  window.main = {
    siteForm: form,
    address: addressInput,
    generalMap: map,
    check: isDisabledMap,
    disabledInput: () => {
      window.move.pin.style.left = MAP_PIN_X;
      window.move.pin.style.top = MAP_PIN_Y;
      if (window.main.check) {
        window.map.clearElement(window.map.getElements(".map__pin:not(.map__pin--main)"));
        map.classList.add("map--faded");
        form.classList.add("ad-form--disabled");
        for (let fieldset of fieldsets) {
          fieldset.setAttribute("disabled", "true");
        }
      } else {
        map.classList.remove("map--faded");
        form.classList.remove("ad-form--disabled");
        for (let fieldset of fieldsets) {
          fieldset.removeAttribute("disabled", "true");
        }
      }
    },
    addActiveMap: () => {
      window.main.disabledInput();
      window.move.getAddress(addressInput, window.move.pin, window.move.angle, window.main.check);
      if (map.classList.contains("map--faded")) {
        window.main.check = false;
        window.move.pin.addEventListener("keydown", enterKeydownHandler);
        window.move.pin.addEventListener("mousedown", leftClickHandler);
      }
    }
  };

  const fieldsets = window.main.siteForm.querySelectorAll("fieldset");

  const enterKeydownHandler = (evt) => {
    if (evt.keyCode === window.map.ENTER_KEYCODE) {
      activateMap();
      if (!map.classList.contains("map--faded")) {
        deliteListener();
      }
    }
  };

  const leftClickHandler = (evt) => {
    if (evt.which === LEFT_CLICK_MOUSE) {
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

  const activateMap = () => {
    window.main.disabledInput();
    window.move.getAddress(addressInput, window.move.pin, window.move.angle, window.main.check);
    window.map.renderPin();
  };

  window.main.addActiveMap();

})();

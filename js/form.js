"use strict";

(function () {
  const timeinSelect = window.main.siteForm.querySelector("#timein");
  const timeoutSelect = window.main.siteForm.querySelector("#timeout");
  const successTemplate = document.querySelector("#success").content.querySelector(".success");
  const errorTemplate = document.querySelector("#error").content.querySelector(".error");
  const main = document.querySelector("main");
  let checkFragment;

  timeinSelect.addEventListener("change", function () {
    if (timeinSelect.value !== timeoutSelect.value) {
      timeoutSelect.value = timeinSelect.value;
    }
  });

  timeoutSelect.addEventListener("change", function () {
    if (timeoutSelect.value !== timeinSelect.value) {
      timeinSelect.value = timeoutSelect.value;
    }
  });

  const roomsNumber = window.main.siteForm.querySelector("#room_number");
  const guestsNumber = window.main.siteForm.querySelector("#capacity");

  guestsNumber.addEventListener("change", function () {
    if (guestsNumber.value > roomsNumber.value) {
      guestsNumber.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат");
    } else if (Number(guestsNumber.value) === 0 && Number(roomsNumber.value) !== 100) {
      guestsNumber.setCustomValidity("Выберете помещение с 100 комнатами");
    } else if (Number(guestsNumber.value) === Number(roomsNumber.value)) {
      guestsNumber.setCustomValidity("");
    } else {
      guestsNumber.setCustomValidity("");
    }
    guestsNumber.reportValidity();
  });

  roomsNumber.addEventListener("change", function () {
    if (roomsNumber.value < guestsNumber.value) {
      roomsNumber.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат");
    } else if (Number(roomsNumber.value) === 100 && Number(guestsNumber.value) !== 0) {
      roomsNumber.setCustomValidity("Это помещение не для гостей!");
    } else if (Number(guestsNumber.value) === 0 && Number(roomsNumber.value) !== 100) {
      roomsNumber.setCustomValidity("Выберете помещение с 100 комнатами");
    } else if (Number(guestsNumber.value) === Number(roomsNumber.value)) {
      roomsNumber.setCustomValidity("");
    } else {
      roomsNumber.setCustomValidity("");
    }
    roomsNumber.reportValidity();
  });


  const typeSelect = window.main.siteForm.querySelector("#type");
  const costInput = window.main.siteForm.querySelector("#price");

  costInput.min = "1000";

  typeSelect.addEventListener("change", function () {
    if (typeSelect.value === "bungalow") {
      costInput.min = "0";
    } else if (typeSelect.value === "flat") {
      costInput.min = "1000";
    } else if (typeSelect.value === "house") {
      costInput.min = "5000";
    } else if (typeSelect.value === "palace") {
      costInput.min = "10000";
    }
  });

  const templateClickHandler = (evt) => {
    window.map.isEscKeyCode(evt, deleteHadler);
  };


  const deleteHadler = () => {
    checkFragment.remove();
    document.removeEventListener("keydown", templateClickHandler);
  };


  const renderMessage = (clone) => {
    checkFragment = clone.cloneNode(true);
    let templateFragment = document.createDocumentFragment();
    templateFragment.appendChild(checkFragment);
    main.appendChild(templateFragment);

    document.addEventListener("click", function () {
      deleteHadler();
    });

    document.addEventListener("keydown", templateClickHandler);

    const resetButton = checkFragment.querySelector(".error__button");

    if (resetButton) {
      resetButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        window.main.siteForm.reset();
        deleteHadler();
      });
    }
  };

  const successHandler = () => {
    window.main.check = true;
    window.main.addActiveMap();
    renderMessage(successTemplate);
    window.main.siteForm.reset();
  };

  const errorHandler = () => {
    renderMessage(errorTemplate);
  };

  window.main.siteForm.addEventListener("submit", function (evt) {
    window.data.save(new FormData(window.main.siteForm), successHandler, errorHandler);
    evt.preventDefault();
  });

})();

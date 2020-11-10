"use strict";

(function () {
  const timeinSelect = window.main.siteForm.querySelector("#timein");
  const timeoutSelect = window.main.siteForm.querySelector("#timeout");

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

  roomsNumber.addEventListener("change", function () {
    if (Number(roomsNumber.value) < Number(guestsNumber.value)) {
      roomsNumber.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат");
    } else if (Number(roomsNumber.value) === 100 && Number(guestsNumber.value) !== 0) {
      roomsNumber.setCustomValidity("Это помещение не для гостей!");
    } else if (Number(guestsNumber.value) === 0 && Number(roomsNumber.value) !== 100) {
      roomsNumber.setCustomValidity("Выберете помещение с 100 комнатами");
    } else {
      roomsNumber.setCustomValidity("");
    }
    roomsNumber.reportValidity();
  });

  guestsNumber.addEventListener("change", function () {
    if (Number(guestsNumber.value) > Number(roomsNumber.value)) {
      guestsNumber.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат");
    } else if (Number(guestsNumber.value) === 0 && Number(roomsNumber.value) !== 100) {
      guestsNumber.setCustomValidity("Выберете помещение с 100 комнатами");
    } else if (Number(roomsNumber.value) === 100 && Number(guestsNumber.value) !== 0) {
      guestsNumber.setCustomValidity("Выберете пункт «не для гостей»");
    } else if (Number(roomsNumber.value) === 100 && Number(guestsNumber.value) === 0) {
      guestsNumber.setCustomValidity("");
    }
    guestsNumber.reportValidity();
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

})();

"use strict";

const timeinSelect = window.main.siteForm.querySelector("#timein");
const timeoutSelect = window.main.siteForm.querySelector("#timeout");
const successTemplate = document.querySelector("#success").content.querySelector(".success");
const errorTemplate = document.querySelector("#error").content.querySelector(".error");
const main = document.querySelector("main");
const roomsNumber = window.main.siteForm.querySelector("#room_number");
const guestsNumber = window.main.siteForm.querySelector("#capacity");
const typeSelect = window.main.siteForm.querySelector("#type");
const costInput = window.main.siteForm.querySelector("#price");
const MIN_PRICE = {
  LOW: "0",
  MIDDLE: "1000",
  HIGH: "5000",
  EXPENSIVE: "10000"
};

const NOT_GUESTS = {
  ROOMS: 100,
  COUNT: 0
};

let checkFragment;

const checkRooms = () => {
  roomsNumber.setCustomValidity("");
  if (roomsNumber.value < guestsNumber.value) {
    roomsNumber.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат");
  } else if (Number(roomsNumber.value) === NOT_GUESTS.ROOMS && Number(guestsNumber.value) !== NOT_GUESTS.COUNT) {
    roomsNumber.setCustomValidity("Это помещение не для гостей!");
  } else if (Number(guestsNumber.value) === Number(roomsNumber.value)) {
    roomsNumber.setCustomValidity("");
  }
  roomsNumber.reportValidity();
};

const checkGuests = () => {
  guestsNumber.setCustomValidity("");
  if (guestsNumber.value > roomsNumber.value) {
    guestsNumber.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат");
  } else if (Number(guestsNumber.value) === NOT_GUESTS.COUNT && Number(roomsNumber.value) !== NOT_GUESTS.ROOMS) {
    guestsNumber.setCustomValidity("Выберете помещение с 100 комнатами");
  } else if (Number(guestsNumber.value) === Number(roomsNumber.value)) {
    guestsNumber.setCustomValidity("");
  }
  guestsNumber.reportValidity();
};

timeinSelect.addEventListener("change", () => {
  if (timeoutSelect.value !== timeinSelect.value) {
    timeoutSelect.value = timeinSelect.value;
  }
});

timeoutSelect.addEventListener("change", () => {
  if (timeinSelect.value !== timeoutSelect.value) {
    timeinSelect.value = timeoutSelect.value;
  }
});


const checkMinPrice = () => {
  if (typeSelect.value === "bungalow") {
    costInput.min = MIN_PRICE.LOW;
  } else if (typeSelect.value === "flat") {
    costInput.min = MIN_PRICE.MIDDLE;
  } else if (typeSelect.value === "house") {
    costInput.min = MIN_PRICE.HIGH;
  } else if (typeSelect.value === "palace") {
    costInput.min = MIN_PRICE.EXPENSIVE;
  }
  costInput.placeholder = costInput.min;
};

window.main.siteForm.addEventListener("change", () => {
  checkRooms();
  checkGuests();
  checkMinPrice();
});

const templateClickHandler = (evt) => {
  window.map.isEscKeyCode(evt, deleteHandler);
};


const deleteHandler = () => {
  checkFragment.remove();
  document.removeEventListener("keydown", templateClickHandler);
};


const renderMessage = (clone) => {
  checkFragment = clone.cloneNode(true);
  let templateFragment = document.createDocumentFragment();
  templateFragment.appendChild(checkFragment);
  main.appendChild(templateFragment);

  document.addEventListener("click", () => {
    deleteHandler();
  });

  document.addEventListener("keydown", templateClickHandler);

  const resetButton = checkFragment.querySelector(".error__button");

  if (resetButton) {
    resetButton.addEventListener("click", (evt) => {
      window.main.siteForm.reset();
      window.sort.sortFilters.reset();
      evt.preventDefault();
      deleteHandler();
    });
  }
};

const successHandler = () => {
  window.main.siteForm.reset();
  window.sort.sortFilters.reset();
  renderMessage(successTemplate);
  window.main.check = true;
  window.main.addActiveMap();
};

const errorHandler = () => {
  renderMessage(errorTemplate);
};

window.main.siteForm.addEventListener("submit", (evt) => {
  window.data.save(new FormData(window.main.siteForm), successHandler, errorHandler);
  evt.preventDefault();
});


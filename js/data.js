"use strict";

const URL_DATA = "https://21.javascript.pages.academy/keksobooking/data";
const URL_POST = "https://21.javascript.pages.academy/keksobooking";

const RESPONSE_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

const TIMEOUT_IN_MS = 10000;

const ERRORS_MESSAGE = {
  [RESPONSE_STATUS.BAD_REQUEST]: "Что-то пошло не так... Неверный запрос",
  [RESPONSE_STATUS.UNAUTHORIZED]: "Что-то пошло не так... Пользователь не авторизован",
  [RESPONSE_STATUS.NOT_FOUND]: "Что-то пошло не так... Ничего не найдено"
};

const similarAdsList = document.querySelector(".map__pins");

const loadRequest = (element, success, error) => {
  element.addEventListener('load', () => {

    if (element.status === RESPONSE_STATUS.OK) {
      success(element.response);
    } else {
      error(ERRORS_MESSAGE[element.status]);
    }
  });

  element.timeout = TIMEOUT_IN_MS;

  element.addEventListener("error", () => {
    error("Произошла ошибка соединения");
  });
  element.addEventListener("timeout", () => {
    error(`Запрос не успел выполниться за ${element.timeout}мc`);
  });
};

window.data = {
  load: (onLoad, onError) => {
    const xhrData = new XMLHttpRequest();
    xhrData.responseType = "json";
    loadRequest(xhrData, onLoad, onError);
    xhrData.open("GET", URL_DATA);
    xhrData.send();
  },

  save: (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    loadRequest(xhr, onSuccess, onError);
    xhr.open("POST", URL_POST);
    xhr.send(data);
  },

  similarAds: similarAdsList
};


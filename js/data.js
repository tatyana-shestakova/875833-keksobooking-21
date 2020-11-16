"use strict";

(function () {

  const URL_DATA = "https://21.javascript.pages.academy/keksobooking/data";
  const URL = "https://21.javascript.pages.academy/keksobooking";

  const RESPONSE_STATUS = {
    OK: 200,
    ERROR_400: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  const ERRORS_MESSAGE = {
    [RESPONSE_STATUS.ERROR_400]: "Что-то пошло не так... Неверный запрос",
    [RESPONSE_STATUS.UNAUTHORIZED]: "Что-то пошло не так... Пользователь не авторизован",
    [RESPONSE_STATUS.NOT_FOUND]: "Что-то пошло не так... Ничего не найдено"
  };

  const similarAdsList = document.querySelector(".map__pins");

  const TIMEOUT_IN_MS = 10000;

  window.data = {
    load: (onLoad, onError) => {
      const xhrData = new XMLHttpRequest();
      xhrData.responseType = 'json';

      xhrData.addEventListener('load', () => {

        if (xhrData.status === RESPONSE_STATUS.OK) {
          onLoad(xhrData.response);
        } else {
          onError(ERRORS_MESSAGE[xhrData.status]);
        }
      });
      xhrData.timeout = TIMEOUT_IN_MS;

      xhrData.addEventListener('error', () => {
        onError('Произошла ошибка соединения');
      });
      xhrData.addEventListener('timeout', () => {
        onError('Запрос не успел выполниться за ' + xhrData.timeout + 'мс');
      });

      xhrData.open('GET', URL_DATA);
      xhrData.send();
    },

    save: (data, onSuccess, onError) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', () => {
        if (xhr.status === RESPONSE_STATUS.OK) {
          onSuccess(xhr.response);
        } else {
          onError(ERRORS_MESSAGE[xhr.status]);
        }
      });
      xhr.timeout = 10000;

      xhr.addEventListener('error', () => {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', () => {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },

    similarAds: similarAdsList
  };

})();

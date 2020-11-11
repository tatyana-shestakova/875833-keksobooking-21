"use strict";

(function () {

  const similarAdsList = document.querySelector(".map__pins");

  const URL_DATA = "https://21.javascript.pages.academy/keksobooking/data";

  const TIMEOUT_IN_MS = 10000;

  window.data = {
    load: (onLoad, onError) => {
      const xhrData = new XMLHttpRequest();
      xhrData.responseType = 'json';

      xhrData.addEventListener('load', function () {
        let error;
        switch (xhrData.status) {
          case 200:
            onLoad(xhrData.response);
            break;
          case 400:
            error = 'Что-то пошло не так... Неверный запрос';
            break;
          case 401:
            error = 'Что-то пошло не так... Пользователь не авторизован';
            break;
          case 404:
            error = 'Что-то пошло не так... Ничего не найдено';
            break;
          default:
            error = 'Что-то пошло не так... Cтатус ответа: : ' + xhrData.status + ' ' + xhrData.statusText;
        }
        if (error) {
          onError(error);
        }
      });
      xhrData.timeout = TIMEOUT_IN_MS;

      xhrData.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhrData.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhrData.timeout + 'мс');
      });

      xhrData.open('GET', URL_DATA);
      xhrData.send();
    },

    similarAds: similarAdsList
  };

})();

"use strict";

const MIN_COORD_Y = 130;
const MAX_COORD_Y = 630;
const PIN_ANGLE_HEIGHT = 22;
const mapPin = document.querySelector(".map__pin--main");
const html = document.querySelector("html");

window.move = {
  getAddress: (input, element, angleHeight, isTrue) => {
    if (isTrue) {
      input.value = Math.floor((parseInt(element.style.left, 10) + element.offsetWidth / 2)) + ", " + Math.floor((parseInt(element.style.top, 10) + element.offsetHeight / 2));
    } else {
      input.value = Math.floor((parseInt(element.style.left, 10) + element.offsetWidth / 2)) + ", " + Math.floor((parseInt(element.style.top, 10) + element.offsetHeight + angleHeight));
    }
  },
  pin: mapPin,
  angle: PIN_ANGLE_HEIGHT
};

window.move.pin.addEventListener("mousedown", (evt) => {
  evt.preventDefault();

  let starCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const mouseMoveHandler = (moveEvt) => {
    moveEvt.preventDefault();


    let clientMapWidthMin = (html.clientWidth - window.main.generalMap.clientWidth) / 2 + window.move.pin.clientWidth;
    let clientMapWidthMax = window.main.generalMap.clientWidth + clientMapWidthMin - (window.move.pin.clientWidth * 2);
    if (moveEvt.pageY < MAX_COORD_Y && moveEvt.pageY > MIN_COORD_Y && moveEvt.pageX < clientMapWidthMax && moveEvt.pageX > clientMapWidthMin) {
      let moving = {
        x: starCoords.x - moveEvt.clientX,
        y: starCoords.y - moveEvt.clientY
      };

      starCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.move.pin.style.left = (window.move.pin.offsetLeft - moving.x) + "px";
      window.move.pin.style.top = (window.move.pin.offsetTop - moving.y) + "px";

      window.move.getAddress(window.main.address, window.move.pin, window.move.angle, window.main.check);

    }
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();
    window.move.getAddress(window.main.address, window.move.pin, window.move.angle, window.main.check);
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
});


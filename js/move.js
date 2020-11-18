"use strict";

const MIN_COORD_Y = 130;
const MAX_COORD_Y = 630;
const COORD_TOP_PIN = 80;
const COORD_BOTTOM_PIN = 700;
const PIN_ANGLE_HEIGHT = 22;
const mapPin = document.querySelector(".map__pin--main");
const map = document.querySelector(".map");

const limit = {
  top: MIN_COORD_Y,
  bottom: MAX_COORD_Y - mapPin.offsetHeight,
  left: map.offsetLeft,
  right: map.offsetWidth - (mapPin.offsetWidth / 2)
};

window.move = {
  getAddress: (input, element, angleHeight, isTrue) => {
    if (isTrue) {
      input.value = `${Math.floor((parseInt(element.style.left, 10) + element.offsetWidth / 2))}, ${Math.floor((parseInt(element.style.top, 10) + element.offsetHeight / 2))}`;
    } else {
      input.value = `${Math.floor((parseInt(element.style.left, 10) + element.offsetWidth / 2))}, ${Math.floor((parseInt(element.style.top, 10) + element.offsetHeight + angleHeight))}`;
    }
  },
  pin: mapPin,
  angle: PIN_ANGLE_HEIGHT,
  generalMap: map
};

window.move.pin.addEventListener("mousedown", (evt) => {
  evt.preventDefault();

  let starCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const mouseMoveHandler = (moveEvt) => {
    if (!window.main.check) {
      moveEvt.preventDefault();

      let moving = {
        x: starCoords.x - moveEvt.clientX,
        y: starCoords.y - moveEvt.clientY
      };

      starCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (moveEvt.clientX < (limit.right + limit.left) && moveEvt.clientX > limit.left) {
        window.move.pin.style.left = `${(window.move.pin.offsetLeft - moving.x)}px`;
      }

      if (moveEvt.clientY < COORD_BOTTOM_PIN && moveEvt.clientY > COORD_TOP_PIN) {
        window.move.pin.style.top = `${(window.move.pin.offsetTop - moving.y)}px`;
      }


      if (moveEvt.pageX > (limit.right + limit.left + mapPin.offsetWidth)) {
        window.move.pin.style.left = `${limit.right}px`;
      } else if (moveEvt.pageX < limit.left) {
        window.move.pin.style.left = `${(limit.left - limit.left - (mapPin.offsetWidth / 2))}px`;
      }

      if (moveEvt.pageY > (limit.bottom - PIN_ANGLE_HEIGHT)) {
        window.move.pin.style.top = `${(limit.bottom - PIN_ANGLE_HEIGHT)}px`;
      } else if (moveEvt.pageY < (limit.top - mapPin.offsetHeight - PIN_ANGLE_HEIGHT)) {
        window.move.pin.style.top = `${(limit.top - mapPin.offsetHeight - PIN_ANGLE_HEIGHT)}px`;
      }

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


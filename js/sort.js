"use strict";

(function () {
  const houseType = document.querySelector("#housing-type");

  const getRank = (pin) => {
    let rank = 0;

    if (pin.offer.type === houseType.value) {
      rank += 1;
    }

    return rank;
  };

  window.sort = {
    changePins: () => {
      window.map.renderNewPin(window.map.sortedList.sort(function (left, right) {
        return getRank(right) - getRank(left);
      }));
    }
  };

  houseType.addEventListener("change", function () {
    window.sort.changePins();
  });

})();

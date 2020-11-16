"use strict";

(function () {
  const mapFilters = document.querySelector(".map__filters");
  const houseType = document.querySelector("#housing-type");
  const housePrice = document.querySelector("#housing-price");
  const houseRooms = document.querySelector("#housing-rooms");
  const houseGuests = document.querySelector("#housing-guests");
  const houseFeatures = document.querySelectorAll(".map__checkbox");

  const getRank = (pin) => {
    let rank = 0;

    if (pin.offer.type === houseType.value) {
      rank += 2;
    }

    if (houseType.value === "any") {
      rank += 1;
    }

    if (housePrice.value === "low") {
      if (pin.offer.price < 10000) {
        rank += 2;
      }
    }

    if (housePrice.value === "middle") {
      if (pin.offer.price < 50000 && pin.offer.price >= 10000) {
        rank += 2;
      }
    }

    if (housePrice.value === "high") {
      if (pin.offer.price > 0) {
        rank += 2;
      }
    }

    if (housePrice.value === "any") {
      if (pin.offer.price > 50000) {
        rank += 1;
      }
    }

    if (pin.offer.rooms === Number(houseRooms.value)) {
      rank += 2;
    }

    if (houseRooms.value === "any") {
      if (pin.offer.rooms < 3 || pin.offer.rooms < 1) {
        rank += 1;
      }
    }

    if (pin.offer.guests === Number(houseGuests.value)) {
      rank += 2;
    }

    if (houseGuests.value === "any") {
      if (pin.offer.guests > 3) {
        rank += 1;
      }
    }

    houseFeatures.forEach((input) => {
      if (input.checked) {
        for (let i = 0; i < pin.offer.features.length; i++) {
          if (pin.offer.features.indexOf(input.value) !== -1) {
            rank += 1;
          }
        }
      }
    });

    return rank;
  };

  const numberComparator = (left, right) => {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.sort = {
    changePins: () => {
      window.map.renderNewPin(window.map.sortedList.sort((left, right) => {
        let rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = numberComparator(left, right);
        }
        return rankDiff;
      }));
    },
    sortFilters: mapFilters
  };

  window.sort.sortFilters.addEventListener("change", () => {
    window.debounce.getTimeout(window.sort.changePins);
  });


})();

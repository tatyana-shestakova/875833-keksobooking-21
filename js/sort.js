"use strict";

const PRICES = {
  HOUSE_TYPE: {
    ANY: "any",
    LOW: "low",
    MIDDLE: "middle",
    HIGH: "high"
  },
  HOUSE_CHECK: {
    MIN: 10000,
    MAX: 50000
  }
};

const mapFiltersForm = document.querySelector(".map__filters");
const houseType = document.querySelector("#housing-type");
const housePrice = document.querySelector("#housing-price");
const houseRooms = document.querySelector("#housing-rooms");
const houseGuests = document.querySelector("#housing-guests");
const houseFeatures = document.querySelector(".map__filters");

const getPrice = (element) => {
  if (housePrice.value === PRICES.HOUSE_TYPE.LOW) {
    return element.offer.price < PRICES.HOUSE_CHECK.MIN;
  } else if (housePrice.value === PRICES.HOUSE_TYPE.MIDDLE) {
    return element.offer.price >= PRICES.HOUSE_CHECK.MIN && element.offer.price <= PRICES.HOUSE_CHECK.MAX;
  } else if (housePrice.value === PRICES.HOUSE_TYPE.HIGH) {
    return element.offer.price > PRICES.HOUSE_CHECK.MAX;
  }
  return element.offer.price > 0;
};

const getCheckedFeatures = () => {
  const checkedFeatures = houseFeatures.querySelectorAll("input:checked");
  return Array.from(checkedFeatures).map((input) => {
    return input.value;
  });
};

const changePins = () => {
  const sameHouses = window.map.sortedList.filter((ads) => {
    const isChangedHouse = ads.offer.type === houseType.value || houseType.value === PRICES.HOUSE_TYPE.ANY;
    const isChangedPrice = getPrice(ads);
    const isChangedRoom = ads.offer.rooms === Number(houseRooms.value) || houseRooms.value === PRICES.HOUSE_TYPE.ANY;
    const isChangedGuests = ads.offer.guests === Number(houseGuests.value) || houseGuests.value === PRICES.HOUSE_TYPE.ANY;
    const isChangedFeatures = getCheckedFeatures().every((pin) => {
      return ads.offer.features.includes(pin);
    });
    return isChangedHouse && isChangedPrice && isChangedRoom && isChangedGuests && isChangedFeatures;
  }).slice(0, window.map.count);
  window.map.renderNewPin(sameHouses);
};

mapFiltersForm.addEventListener("change", () => {
  window.debounce.getTimeout(changePins);
});

window.sort = {
  sortFilters: mapFiltersForm
};

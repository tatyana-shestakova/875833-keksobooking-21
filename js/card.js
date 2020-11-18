"use strict";

const TYPE_FLAT_DESCRIPTION = {
  palace: "Дворец",
  flat: "Квартира",
  bungalow: "Бунгало",
  house: "Дом"
};

const adsTemplate = document.querySelector("#pin").content.querySelector(".map__pin");
const cardTemplate = document.querySelector("#card").content.querySelector(".map__card");

window.card = {
  renderSimilarAds: (template) => {
    const adsItem = adsTemplate.cloneNode(true);
    adsItem.style = `left: ${(template.location.x + adsItem.style.width)}px; top: ${(template.location.y + adsItem.style.height)}px`;
    const image = adsItem.querySelector("img");
    image.src = template.author.avatar;
    image.alt = template.offer.title;
    return adsItem;
  },


  renderAds: (template) => {
    const {offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, author: {avatar}} = template;

    const card = cardTemplate.cloneNode(true);
    const cardTitle = card.querySelector(".popup__title");
    const cardAddress = card.querySelector(".popup__text--address");
    const cardPrice = card.querySelector(".popup__text--price");
    const cardType = card.querySelector(".popup__type");
    const cardRoom = card.querySelector(".popup__text--capacity");
    const cardTime = card.querySelector(".popup__text--time");
    const cardFeaturesList = card.querySelector(".popup__features");
    const cardFeaturesItems = cardFeaturesList.querySelectorAll(".popup__feature");
    const cardDescription = card.querySelector(".popup__description");
    const cardPhotos = card.querySelector(".popup__photos");
    const cardImage = cardPhotos.querySelector(".popup__photo");
    const cardAvatar = card.querySelector(".popup__avatar");
    cardTitle.textContent = title;
    cardAddress.textContent = address;
    cardPrice.textContent = `${price}₽/ночь`;
    cardType.textContent = TYPE_FLAT_DESCRIPTION[type];
    cardRoom.textContent = `${rooms} комнаты для ${guests} гостей.`;
    cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}.`;
    cardFeaturesItems.forEach((value) => {
      value.remove();
    });
    if (features.length > 0) {
      for (let i = 0; i < features.length; i++) {
        let item = document.createElement("li");
        item.classList.add("popup__feature");
        item.classList.add(`popup__feature--${features[i]}`);
        cardFeaturesList.appendChild(item);
      }
    }

    cardDescription.textContent = description;
    cardImage.src = photos[0];
    if (photos.length > 1) {
      for (let i = 1; i < photos.length; i++) {
        let cardImageTemplate = cardImage.cloneNode(true);
        let imgFragment = document.createDocumentFragment();
        cardImageTemplate.src = photos[i];
        imgFragment.append(cardImageTemplate);
        cardPhotos.append(imgFragment);
      }
    } else if (photos.length === 0) {
      cardImage.remove();
    }

    cardAvatar.src = avatar;
    card.classList.add("hidden");
    return card;
  }
};



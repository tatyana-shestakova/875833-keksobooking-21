"use strict";

(function () {
  const TYPE_FLAT_DESCRIPTION = {
    palace: "Дворец",
    flat: "Квартира",
    bungalow: "Бунгало",
    house: "Дом"
  };

  const adsTemplate = document.querySelector("#pin").content.querySelector(".map__pin");
  const cardTemplate = document.querySelector("#card").content.querySelector(".map__card");

  window.renderSimilarAds = (template) => {
    let adsElement = adsTemplate.cloneNode(true);
    adsElement.style = "left: " + (template.location.x + adsElement.style.width) + "px; top: " + (template.location.y + adsElement.style.height) + "px;";
    let image = adsElement.querySelector("img");
    image.src = template.author.avatar;
    image.alt = template.offer.title;
    return adsElement;
  };

  window.renderCards = (template) => {
    let cardElement = cardTemplate.cloneNode(true);
    let cardTitle = cardElement.querySelector(".popup__title");
    let cardAddress = cardElement.querySelector(".popup__text--address");
    let cardPrice = cardElement.querySelector(".popup__text--price");
    let cardType = cardElement.querySelector(".popup__type");
    let cardRoom = cardElement.querySelector(".popup__text--capacity");
    let cardTime = cardElement.querySelector(".popup__text--time");
    let cardFeaturesList = cardElement.querySelector(".popup__features");
    let cardFeaturesItem = cardFeaturesList.querySelectorAll(".popup__feature");
    let cardDescription = cardElement.querySelector(".popup__description");
    let cardPhotos = cardElement.querySelector(".popup__photos");
    let cardImage = cardPhotos.querySelector(".popup__photo");
    let cardAvatar = cardElement.querySelector(".popup__avatar");
    cardTitle.textContent = template.offer.title;
    cardAddress.textContent = template.offer.address;
    cardPrice.textContent = template.offer.price + "₽/ночь";
    cardType.textContent = TYPE_FLAT_DESCRIPTION[template.offer.type];
    cardRoom.textContent = template.offer.rooms + " комнаты для " + template.offer.guests + " гостей.";
    cardTime.textContent = "Заезд после " + template.offer.checkin + ", выезд до " + template.offer.checkout + ".";
    cardFeaturesItem.forEach(function (value, index) {
      if (!value.classList.contains("popup__feature--" + template.offer.features[index])) {
        value.remove();
      }
    });
    cardDescription.textContent = template.offer.description;
    cardImage.src = template.offer.photos[0];
    if (template.offer.photos.length > 1) {
      for (let i = 1; i < template.offer.photos.length; i++) {
        let cardImageTemplate = cardImage.cloneNode(true);
        let imgFragment = document.createDocumentFragment();
        cardImageTemplate.src = template.offer.photos[i];
        imgFragment.append(cardImageTemplate);
        cardPhotos.append(imgFragment);
      }
    }

    cardAvatar.src = template.author.avatar;
    cardElement.classList.add("hidden");
    return cardElement;
  };

})();

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

  window.card = {
    renderSimilarAds: (template) => {
      let adsItem = adsTemplate.cloneNode(true);
      adsItem.style = "left: " + (template.location.x + adsItem.style.width) + "px; top: " + (template.location.y + adsItem.style.height) + "px;";
      let image = adsItem.querySelector("img");
      image.src = template.author.avatar;
      image.alt = template.offer.title;
      return adsItem;
    },
    renderAds: (template) => {
      let card = cardTemplate.cloneNode(true);
      let cardTitle = card.querySelector(".popup__title");
      let cardAddress = card.querySelector(".popup__text--address");
      let cardPrice = card.querySelector(".popup__text--price");
      let cardType = card.querySelector(".popup__type");
      let cardRoom = card.querySelector(".popup__text--capacity");
      let cardTime = card.querySelector(".popup__text--time");
      let cardFeaturesList = card.querySelector(".popup__features");
      let cardFeaturesItems = cardFeaturesList.querySelectorAll(".popup__feature");
      let cardDescription = card.querySelector(".popup__description");
      let cardPhotos = card.querySelector(".popup__photos");
      let cardImage = cardPhotos.querySelector(".popup__photo");
      let cardAvatar = card.querySelector(".popup__avatar");
      cardTitle.textContent = template.offer.title;
      cardAddress.textContent = template.offer.address;
      cardPrice.textContent = template.offer.price + "₽/ночь";
      cardType.textContent = TYPE_FLAT_DESCRIPTION[template.offer.type];
      cardRoom.textContent = template.offer.rooms + " комнаты для " + template.offer.guests + " гостей.";
      cardTime.textContent = "Заезд после " + template.offer.checkin + ", выезд до " + template.offer.checkout + ".";
      cardFeaturesItems.forEach((value) => {
        value.remove();
      });
      if (template.offer.features.length > 0) {
        for (let i = 0; i < template.offer.features.length; i++) {
          let item = document.createElement("li");
          item.classList.add("popup__feature");
          item.classList.add("popup__feature--" + template.offer.features[i]);
          cardFeaturesList.appendChild(item);
        }
      }

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
      } else if (template.offer.photos.length === 0) {
        cardImage.remove();
      }

      cardAvatar.src = template.author.avatar;
      card.classList.add("hidden");
      return card;
    }
  };

})();

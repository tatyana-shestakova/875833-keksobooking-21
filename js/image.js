"use strict";

const FILE_TYPES = ["jpg", "jpeg", "png"];
const avatarMap = document.querySelector(".ad-form__field input[type=file]");
const avatarPreview = document.querySelector(".ad-form-header__preview img");
const fotoAds = document.querySelector(".ad-form__upload input[type=file]");
const fotoPreview = document.querySelector(".ad-form__photo");

avatarMap.addEventListener("change", () => {
  let file = avatarMap.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

fotoAds.addEventListener("change", () => {
  let file = fotoAds.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      let foto = document.createElement("img");
      foto.src = reader.result;
      foto.classList.add("ad-form__photo");
      fotoPreview.appendChild(foto);
    });
    reader.readAsDataURL(file);
  }
});

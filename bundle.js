(()=>{"use strict";(()=>{const e={400:"Что-то пошло не так... Неверный запрос",401:"Что-то пошло не так... Пользователь не авторизован",404:"Что-то пошло не так... Ничего не найдено"},t=document.querySelector(".map__pins");window.data={load:(t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{200===n.status?t(n.response):o(e[n.status])})),n.timeout=1e4,n.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),n.addEventListener("timeout",(()=>{o("Запрос не успел выполниться за "+n.timeout+"мс")})),n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()},save:(t,o,n)=>{const r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(()=>{200===r.status?o(r.response):n(e[r.status])})),r.timeout=1e4,r.addEventListener("error",(()=>{n("Произошла ошибка соединения")})),r.addEventListener("timeout",(()=>{n("Запрос не успел выполниться за "+r.timeout+"мс")})),r.open("POST","https://21.javascript.pages.academy/keksobooking"),r.send(t)},similarAds:t}})(),(()=>{const e=document.querySelector(".map__filters"),t=document.querySelector("#housing-type"),o=document.querySelector("#housing-price"),n=document.querySelector("#housing-rooms"),r=document.querySelector("#housing-guests"),i=document.querySelectorAll(".map__checkbox"),d=e=>{let d=0;return e.offer.type===t.value&&(d+=2),"any"===t.value&&(d+=1),"low"===o.value&&e.offer.price<1e4&&(d+=2),"middle"===o.value&&e.offer.price<5e4&&e.offer.price>=1e4&&(d+=2),"high"===o.value&&e.offer.price>0&&(d+=2),"any"===o.value&&e.offer.price>5e4&&(d+=1),e.offer.rooms===Number(n.value)&&(d+=2),"any"===n.value&&(e.offer.rooms<3||e.offer.rooms<1)&&(d+=1),e.offer.guests===Number(r.value)&&(d+=2),"any"===r.value&&e.offer.guests>3&&(d+=1),i.forEach((t=>{if(t.checked)for(let o=0;o<e.offer.features.length;o++)-1!==e.offer.features.indexOf(t.value)&&(d+=1)})),d};window.sort={changePins:()=>{window.map.renderNewPin(window.map.sortedList.sort(((e,t)=>{let o=d(t)-d(e);return 0===o&&(o=((e,t)=>e>t?1:e<t?-1:0)(e,t)),o})))},sortFilters:e},window.sort.sortFilters.addEventListener("change",(()=>{window.debounce.getTimeout(window.sort.changePins)}))})(),(()=>{const e={palace:"Дворец",flat:"Квартира",bungalow:"Бунгало",house:"Дом"},t=document.querySelector("#pin").content.querySelector(".map__pin"),o=document.querySelector("#card").content.querySelector(".map__card");window.card={renderSimilarAds:e=>{let o=t.cloneNode(!0);o.style="left: "+(e.location.x+o.style.width)+"px; top: "+(e.location.y+o.style.height)+"px;";let n=o.querySelector("img");return n.src=e.author.avatar,n.alt=e.offer.title,o},renderAds:t=>{let n=o.cloneNode(!0),r=n.querySelector(".popup__title"),i=n.querySelector(".popup__text--address"),d=n.querySelector(".popup__text--price"),a=n.querySelector(".popup__type"),s=n.querySelector(".popup__text--capacity"),l=n.querySelector(".popup__text--time"),m=n.querySelector(".popup__features"),c=m.querySelectorAll(".popup__feature"),u=n.querySelector(".popup__description"),p=n.querySelector(".popup__photos"),w=p.querySelector(".popup__photo"),f=n.querySelector(".popup__avatar");if(r.textContent=t.offer.title,i.textContent=t.offer.address,d.textContent=t.offer.price+"₽/ночь",a.textContent=e[t.offer.type],s.textContent=t.offer.rooms+" комнаты для "+t.offer.guests+" гостей.",l.textContent="Заезд после "+t.offer.checkin+", выезд до "+t.offer.checkout+".",c.forEach((e=>{e.remove()})),t.offer.features.length>0)for(let e=0;e<t.offer.features.length;e++){let o=document.createElement("li");o.classList.add("popup__feature"),o.classList.add("popup__feature--"+t.offer.features[e]),m.appendChild(o)}if(u.textContent=t.offer.description,w.src=t.offer.photos[0],t.offer.photos.length>1)for(let e=1;e<t.offer.photos.length;e++){let o=w.cloneNode(!0),n=document.createDocumentFragment();o.src=t.offer.photos[e],n.append(o),p.append(n)}else 0===t.offer.photos.length&&w.remove();return f.src=t.author.avatar,n.classList.add("hidden"),n}}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__filters-container");let o;window.map={sortedList:[],ESC_KEYCODE:27,ENTER_KEYCODE:13,isEscKeyCode:(e,t)=>{e.keyCode===window.map.ESC_KEYCODE&&(e.preventDefault(),t())},isEnterKeyCode:(e,t)=>{e.keyCode===window.map.ENTER_KEYCODE&&(e.preventDefault(),t())},renderPin:()=>{window.data.load(n,r)},addListenerCards:()=>{const e=window.map.getElements(".map__pin:not(.map__pin--main)"),t=document.querySelectorAll(".popup"),n=document.querySelectorAll(".popup__close");t.forEach(((r,i)=>{e[i].addEventListener("click",(()=>{o=r,s(t),d()})),e[i].addEventListener("keydown",(e=>{13===e.keyCode&&(o=r,s(t),d())})),n[i].addEventListener("click",(()=>{a()})),n[i].addEventListener("keydown",(e=>{window.map.isEnterKeyCode(e,a)}))}))},getElements:e=>document.querySelectorAll(e),clearElement:e=>{e.forEach((e=>{e.remove()}))},renderNewPin:o=>{window.map.clearElement(window.map.getElements(".map__pin:not(.map__pin--main)")),window.map.clearElement(window.map.getElements(".popup"));let n=document.createDocumentFragment(),r=document.createDocumentFragment();const i=o.length>5?5:o.length;for(let d=0;d<i;d++)n.appendChild(window.card.renderSimilarAds(o[d])),r.appendChild(window.card.renderAds(o[d])),window.data.similarAds.appendChild(n),e.insertBefore(r,t);window.map.addListenerCards()}};const n=e=>{window.map.sortedList=e,window.sort.changePins()},r=e=>{let t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: white; border: 1px red solid; width: 100%; height: 40px;",t.style.position="absolute",t.style.left=0,t.style.fontSize="18px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},i=e=>{window.map.isEscKeyCode(e,a)},d=()=>{o.classList.remove("hidden"),document.addEventListener("keydown",i)},a=()=>{o.classList.add("hidden"),document.removeEventListener("keydown",i)},s=e=>{for(let t of e)t.classList.add("hidden")}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector("html");window.move={getAddress:(e,t,o,n)=>{e.value=n?Math.floor(parseInt(t.style.left,10)+t.offsetWidth/2)+", "+Math.floor(parseInt(t.style.top,10)+t.offsetHeight/2):Math.floor(parseInt(t.style.left,10)+t.offsetWidth/2)+", "+Math.floor(parseInt(t.style.top,10)+t.offsetHeight+o)},pin:e,angle:22},window.move.pin.addEventListener("mousedown",(e=>{e.preventDefault();let o={x:e.clientX,y:e.clientY};const n=e=>{e.preventDefault();let n=(t.clientWidth-window.main.generalMap.clientWidth)/2+window.move.pin.clientWidth,r=window.main.generalMap.clientWidth+n-2*window.move.pin.clientWidth;if(e.pageY<630&&e.pageY>130&&e.pageX<r&&e.pageX>n){let t={x:o.x-e.clientX,y:o.y-e.clientY};o={x:e.clientX,y:e.clientY},window.move.pin.style.left=window.move.pin.offsetLeft-t.x+"px",window.move.pin.style.top=window.move.pin.offsetTop-t.y+"px",window.move.getAddress(window.main.address,window.move.pin,window.move.angle,window.main.check)}},r=e=>{e.preventDefault(),window.move.getAddress(window.main.address,window.move.pin,window.move.angle,window.main.check),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",r)}))})(),(()=>{const e=document.querySelector(".ad-form"),t=document.querySelector(".map"),o=document.querySelector("input[name='address']");window.main={siteForm:e,address:o,generalMap:t,check:!0,disabledInput:()=>{if(window.move.pin.style.left="570px",window.move.pin.style.top="375px",window.main.check){window.map.clearElement(window.map.getElements(".map__pin:not(.map__pin--main)")),t.classList.add("map--faded"),e.classList.add("ad-form--disabled");for(let e of n)e.setAttribute("disabled","true")}else{t.classList.remove("map--faded"),e.classList.remove("ad-form--disabled");for(let e of n)e.removeAttribute("disabled","true")}},addActiveMap:()=>{window.main.disabledInput(),window.move.getAddress(o,window.move.pin,window.move.angle,window.main.check),t.classList.contains("map--faded")&&(window.main.check=!1,window.move.pin.addEventListener("keydown",r),window.move.pin.addEventListener("mousedown",i))}};const n=window.main.siteForm.querySelectorAll("fieldset"),r=e=>{e.keyCode===window.map.ENTER_KEYCODE&&(a(),t.classList.contains("map--faded")||d())},i=e=>{1===e.which&&(a(),t.classList.contains("map--faded")||d())},d=()=>{window.move.pin.removeEventListener("keydown",r),window.move.pin.removeEventListener("mousedown",i)},a=()=>{window.main.disabledInput(),window.move.getAddress(o,window.move.pin,window.move.angle,window.main.check),window.map.renderPin()};window.main.addActiveMap()})(),(()=>{const e=window.main.siteForm.querySelector("#timein"),t=window.main.siteForm.querySelector("#timeout"),o=document.querySelector("#success").content.querySelector(".success"),n=document.querySelector("#error").content.querySelector(".error"),r=document.querySelector("main"),i=window.main.siteForm.querySelector("#room_number"),d=window.main.siteForm.querySelector("#capacity"),a=window.main.siteForm.querySelector("#type"),s=window.main.siteForm.querySelector("#price");let l;s.min="1000",window.main.siteForm.addEventListener("change",(()=>{i.setCustomValidity(""),i.value<d.value?i.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат"):100===Number(i.value)&&0!==Number(d.value)?i.setCustomValidity("Это помещение не для гостей!"):Number(d.value)===Number(i.value)&&i.setCustomValidity(""),i.reportValidity(),d.setCustomValidity(""),d.value>i.value?d.setCustomValidity("Все гости не поместятся! Давайте выберем побольше комнат"):0===Number(d.value)&&100!==Number(i.value)?d.setCustomValidity("Выберете помещение с 100 комнатами"):Number(d.value)===Number(i.value)&&d.setCustomValidity(""),d.reportValidity(),e.value===t.value&&t.value===e.value||(t.value=e.value,e.value=t.value),"bungalow"===a.value?s.min="0":"flat"===a.value?s.min="1000":"house"===a.value?s.min="5000":"palace"===a.value&&(s.min="10000")}));const m=e=>{window.map.isEscKeyCode(e,c)},c=()=>{l.remove(),document.removeEventListener("keydown",m)},u=e=>{l=e.cloneNode(!0);let t=document.createDocumentFragment();t.appendChild(l),r.appendChild(t),document.addEventListener("click",(()=>{c()})),document.addEventListener("keydown",m);const o=l.querySelector(".error__button");o&&o.addEventListener("click",(e=>{e.preventDefault(),window.main.siteForm.reset(),window.sort.sortFilters.reset(),c()}))},p=()=>{window.main.check=!0,window.main.addActiveMap(),u(o),window.main.siteForm.reset(),window.sort.sortFilters.reset()},w=()=>{u(n)};window.main.siteForm.addEventListener("submit",(e=>{window.data.save(new FormData(window.main.siteForm),p,w),e.preventDefault()}))})(),(()=>{let e;window.debounce={getTimeout:t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,500)}}})(),(()=>{const e=["jpg","jpeg","png"],t=document.querySelector(".ad-form__field input[type=file]"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector(".ad-form__upload input[type=file]"),r=document.querySelector(".ad-form__photo");t.addEventListener("change",(()=>{let n=t.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(n)}})),n.addEventListener("change",(()=>{let t=n.files[0],o=t.name.toLowerCase();if(e.some((e=>o.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{let t=document.createElement("img");t.src=e.result,t.classList.add("ad-form__photo"),r.appendChild(t)})),e.readAsDataURL(t)}}))})()})();
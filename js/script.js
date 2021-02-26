const popup = document.querySelector('.modal');
const buttonPopupControl = document.querySelector('.button-modal');
const popupDateArrivel = popup.querySelector('[name = date-arrivel]');
const popupDateOut = popup.querySelector('[name = dateout]');
const popupAdults = popup.querySelector('[name = adults]');
const popupChildren = popup.querySelector('[name = children]');
const formPopup = popup.querySelector('.search-hotel-form');

// Плюс и минус
const plus = popup.querySelectorAll('.plus');
const minus = popup.querySelectorAll('.minus');
for (let i=0; i<plus.length; i++){
  plus[i].addEventListener('click', function() {
    if(i==0) {
    popupAdults.value++;}
  else {
    popupChildren.value++;
  }});
}

for (let i=0; i<minus.length; i++){
  minus[i].addEventListener('click', function() {
    if(i==0) {
    if (popupAdults.value != 0) {
    popupAdults.value--;
  }}
  else {
    if (popupChildren.value != 0) {
      popupChildren.value--;
    }
  }});
}

// Проверка работы хранилища
let isStorageSupport = true;
let storageAdults = '';
let storageChildren = '';

try {
  storageAdults = localStorage.getItem('adults');
  storageChildren = localStorage.getItem('children');
} catch (err) {
  isStorageSupport = false;
}

if (!popup.classList.contains('modal-close')) {
  popup.classList.add('modal-close');
}

// Клик по кнопке Поиск гостиниц (закртие/открытие)
buttonPopupControl.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.toggle('modal-close');
  popupDateArrivel.focus();
  if(popup.classList.contains('modal')) {
    popup.classList.add('modal-slidedown');
  } else {
    popup.classList.remove('modal-slidedown');
  }

  if (storageAdults) {
    popupAdults.value = storageAdults;
  }
  if (storageChildren) {
    popupChildren.value = storageChildren;
  }
});

// Нажатие Esc для закрытия формы
document.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains('modal')) {
      evt.preventDefault();
      popup.classList.add('modal-close');
      }
    }
});

// Нажатие Найти
formPopup.addEventListener('submit', function(evt) {
  if(!popupDateArrivel.value || !popupDateOut.value || !popupAdults.value || !popupChildren.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
    localStorage.setItem('adults', popupAdults.value);
    localStorage.setItem('children', popupChildren.value);
  }
  }
});

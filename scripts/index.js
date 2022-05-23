const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add');
const closeButton = popup.querySelector('.popup__close-icon');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_value_name');
let jobInput = formElement.querySelector('.form__input_value_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let itemName = document.querySelector('.grid-item__title');
let itemImage = document.querySelector('.grid-item__photo');

//открытие окна редактирования профиля, значения инпутов берутся со страницы
function openPopupEdit() {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// открытие окна добавления контента, инпуты пустые
function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
}

//закрытие любого из попапов
function closePopup() {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

editButton.addEventListener('click', openPopup1);
addButton.addEventListener('click', openPopup2);
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
import {
initialCards,
cardListSelector
} from '../utils/constants.js'

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import popupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
    FormValidator,
    validConsts as config,
} from '../components/FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const formElementEdit = popupEdit.querySelector('.form');
const formElementAdd = popupAdd.querySelector('.form');
const nameInput = formElementEdit.querySelector('.form__input_value_name');
const jobInput = formElementEdit.querySelector('.form__input_value_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const titleInput = formElementAdd.querySelector('.form__input_value_title');
const linkInput = formElementAdd.querySelector('.form__input_value_link');
const popupView = document.querySelector('.popup_type_view');
const popupViewPicture = popupView.querySelector('.card__picture');
const popupViewText = popupView.querySelector('.card__title');
const gridElements = document.querySelector('.grid-elements');
const editFormValidator = new FormValidator(config, formElementEdit);
const addFormValidator = new FormValidator(config, formElementAdd);
const addEditPopup = new PopupWithForm(popupEdit);
const addNewCardPopup = new PopupWithForm(popupAdd);

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.item-template', handleCardClick);
    const cardElement = card.generateCard();
    initialCardList.setItem(cardElement);
  }
}, cardListSelector);

const openPopupEdit = () => {
   const profileName = nameInput.value;
    const profileJob = jobInput.value;
const info = new UserInfo({profileName, profileJob});
    editFormValidator.resetValidation();
addEditPopup.open();
};

const openPopupAdd = () => {
    formElementAdd.reset();
    addFormValidator.resetValidation();
addNewCardPopup.open();
};

/*
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-icon')) {
            closePopup(popup)
        }
    })
})
*/

const handleCardClick = (name, link) => {
    popupViewPicture.src = link;
    popupViewText.textContent = name;
    popupViewPicture.alt = name;
    const addImagePopup = new popupWithImage(name, link);
}

const createCard = (name, link) => {
    const card = new Card(name, link, '.item-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

const handleAddCardSubmit = (evt) => {
    evt.preventDefault();
    const name = titleInput.value;
    const link = linkInput.value;
    gridElements.prepend(createCard(name, link));
};

const handleEditProfileSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

initialCardList.renderItems();

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
formElementEdit.addEventListener('submit', handleEditProfileSubmit);
formElementAdd.addEventListener('submit', handleAddCardSubmit);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
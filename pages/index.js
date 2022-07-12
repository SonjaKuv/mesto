import {
    initialCards,
    cardListSelector,
    popupView
} from '../utils/constants.js'

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
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
const gridElements = document.querySelector('.grid-elements');
const popups = Array.from(document.querySelectorAll('.popup'));

const editFormValidator = new FormValidator(config, formElementEdit);
const addFormValidator = new FormValidator(config, formElementAdd);

const initialCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link);
        initialCardList.addItem(cardElement);
    }
}, cardListSelector);

const createCard = (name, link) => {
    const card = new Card(name, link, '.item-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

const openPopupEdit = () => {
    const profileName = nameInput.value;
    const profileJob = jobInput.value;
    const info = new UserInfo({
        profileName,
        profileJob
    });
    info.getUserInfo(profileName, profileJob);
    editFormValidator.resetValidation();
    const addEditPopup = new PopupWithForm(popupEdit);
    addEditPopup.open();
};

const openPopupAdd = () => {
    formElementAdd.reset();
    addFormValidator.resetValidation();
    const addNewCardPopup = new PopupWithForm(popupAdd);
    addNewCardPopup.open();
};

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        const modalWindow = new Popup(popup);
        if (evt.target.classList.contains('popup_opened')) {
            modalWindow.close();
        }
        if (evt.target.classList.contains('popup__close-icon')) {
            modalWindow.setEventListeners();

        }
    })
})

const handleCardClick = (name, link) => {
    const imagePopup = new PopupWithImage(popupView, name, link);
    imagePopup.open()
}

const handleAddCardSubmit = (evt) => {
    evt.preventDefault();
    formAdd.setEventListeners()
    formAdd.close()
    const name = titleInput.value;
    const link = linkInput.value;
    gridElements.prepend(createCard(name, link));
};

const handleEditProfileSubmit = (evt) => {
    evt.preventDefault();
    formEdit.setEventListeners();
    formEdit.close();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

const formAdd = new PopupWithForm(popupAdd, handleEditProfileSubmit);
const formEdit = new PopupWithForm(popupEdit, handleAddCardSubmit)


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCardList.renderItems();

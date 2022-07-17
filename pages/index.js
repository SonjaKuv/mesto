import './index.css';

import {
    initialCards,
    cardListSelector,
    popupView,
    editButton,
    addButton,
    popupEdit,
    popupAdd,
    formElementEdit,
    formElementAdd,
    nameInput,
    jobInput,
    profileName,
    profileJob,
    titleInput,
    linkInput,
    gridElements,
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

const editFormValidator = new FormValidator(config, formElementEdit);
const addFormValidator = new FormValidator(config, formElementAdd);

const initialCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link);
        initialCardList.addItem(cardElement);
    }
}, cardListSelector);

const createCard = (title, link) => {
    const card = new Card(title, link, '.item-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

const handleCardClick = (name, link) => {
    const imagePopup = new PopupWithImage(popupView, name, link);
    imagePopup.open()
    imagePopup.setEventListeners()
}

const openPopupEdit = () => {
    info.getUserInfo(nameInput, jobInput);
    editFormValidator.resetValidation();
    editPopup.open()
};

const openPopupAdd = () => {
    addFormValidator.resetValidation();
    addPopup.open();
};

const addPopup = new PopupWithForm({
    popupSelector: popupAdd,
    handleFormSubmit: (item) => {
        item = {
            title: titleInput.value,
            link: linkInput.value
        };
        gridElements.prepend(createCard(item.title, item.link));
    }
});

addPopup.setEventListeners();

const editPopup = new PopupWithForm({
    popupSelector: popupEdit,
    handleFormSubmit: (item) => {
        item = {
            user: nameInput.value,
            job: jobInput.value
        }
        info.setUserInfo(item.user, item.job);
    }
});

editPopup.setEventListeners();

const info = new UserInfo({
    profileName,
    profileJob
});

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCardList.renderItems();
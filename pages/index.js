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
const submitAddCardButton = popupAdd.querySelector('.form__submit-button');
const submitEditProfileButton = popupEdit.querySelector('.form__submit-button');

const editFormValidator = new FormValidator(config, formElementEdit);
const addFormValidator = new FormValidator(config, formElementAdd);

const info = new UserInfo({profileName, profileJob});
//done
const initialCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link);
        initialCardList.addItem(cardElement);
    }
}, cardListSelector);
//done
const createCard = (name, link) => {
    const card = new Card(name, link, '.item-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

//done
const handleCardClick = (name, link) => {
    const imagePopup = new PopupWithImage(popupView, name, link);
    imagePopup.open()
}

//validation?
const openPopupEdit = () => {
    info.getUserInfo();
console.log(info)
    editFormValidator.resetValidation();
    const addPopup = new Popup(popupEdit);
    addPopup.open();
};
//validation?
const openPopupAdd = () => {
    formElementAdd.reset();
    addFormValidator.resetValidation();
    const addPopup = new Popup(popupAdd);
    addPopup.open();
};
//done
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

const submitAddCardForm = new PopupWithForm({
popupSelector: popupAdd,
handleFormSubmit: (item) => {
const card = createCard(item);

gridElements.prepend.card;
}
});
//done
const submitEditProfileForm = new PopupWithForm({
popupSelector: popupEdit,
handleFormSubmit: (item) => {
item = {user: nameInput.value, 
job: jobInput.value}
info.setUserInfo(item.user, item.job);
}
});

submitAddCardButton.addEventListener('click', (evt) => {
submitAddCardForm.setEventListeners(evt);
});
submitEditProfileButton.addEventListener('click', (evt) => {
submitEditProfileForm.setEventListeners(evt);
});
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCardList.renderItems();

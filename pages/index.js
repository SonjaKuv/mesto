import './index.css';

import {
    initialCards,
    cardListSelector,
    buttonEditProfile,
    buttonAddCard,
    formEditProfile,
    formAddCard,
    inputName,
    inputJob,
    profileName,
    profileJob,
    inputTitle,
    inputLink,
    validationConfig
} from '../utils/constants.js'

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const validatorEditProfileForm = new FormValidator(validationConfig, formEditProfile);
const validatorAddCardForm = new FormValidator(validationConfig, formAddCard);

const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, cardListSelector);

const createCard = (cardData) => {
    const card = new Card(cardData, '.item-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

const popupOpenImage = new PopupWithImage('.popup_type_view');
const handleCardClick = (name, link) => {
    popupOpenImage.open(name, link)
};

popupOpenImage.setEventListeners();

const openPopupEdit = () => {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    validatorEditProfileForm.resetValidation();
    popupNewProfileInfo.open()
};

const openPopupAdd = () => {
    validatorAddCardForm.resetValidation();
    popupNewCard.open();
};

const popupNewCard = new PopupWithForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (item) => {
        item = {
            title: inputTitle.value,
            link: inputLink.value
        };
        cardList.addItem(createCard(item));
    }
});

popupNewCard.setEventListeners();

const popupNewProfileInfo = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (item) => {
        item = {
            user: inputName.value,
            job: inputJob.value
        }
        userInfo.setUserInfo(item.user, item.job);
    }
});

popupNewProfileInfo.setEventListeners();

const userInfo = new UserInfo({
    profileName: '.profile__name',
    profileJob: '.profile__description'
});

buttonEditProfile.addEventListener('click', openPopupEdit);
buttonAddCard.addEventListener('click', openPopupAdd);

validatorEditProfileForm.enableValidation();
validatorAddCardForm.enableValidation();

cardList.renderItems(initialCards);
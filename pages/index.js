import './index.css';

import {
    initialCards,
    cardListSelector,
    buttonEditProfile,
    buttonAddCard,
    buttonEditAvatar,
    formEditProfile,
    formAddCard,
    formEditAvatar,
    inputName,
    inputJob,
    inputAvatar,
    inputTitle,
    inputLink,
    profileName,
    profileJob,
    validationConfig,
} from '../utils/constants.js'

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api';

const validatorEditProfileForm = new FormValidator(validationConfig, formEditProfile);
const validatorAddCardForm = new FormValidator(validationConfig, formAddCard);
const validatorEditAvatarForm = new FormValidator(validationConfig, formEditAvatar)

const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, cardListSelector);

const createCard = (cardData) => {
    const card = new Card(cardData, '.item-template', handleCardClick, handleCardRemove);
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

const openPopupEditAvatar = () => {
    validatorEditAvatarForm.resetValidation();
    popupNewAvatar.open();
};

const popupNewAvatar = new PopupWithForm({
    popupSelector: '.popup_type_edit-avatar',
    handleFormSubmit: (item) => {
        item = {
            avatar: inputAvatar.value
        };
        userInfo.setProfileAvatar(item.avatar)
    }
});

popupNewAvatar.setEventListeners();

const popupCardDeletion = new PopupWithForm({
    popupSelector: '.popup_type_delete',
    handleFormSubmit: (item) => {
        item = { };
   const card = new Card(item, '.item-template', handleCardClick, handleCardRemove);
   card.removeCard()
    }
});

const handleCardRemove = () => {
popupCardDeletion.open()
};

popupCardDeletion.setEventListeners();

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
    profileJob: '.profile__description',
    profileAvatar: '.profile__avatar-photo'
});

buttonEditProfile.addEventListener('click', openPopupEdit);
buttonAddCard.addEventListener('click', openPopupAdd);
buttonEditAvatar.addEventListener('click', openPopupEditAvatar);

validatorEditProfileForm.enableValidation();
validatorAddCardForm.enableValidation();
validatorEditAvatarForm.enableValidation();

const apiConfig = {
url: 'https://mesto.nomoreparties.co/v1/cohort-46',
headers: {
    authorization: 'fc76fdb8-e2ba-4757-a444-c4106fd529da',
    'Content-Type': 'application/json'
  },
}

const api = new Api({apiConfig});

  api.getInitialCards()
  .then((result) => {
    cardList.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
  });
/*
  api.addNewCard({name: 'mememe', link: 'https://russiantourism.ru/netcat_files/2343_27909.jpg'})
  .then((result) => {
console.log(result)
})
.catch((err) => {
  console.log(err);
});
*/
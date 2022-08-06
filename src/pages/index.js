import "./index.css";

import {
  initialCards,
  cardListSelector,
  buttonEditProfile,
  buttonAddCard,
  buttonEditAvatar,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  inputAvatar,
  inputTitle,
  inputLink,
  profileName,
  profileJob,
  profileAvatar,
  validationConfig,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithСonfirmation";
import Api from "../components/Api";

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "fc76fdb8-e2ba-4757-a444-c4106fd529da",
    "Content-Type": "application/json",
  },
};
const api = new Api(apiConfig);

const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addServerCard(cardElement);
    },
  },
  cardListSelector
);

const createCard = (cardData) => {
  const card = new Card({
    data: cardData,
    cardSelector: ".item-template",
    handleCardClick: (card) => {
      popupOpenImage.open(card._title, card._link);
    },
    handleDeleteIconClick: (card) => {
      popupCardDeletion.card = card;
      popupCardDeletion.open();
    },
    handleLikeIconClick: (card) => {
      api
        .changeLikeStatus(card._id, card.isLiked)
        .then((result) => {
          const likesAmount = result.likes.length;
          card.updateLikeStatus(likesAmount);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    profileId: profileId,
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

let profileId;

Promise.all([api.getUserInfo(), api.getInitialCards()]) 
  .then(([userData, cards]) => {
    profileId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

////////////////Popups\\\\\\\\\\\\\\\\
/*Попап редактирования профиля*/
const popupNewProfileInfo = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: (info) => {
    popupNewProfileInfo.renderLoading(true);
    api
      .setUserInfo(info.name, info.about)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupNewProfileInfo.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupNewProfileInfo.renderLoading(false)
      })
  },
});
const openPopupEdit = () => {
  validatorEditProfileForm.resetValidation();
  popupNewProfileInfo.setInputValues(userInfo.getUserInfo());
  popupNewProfileInfo.open();
};
popupNewProfileInfo.setEventListeners();

/*Попап редактирования аватара*/
const popupNewAvatar = new PopupWithForm({
  popupSelector: ".popup_type_edit-avatar",
  handleFormSubmit: (info) => {
    popupNewAvatar.renderLoading(true);
    api
      .setNewAvatar(info.avatar)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupNewAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupNewAvatar.renderLoading(false);
      })
  },
});
const openPopupEditAvatar = () => {
  validatorEditAvatarForm.resetValidation();
  popupNewAvatar.open();
};
popupNewAvatar.setEventListeners();

/*Попап создания новой карточки*/
const popupNewCard = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleFormSubmit: (item) => {
    popupNewCard.renderLoading(true);
    api
      .addNewCard(item.title, item.link)
      .then((result) => {
        cardList.addItem(createCard(result));
        popupNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupNewCard.renderLoading(false);
      })
  },
});
const openPopupAdd = () => {
  validatorAddCardForm.resetValidation();
  popupNewCard.open();
};
popupNewCard.setEventListeners();

/*Попап открытия картинки*/
const popupOpenImage = new PopupWithImage(".popup_type_view");
popupOpenImage.setEventListeners();

/*Попап удаления карточки*/
const popupCardDeletion = new PopupWithConfirmation({
  popupSelector: ".popup_type_delete",
  handleCardDelete: () => {
    api
      .deleteCard(popupCardDeletion.card._id)
      .then(() => {
        popupCardDeletion.card.removeCard();
        popupCardDeletion.close();
        popupCardDeletion.card = "";
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupCardDeletion.setEventListeners();

////////////////Forms validation\\\\\\\\\\\\\\\\
const validatorEditProfileForm = new FormValidator(
  validationConfig,
  formEditProfile
);

const validatorAddCardForm = new FormValidator(validationConfig, formAddCard);
const validatorEditAvatarForm = new FormValidator(
  validationConfig,
  formEditAvatar
);

validatorEditProfileForm.enableValidation();
validatorAddCardForm.enableValidation();
validatorEditAvatarForm.enableValidation();

/////////////////Event listeners\\\\\\\\\\\\\\\\\\\\
buttonEditProfile.addEventListener("click", openPopupEdit);
buttonAddCard.addEventListener("click", openPopupAdd);
buttonEditAvatar.addEventListener("click", openPopupEditAvatar);

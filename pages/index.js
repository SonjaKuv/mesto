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
  inputName,
  inputJob,
  inputAvatar,
  inputTitle,
  inputLink,
  profileName,
  profileJob,
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

const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    ".item-template",
    handleCardClick,
    openPopupDeleteCard,
    handleDeleteCard,
    handleLikeIconClick,
    handleAddCard
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileJob: ".profile__description",
  profileAvatar: ".profile__avatar-photo",
});

////////////////////Popups\\\\\\\\\\\\\\\\\\\\\\\
/*Открытие картинки*/
const popupOpenImage = new PopupWithImage(".popup_type_view");
const handleCardClick = (name, link) => {
  popupOpenImage.open(name, link);
};
popupOpenImage.setEventListeners();

/*Добавление новой карточки*/
const popupNewCard = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleFormSubmit: (item) => {
    item = {
      title: inputTitle.value,
      link: inputLink.value,
    };
    cardList.addItem(createCard(item));
  },
});
const openPopupAdd = () => {
  validatorAddCardForm.resetValidation();
  popupNewCard.open();
};
popupNewCard.setEventListeners();

/*Редактирование профиля*/
const popupNewProfileInfo = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: (item) => {
    item = {
      user: inputName.value,
      job: inputJob.value,
    };
    userInfo.setUserInfo(item.user, item.job);
  },
});
const openPopupEdit = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validatorEditProfileForm.resetValidation();
  popupNewProfileInfo.open();
};
popupNewProfileInfo.setEventListeners();

/*Редактирование аватара*/
const popupNewAvatar = new PopupWithForm({
  popupSelector: ".popup_type_edit-avatar",
  handleFormSubmit: (item) => {
    item = {
      avatar: inputAvatar.value,
    };
    userInfo.setProfileAvatar(item.avatar);
  },
});
const openPopupEditAvatar = () => {
  validatorEditAvatarForm.resetValidation();
  popupNewAvatar.open();
};
popupNewAvatar.setEventListeners();

/*Удаление карточки*/
const popupCardDeletion = new PopupWithConfirmation({
  popupSelector: ".popup_type_delete",
  handleCardDelete: (id) => {
    const card = new Card(
      id,
      ".item-template",
      handleCardClick,
      openPopupDeleteCard,
      handleDeleteCard,
      handleLikeIconClick,
      handleAddCard
    );
    card.removeCard(id);
  },
});
const openPopupDeleteCard = (id) => {
  popupCardDeletion.open();
  popupCardDeletion.setEventListeners(id);
};

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

///////////////API\\\\\\\\\\\\\\\\\
const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "fc76fdb8-e2ba-4757-a444-c4106fd529da",
    "Content-Type": "application/json",
  },
};
const api = new Api(apiConfig);

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    cardList.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
  });

const handleLikeIconClick = (id, isLiked) => {
  api.changeLikeStatus(id, isLiked)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

const handleDeleteCard = (id) => {
  api.deleteCard(id)
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
}

const handleAddCard = (name, link) => {
  api.addNewCard({name, link})
  .then((result) => {
console.log(result)
})
.catch((err) => {
  console.log(err);
});
}

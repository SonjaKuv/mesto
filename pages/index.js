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

/////////Создание и отрисовка карточек\\\\\\\\\
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
  const card = new Card(
    cardData,
    ".item-template",
    handleCardClick,
    handleDeleteIconClick,
    handleLikeIconClick,
    profileId
  );
  const cardElement = card.generateCard();
  return cardElement;
};

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
  api
    .changeLikeStatus(id, isLiked)
    .then((result) => {
      const card = new Card(
        result,
        ".item-template",
        handleCardClick,
        handleDeleteIconClick,
        handleLikeIconClick,
        profileId
      );
      card.updateLikeStatus(result.likes);
    })
    .catch((err) => {
      console.log(err);
    });
};

const popupNewCard = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleFormSubmit: (item) => {
    item = {
      name: inputTitle.value,
      link: inputLink.value,
    };
    popupNewCard.setLoading(true);
    api
      .addNewCard(item.name, item.link)
      .then((result) => {
        cardList.addItem(createCard(result));
        popupNewCard.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
const openPopupAdd = () => {
  validatorAddCardForm.resetValidation();
  popupNewCard.open();
  popupNewCard.setEventListeners();
};

/////////Данные профиля\\\\\\\\\\
const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

let profileId;

api
  .getUserInfo()
  .then((result) => {
    profileId = result._id;
    userInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err);
  });

/*Редактирование профиля*/
const popupNewProfileInfo = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: (info) => {
    info = {
      name: inputName.value,
      about: inputJob.value,
    };
    popupNewProfileInfo.setLoading(true);
    api
      .setUserInfo(info.name, info.about)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupNewProfileInfo.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
const openPopupEdit = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validatorEditProfileForm.resetValidation();
  popupNewProfileInfo.open();
  popupNewProfileInfo.setEventListeners();
};

/*Редактирование аватара*/
const popupNewAvatar = new PopupWithForm({
  popupSelector: ".popup_type_edit-avatar",
  handleFormSubmit: (info) => {
    info = {
      avatar: inputAvatar.value,
    };
    popupNewAvatar.setLoading(true);
    api
      .setNewAvatar(info.avatar)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupNewAvatar.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
const openPopupEditAvatar = () => {
  validatorEditAvatarForm.resetValidation();
  popupNewAvatar.open();
  popupNewAvatar.setEventListeners();
};

/*Открытие картинки*/
const popupOpenImage = new PopupWithImage(".popup_type_view");
const handleCardClick = (name, link) => {
  popupOpenImage.open(name, link);
};
popupOpenImage.setEventListeners();

/*Удаление карточки*/
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
const handleDeleteIconClick = (card) => {
  popupCardDeletion.card = card;
  popupCardDeletion.open();
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

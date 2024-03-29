export const initialCards = [{
        title: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validationConfig = {

    formElement: '.form',
    inputElement: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButton: 'form__submit-button_invalid',
    inputError: 'form__input_type_error',
    errorClass: 'form__error-message',
};

export const cardListSelector = '.grid-elements';

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.profile__avatar');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_add');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const formEditAvatar = popupEditAvatar.querySelector('.form');
export const formEditProfile = popupEditProfile.querySelector('.form');
export const formAddCard = popupAddCard.querySelector('.form');
export const inputName = formEditProfile.querySelector('.form__input_value_name');
export const inputAbout = formEditProfile.querySelector('.form__input_value_about');
export const inputAvatar = document.querySelector('.form__input_value_avatar');
export const inputTitle = formAddCard.querySelector('.form__input_value_title');
export const inputLink = formAddCard.querySelector('.form__input_value_link');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar-photo');
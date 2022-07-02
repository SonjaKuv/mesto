import {
    data,
    Card
} from './Card.js';
import {
    FormValidator,
    validConsts as config,
} from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popups = Array.from(document.querySelectorAll('.popup'));
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

const handleCardClick = (name, link) => {
    popupViewPicture.src = link;
    popupViewText.textContent = name;
    popupViewPicture.alt = name;
    openPopup(popupView);
}

const createCard = (name, link) => {
    const card = new Card(name, link, '.item-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

data.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    gridElements.prepend(cardElement)
});

const openPopup = (item) => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

const openPopupEdit = () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    editFormValidator.resetValidation();
    openPopup(popupEdit);
};

const openPopupAdd = () => {
    formElementAdd.reset();
    addFormValidator.resetValidation();
    openPopup(popupAdd);
};

const closePopup = (element) => {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

const handleCloseEvent = (evt) => {
    const element = evt.target.closest('.popup');
    closePopup(element);
};

const handleAddCardSubmit = (evt) => {
    evt.preventDefault();
    const name = titleInput.value;
    const link = linkInput.value;
    gridElements.prepend(createCard(name, link));
    handleCloseEvent(evt);
};

const editProfile = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handleCloseEvent(evt);
};

const closePopupByEsc = (evt) => {
    popups.forEach((popup) => {
        if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
};

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

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
formElementEdit.addEventListener('submit', editProfile);
formElementAdd.addEventListener('submit', handleAddCardSubmit);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
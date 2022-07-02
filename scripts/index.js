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
const closeIcons = Array.from(document.querySelectorAll('.popup__close-icon'));
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

const handleCardClick = (name, link)  => { 
        popupViewPicture.src = link;
        popupViewText.textContent = name; 
        popupViewPicture.alt = name; 
        openPopup(popupView); 
    }

const createCard = (item) => {
    const card = new Card(item, '.item-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

//Для каждого элемента массива выполняем колбэк функцию 
data.forEach((item) => { 
    const cardElement = createCard(item);
    gridElements.prepend(cardElement)});

//Открытие попапа
const openPopup = (item) => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//Открытие окна редактирования профиля, значения инпутов берутся со страницы
const openPopupEdit = () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    editFormValidator.resetValidation();
    openPopup(popupEdit);
};

//Открытие окна добавления новой карточки с обязательным ресетом формы 
const openPopupAdd = () => {
    formElementAdd.reset();
    addFormValidator.resetValidation();
    openPopup(popupAdd);
};

//Закрытие любого попапа
const closePopup = (element) => {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

//Находим ближайший попап для закрытия
const handleCloseEvent = (evt) => {
    const element = evt.target.closest('.popup');
    closePopup(element);
};

//Обрабатываем событие сабмита создания новой карточки
const handleAddCardSubmit = (evt) => {
    evt.preventDefault();
    data.name = titleInput.value;
    data.link = linkInput.value;
    createCard(data);
    handleCloseEvent(evt);
};

//Редактирование профиля
const editProfile = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handleCloseEvent(evt);
};

//Закрытие попапа при нажатии на overlay
const closePopupByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        handleCloseEvent(evt);
    }
};

//Закрытие попапа при нажатии на Esc
const closePopupByEsc = (evt) => {
    popups.forEach((popup) => {
        if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
};

//Закрытие попапа при нажатии на close-icon
closeIcons.forEach((item) => {
    item.addEventListener('click', handleCloseEvent)
});
//Закрытие попапа при нажатии на overlay
popups.forEach((popup) => {
    popup.addEventListener('click', closePopupByOverlay)
});

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
formElementEdit.addEventListener('submit', editProfile);
formElementAdd.addEventListener('submit', handleAddCardSubmit);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
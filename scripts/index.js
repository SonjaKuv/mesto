const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupView = document.querySelector('.popup_type_view');
const popups = [popupEdit, popupAdd, popupView];
const popupViewPicture = popupView.querySelector('.card__picture');
const popupViewText = popupView.querySelector('.card__title');
const closeIcons = Array.from(document.querySelectorAll('.popup__close-icon'));
const cardsContainer = document.querySelector('.grid-elements');
const cardTemplate = document.querySelector('.item-template').content;
const formElementEdit = popupEdit.querySelector('.form');
const formElementAdd = popupAdd.querySelector('.form');
const nameInput = formElementEdit.querySelector('.form__input_value_name');
const jobInput = formElementEdit.querySelector('.form__input_value_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const titleInput = formElementAdd.querySelector('.form__input_value_title');
const linkInput = formElementAdd.querySelector('.form__input_value_link');
const forms = Array.from(document.querySelectorAll('.form'));

//Открытие окна редактирования профиля, значения инпутов берутся со страницы
const openPopupEdit = (evt) => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
};

//Изменяем видимость попапа 
const openPopup = (item) => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//Для каждого элемента массива выполняем колбэк функцию
const renderCardsList = (data) => {
    data.forEach((item) => renderCardItem(item))
};

//Добавление созданных карточек в контейнер
const renderCardItem = (data) => {
    cardsContainer.prepend(createCard(data));
};

//Создание карточки и установка слушателей для неё
const createCard = (data) => {
    const cardElement = cardTemplate.querySelector('.grid-item').cloneNode(true);
    const imageView = cardElement.querySelector('.grid-item__photo')

    cardElement.querySelector('.grid-item__title').textContent = data.name;
    imageView.alt = data.name;
    imageView.src = data.link;

    //Вызов окна просмотра и заполнение его контентом нажатого элемента
    imageView.addEventListener('click', (evt) => {
        fillPopup(evt)
    });

    const fillPopup = (evt) => {
        const data = evt.target;
        openPopup(popupView);
        popupViewPicture.src = data.src;
        popupViewText.textContent = data.alt;
        popupViewPicture.alt = data.alt;
    };

    return cardElement;
};

//Устанавливаем значения инпутов для новой карточки
const handleAddCardSubmit = (evt) => {
    evt.preventDefault();
    const name = titleInput.value;
    const link = linkInput.value;
    renderCardItem({
        name,
        link
    });
    handleCloseEvent(evt);
};

renderCardsList(initialCards);

//Переключение лайка
const likeCard = (evt) => {
    if (evt.target.classList.contains('grid-item__like')) {
        evt.target.classList.toggle('grid-item__like_active');
    }
};

//Удаление карточки
const removeCard = (evt) => {
    if (evt.target.classList.contains('grid-item__trash')) {
        const buttonElement = evt.target;
        buttonElement.closest('.grid-item').remove();
    }
};

//Редактирование профиля
const editProfile = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handleCloseEvent(evt);
};

//Восстанавливаем стандартные значения формы
const resetForms = (evt) => {
    forms.forEach((form) => {
        evt.target = form;
        form.reset();
        validatePopupInputs(form, validConsts)
    })
};

//Находим ближайший попап для закрытия
const handleCloseEvent = (evt) => {
    const element = evt.target.closest('.popup');
    resetForms(evt);
    closePopup(element);
};

//Закрытие любого попапа
const closePopup = (element) => {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
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
            evt.target = popup;
            closePopup(popup);
        }
    });
};

//Закрытие попапа при нажатии на close-icon
closeIcons.forEach((item) => {
    item.addEventListener('click', handleCloseEvent)
});

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', (evt) => {
    openPopup(popupAdd)
});
formElementEdit.addEventListener('submit', editProfile);
formElementAdd.addEventListener('submit', handleAddCardSubmit);

cardsContainer.addEventListener('click', likeCard);
cardsContainer.addEventListener('click', removeCard);

popups.forEach((popup) => {
    popup.addEventListener('click', closePopupByOverlay)
});
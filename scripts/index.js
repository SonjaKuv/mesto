const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupView = document.querySelector('.popup_type_view');
const popups = [popupEdit, popupAdd, popupView];
const closeEditFormIcon = popupEdit.querySelector('.popup__close-icon');
const closeAddFormIcon = popupAdd.querySelector('.popup__close-icon');
const closeViewWindowIcon = popupView.querySelector('.popup__close-icon');
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

//Открытие окна редактирования профиля, значения инпутов берутся со страницы
function openPopupEdit(evt) {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

//Изменяем видимость попапа 
function openPopup(item) {
    item.classList.add('popup_opened');
};

//Для каждого элемента массива выполняем колбэк функцию
function renderList(data) {
    data.forEach((item) => renderItem(item))
};

//Добавление созданных карточек в контейнер
function renderItem(data) {
    cardsContainer.prepend(createCard(data));
};

//Создание карточки и установка слушателей для неё
function createCard(data) {
    const cardElement = cardTemplate.querySelector('.grid-item').cloneNode(true);
    const likeButton = cardElement.querySelector('.grid-item__like');
    const trashButton = cardElement.querySelector('.grid-item__trash');
    const imageView = cardElement.querySelector('.grid-item__photo')

    cardElement.querySelector('.grid-item__title').textContent = data.name;
    imageView.alt = data.name;
    imageView.src = data.link;

    //Переключение лайка 
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('grid-item__like_active');
    });

    //Удаление контента
    trashButton.addEventListener('click', function (evt) {
        let buttonElement = evt.target;
        let cardElement = buttonElement.closest('.grid-item').remove();

    });

    //Вызов окна просмотра и заполнение его контентом нажатого элемента
    imageView.addEventListener('click', function (evt) {
        openPopup(popupView);
        popupView.querySelector('.card__picture').src = `${evt.target.src}`;
        popupView.querySelector('.card__title').textContent = `${evt.target.alt}`;
        popupView.querySelector('.card__title').alt = `${evt.target.alt}`;
    });

    return cardElement;
};

//Добавление контента
function formSubmitHandlerAdd(evt) {
    evt.preventDefault();
    let name = titleInput.value;
    let link = linkInput.value;
    renderItem({
        name,
        link
    });
    titleInput.value = '';
    linkInput.value = '';
    closeButtonHandler(evt);
};

renderList(initialCards);

//Редактирование профиля
function formSubmitHandlerEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeButtonHandler(evt);
};

//Находим ближайший попап для закрытия
function closeButtonHandler(evt) {
    let element = evt.target.closest('.popup');
    closePopup(element);
};

//Закрытие любого попапа
function closePopup(element) {
    element.classList.remove('popup_opened')
};

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', function (evt) {
    openPopup(popupAdd)
});
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);
closeEditFormIcon.addEventListener('click', function (evt) {
    closePopup(popupEdit)
});
closeAddFormIcon.addEventListener('click', function (evt) {
    closePopup(popupAdd)
});
closeViewWindowIcon.addEventListener('click', function (evt) {
    closePopup(popupView)
});
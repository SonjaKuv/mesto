const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeEditForm = popupEdit.querySelector('.popup__close-icon');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add');
const closeAddForm = popupAdd.querySelector('.popup__close-icon');
const cardsContainer = document.querySelector('.grid-elements');
const popupView = document.querySelector('.popup_type_view');
const closeViewWindow = popupView.querySelector('.popup__close-icon');
const closeIcons = [closeEditForm, closeAddForm, closeViewWindow];

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

let formElementEdit = popupEdit.querySelector('.form');
let formElementAdd = popupAdd.querySelector('.form');
let nameInput = formElementEdit.querySelector('.form__input_value_name');
let jobInput = formElementEdit.querySelector('.form__input_value_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let titleInput = formElementAdd.querySelector('.form__input_value_title');
let linkInput = formElementAdd.querySelector('.form__input_value_link');


//Открытие окна редактирования профиля, значения инпутов берутся со страницы
function openPopupEdit() {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

//Открытие окна добавления контента, инпуты пустые
function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
};

//Для каждого элемента массива выполняем колбэк функцию
function renderList(data) {
    data.forEach((item) => renderItem(item))
};

//Данная функция клонирует template-элемент и заполняет его значениями из массива
function renderItem(data) {
    const cardTemplate = document.querySelector('.item-template').content;
    const cardElement = cardTemplate.querySelector('.grid-item').cloneNode(true);
    const likeButton = cardElement.querySelector('.grid-item__like');
    const trashButton = cardElement.querySelector('.grid-item__trash');
    const imageView = cardElement.querySelector('.grid-item__photo')

    cardElement.querySelector('.grid-item__title').textContent = data.name;
    cardElement.querySelector('.grid-item__photo').alt = data.name;
    cardElement.querySelector('.grid-item__photo').src = data.link;

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
        popupView.classList.add('popup_opened');
        popupView.querySelector('.card__picture').src = `${evt.target.src}`;
        popupView.querySelector('.card__title').textContent = `${evt.target.alt}`;
        popupView.querySelector('.card__title').alt = `${evt.target.alt}`;
    });

    //Добавление карточек в контейнер
    cardsContainer.prepend(cardElement);
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
    evt.target.closest('.popup').classList.remove('popup_opened');
};

renderList(initialCards);

//Редактирование профиля
function formSubmitHandlerEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    evt.target.closest('.popup').classList.remove('popup_opened');
};

//Для каждой закрывающей иконки выполняем колбэк функцию 
closeIcons.forEach((item) => closePopup(item));

//Функция закрывает открытый в данный момент времени попап
function closePopup(item) {
    item.addEventListener('click', function (evt) {
        evt.target.closest('.popup').classList.remove('popup_opened');
    });
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);
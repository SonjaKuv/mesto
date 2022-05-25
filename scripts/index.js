const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add');
const closeEditForm = popupEdit.querySelector('.popup__close-icon');
const closeAddForm = popupAdd.querySelector('.popup__close-icon');
const cardsContainer = document.querySelector('.grid-elements');

const initialCards = [
  {
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


//открытие окна редактирования профиля, значения инпутов берутся со страницы
function openPopupEdit() {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};


//открытие окна добавления контента, инпуты пустые
function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
};

//заполняем страницу контентом из массива
function renderList(data) {
data.forEach((item) => renderItem(item))
};

function renderItem(data) {
        const cardTemplate = document.querySelector('.item-template').content;
        const cardElement = cardTemplate.querySelector('.grid-item').cloneNode(true);
        const likeButton = cardElement.querySelector('.grid-item__like');
const trashButton = cardElement.querySelector('.grid-item__trash');

        cardElement.querySelector('.grid-item__title').textContent = data.name;
        cardElement.querySelector('.grid-item__photo').src = data.link;

// переключение лайка 
likeButton.addEventListener('click', function (evt) {
   evt.target.classList.toggle('grid-item__like_active');
}); 


trashButton.addEventListener('click', function (evt) {
let buttonElement = evt.target;
let cardElement= buttonElement.closest('.grid-item').remove();
});

        cardsContainer.prepend(cardElement);
    };

//добавление нового контента на страницу
function formSubmitHandlerAdd(evt) {
    evt.preventDefault();
   let name = titleInput.value;
   let link = linkInput.value;

renderItem({name, link});
titleInput.value = '';
linkInput.value = '';

    closePopupAdd();
};

renderList(initialCards);


//закрытие формы редактирования
function closePopupEdit() {
popupEdit.classList.remove('popup_opened');
};

//
//закрытие формы добавления контента
function closePopupAdd(e) {
popupAdd.classList.remove('popup_opened');
};

//редактируем профиль
function formSubmitHandlerEdit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopupEdit();
};

//работа кнопок
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeEditForm.addEventListener('click', closePopupEdit);
closeAddForm.addEventListener('click', closePopupAdd);
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);
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

class Card {
constructor(data, cardSelector) {
    this._title = data.name;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
}

_getTemplate() {
 const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.grid-item')
    .cloneNode(true);

  return cardElement;
}

/*
_handleOpenPopup() {
    popupImage.src = this._image;
    popupElement.classList.add('popup_is-opened');
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_is-opened');
  }
*/

_setEventListeners() {
      this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    });
popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }



generateCard() {
  this._element = this._getTemplate();
  const imageView = this._element.querySelector('.grid-item__photo');
  this._element.querySelector('.grid-item__title').textContent = this._title;
  imageView.alt = this._name;
  imageView.src = this._link;
    
  return this._element;
  };

};

initialCards.forEach((item) => {
const card = new Card(item, '.item-template');
const cardElement = card.generateCard();

  document.querySelector('.grid-elements').prepend(cardElement);
});

export {initialCards, Card};

/*
//Это нужно переписать в класс
//const cardsContainer = document.querySelector('.grid-elements');
//const cardTemplate = document.querySelector('.item-template').content;
const createCard = (data) => {
  //  const cardElement = cardTemplate.querySelector('.grid-item').cloneNode(true);
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

//Для каждого элемента массива выполняем колбэк функцию
const renderCardsList = (data) => {
    data.forEach((item) => renderCardItem(item))
};

//Добавление созданных карточек в контейнер
const renderCardItem = (data) => {
    cardsContainer.prepend(createCard(data));
};
*/
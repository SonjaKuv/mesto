import {data} from '../scripts/cards.js'

class Card {
constructor(data) {
    this._title = data.name;
    this._name = data.name;
    this._link = data.link;

}

_getTemplate() {
 const cardElement = document
    .querySelector('.item-template')
    .content
    .querySelector('.grid-item')
    .cloneNode(true);

  return cardElement;
}

generateCard() {
  this._element = this._getTemplate();
  this._element.querySelector('.grid-item__title').textContent = this._title;
  this._element.querySelector('.grid-item__photo').alt = this._name;
  this._element.querySelector('.grid-item__photo').src = this._link;
    
  return this._element;
  }

};

data.forEach((item) => {
const card = new Card(item.data);
const cardElement = card.generateCard();
 // Добавляем в DOM
  document.querySelector('.grid-elements').prepend(cardElement);
});

export {Card}

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
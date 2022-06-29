import {
    openPopup,
    closePopup
} from './index.js'

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

const popupView = document.querySelector('.popup_type_view');
const popupViewPicture = popupView.querySelector('.card__picture');
const popupViewText = popupView.querySelector('.card__title');
const cardCloseIcon = popupView.querySelector('.popup__close-icon');

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

    _handleOpenCard() {
        popupViewPicture.src = this._link;
        popupViewText.textContent = this._name;
        popupViewPicture.alt = this._name;
        openPopup(popupView);
    }

    _handleCloseCard() {
        popupViewPicture.src = '';
        popupViewText.textContent = '';
        popupViewPicture.alt = '';
        closePopup(popupView);
    };

    //Переключение лайка
    _toggleLike() {
        const likeButton = this._element.querySelector('.grid-item__like');
        likeButton.classList.toggle('grid-item__like_active');
    };

    //Удаление карточки
    _removeCard() {
        this._element.remove();
    };

    _setEventListeners(imageView) {
        imageView.addEventListener('click', () => {
            this._handleOpenCard();
        });
        cardCloseIcon.addEventListener('click', () => {
            this._handleCloseCard()
        });
        this._element.querySelector('.grid-item__like').addEventListener('click', () => {
            this._toggleLike()
        });
        this._element.querySelector('.grid-item__trash').addEventListener('click', () => {
            this._removeCard()
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        const imageView = this._element.querySelector('.grid-item__photo');
        this._setEventListeners(imageView);
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


export {
    initialCards,
    Card
}
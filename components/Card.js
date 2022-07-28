export default class Card {
    constructor(cardData, cardSelector, handleCardClick, handleCardRemove) {
        this._title = cardData.title;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.grid-item')
            .cloneNode(true);

        return cardElement;
    }

    _toggleLike() {
        this._likeButton.classList.toggle('grid-item__like_active');
    };

    removeCard() {
        this._element.remove();
        this._element = null;
    };

    _setEventListeners() {
        this._cardImage = this._element.querySelector('.grid-item__photo');
        this._likeButton = this._element.querySelector('.grid-item__like');
        this._trashIcon = this._element.querySelector('.grid-item__trash');

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._link);
        });
        this._likeButton.addEventListener('click', () => {
            this._toggleLike()
        });
        this._trashIcon.addEventListener('click', () => {
            this._handleCardRemove()
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._cardTitle = this._element.querySelector('.grid-item__title')
        this._cardTitle.textContent = this._title;
        this._cardImage.alt = this._title;
        this._cardImage.src = this._link;

        return this._element;
    };

};
export default class Card {
    constructor(name, link, cardSelector, handleCardClick) {
        this._title = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._likeBtn.classList.toggle('grid-item__like_active');
    };

    _removeCard() {
        this._element.remove();
    };

    _setEventListeners() {
        this._cardImage = this._element.querySelector('.grid-item__photo');
        this._likeBtn = this._element.querySelector('.grid-item__like');
        this._trashIcon = this._element.querySelector('.grid-item__trash');

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
        this._likeBtn.addEventListener('click', () => {
            this._toggleLike()
        });
        this._trashIcon.addEventListener('click', () => {
            this._removeCard()
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
export default class Card {
  constructor(
    { name, link, _id, likes },
    cardSelector,
    handleCardClick,
    openPopupDeleteCard,
    handleDeleteCard,
    handleLikeIconClick,
    handleAddCard,
  ) {
    this._title = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIconClick = handleLikeIconClick;
    this._handleAddCard = handleAddCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid-item")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._handleLikeIconClick(this._id, this.isLiked)
      .then((res) => {
        this._likeButton.classList.toggle("grid-item__like_active");
        this.isLiked = !this.isLiked;
        this._likesNumber.textContent = res.this._likes.length;
        console.log(this._likes.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeCard() {
    this._handleDeleteCard(this._id)
      .then((res) => {
        this._element.remove();
        this._element = null;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".grid-item__photo");
    this._likeButton = this._element.querySelector(".grid-item__like");
    this._trashIcon = this._element.querySelector(".grid-item__trash");
    this._likesNumber = this._element.querySelector('.grid-item__likes-number');

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });
    this._trashIcon.addEventListener("click", () => {
      this._openPopupDeleteCard(this._id);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardTitle = this._element.querySelector(".grid-item__title");
    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;
    this._likesNumber.textContent = this._likes.length;

    return this._element;
  }
}

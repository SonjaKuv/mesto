export default class Card {
  constructor({
    data,
    cardSelector,
    handleCardClick,
    handleDeleteIconClick,
    handleLikeIconClick,
    profileId,
  }) {
    this._title = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeIconClick = handleLikeIconClick;
    this._profileId = profileId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid-item")
      .cloneNode(true);

    return cardElement;
  }

  _checkLikesAuthor() {
    if (this._likes.some((user) => user._id === this._profileId)) {
      this._likeButton.classList.add("grid-item__like_active");
    }
  }

  _checkCardAuthor() {
    if (this._ownerId !== this._profileId) {
      this._trashIcon.classList.remove("grid-item__trash");
    }
  }

  _toggleLike = () => {
    this._handleLikeIconClick(this._id, this.isLiked, this._likesNumber);
    this._likeButton.classList.toggle("grid-item__like_active");
    this.isLiked = !this.isLiked;
    console.log('aaa')
  };

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".grid-item__photo");
    this._likeButton = this._element.querySelector(".grid-item__like");
    this._trashIcon = this._element.querySelector(".grid-item__trash");
    this._likesNumber = this._element.querySelector(".grid-item__likes-number");

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._trashIcon.addEventListener("click", () => {
      this._handleDeleteIconClick(this);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._checkLikesAuthor();
    this._checkCardAuthor();
    this._cardTitle = this._element.querySelector(".grid-item__title");
    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;
    this._likesNumber.textContent = this._likes.length;

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  updateLikeStatus(likesNumber, likesAmount) {
    this._likesNumber = likesNumber;
    this._likesNumber.textContent = likesAmount;
  }
}

export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    cardSelector,
    handleCardClick,
    handleDeleteIconClick,
    handleLikeIconClick,
    profileId
  ) {
    this._title = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._ownerId = owner._id
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

  removeCard() {
    this._element.remove();
    this._element = null;
  }

_toggleLike = () => {
 //this._likeButton.classList.toggle('grid-item__like_active');
 this.isLiked = !this.isLiked;
        this._likesNumber.textContent = this._likes.length;
        this._handleLikeIconClick(this._id, this.isLiked);
      }

  updateLikeStatus(data) {
    this._likesNumber.textContent = data.length;
  }

  _checkLikesAuthor() {
    if (this._likes.some(user => user._id === this._profileId)) {
      this._likeButton.classList.add('grid-item__like_active');
    }
  }

  _checkCardAuthor() {
    if (this._ownerId !== this._profileId) {
      this._trashIcon.classList.remove("grid-item__trash");
    }
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".grid-item__photo");
    this._likeButton = this._element.querySelector(".grid-item__like");
    this._trashIcon = this._element.querySelector(".grid-item__trash");
    this._likesNumber = this._element.querySelector(".grid-item__likes-number");

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
    this._likeButton.addEventListener("click", () => {
      this._toggleLike()
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
}

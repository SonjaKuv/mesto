import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector(".card__picture");
    this._cardTitle = this._popup.querySelector(".card__title");
  }
  open(title, link) {
    super.open();
    this._title = title;
    this._link = link;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
  }
}

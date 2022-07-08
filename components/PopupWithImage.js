import Popup from '../components/Popup.js'

export default class popupWithImage extends Popup {
constructor(name, link) {
this._title = name;
this._link = link;
super.open();
}
_open() {
  this._popupTitle = this._element.querySelector('.grid-item__title');
  this._popupImage = this._element.querySelector('.grid-item__photo');
  this._popupImage = this._element.querySelector('.grid-item__photo');
  this._popupTitle.textContent = this._title;
  this._popupImage.alt = this._name;
  this._popupImage.src = this._link;
}
}
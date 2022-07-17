import Popup from '../components/Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._name = name;
        this._link = link;
        this._cardImage = this._popup.querySelector('.card__picture');
        this._cardTitle = this._popup.querySelector('.card__title');
    }
    open() {
        super.open()
        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;
        this._cardImage.alt = this._name;
    }
}
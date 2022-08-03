import Popup from '../components/Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor({popupSelector, handleCardDelete}) {
        super(popupSelector);
        this._handleCardDelete = handleCardDelete;
    }

    open() {
        super.open();
        this._setEventListeners();
    }

    _setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler)
    }

    _submitHandler = (evt) => {
        evt.preventDefault();
        this._handleCardDelete();
        super.close()
    }
}
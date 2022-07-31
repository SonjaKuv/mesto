import Popup from '../components/Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleCardDelete }) {
        super(popupSelector);
        this._handleCardDelete = handleCardDelete;
    }

    setEventListeners(id) {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler)
    }

    _submitHandler = (evt, id) => {
        evt.preventDefault();
        this._handleCardDelete(id);
        super.close()
    }
}
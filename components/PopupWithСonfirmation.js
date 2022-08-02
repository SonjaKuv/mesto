import Popup from '../components/Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor({popupSelector}) {
        super(popupSelector);
    }

   _handleCardDelete = (id) => {
       
   }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler)
    }

    _submitHandler = (evt, id) => {
        evt.preventDefault();
        this._handleCardDelete(id);
        super.close()
    }
}
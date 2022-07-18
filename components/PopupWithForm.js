import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._form = this._popup.querySelector('.form');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input] = input.value;
        });
        return this._formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler)
    }

    _submitHandler = (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close()
    }

    close() {
        super.close();
        this._form.reset();
    }
}


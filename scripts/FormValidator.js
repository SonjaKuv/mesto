const validConsts = {

    formElement: '.form',
    inputElement: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButton: 'form__submit-button_invalid',
    inputError: 'form__input_type_error',
    errorClass: 'form__error-message',
};

class FormValidator {
    constructor(validConsts, formElement) {
        this._config = validConsts;
        this._form = formElement;
        this._inputList = Array.from(document.querySelectorAll(this._config.inputElement));
        this._inputElement = this._form.querySelector(this._config.inputElement);
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);

    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._config.inactiveButton);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._config.inactiveButton);
            this._submitButton.disabled = false;
        }
    };

    _setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._toggleButtonState(this._inputList);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState(this._inputList);
            });
        });
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError(inputElement) {
        inputElement.classList.add(this._config.inputError);
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };


    _hideInputError(inputElement) {
        inputElement.classList.remove(this._config.inputError);
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            if (inputElement.classList.contains(this._config.inputError)) {
                this._hideInputError(inputElement);
            }
            this._toggleButtonState(this._inputList)
        })
    };

    enableValidation() {
        this._setEventListeners();
    };
}

export {
    FormValidator,
    validConsts,
};

const validConsts = {

    formElement: '.form',
    inputElement: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButton: 'form__submit-button_invalid',
    inputError: 'form__input_type_error',
    errorClass: 'form__error-message'
};

class FormValidator {
    constructor(validConsts, formElement) {
        this._config = validConsts;
        this._form = formElement;
        this._inputList = Array.from(document.querySelectorAll(this._config.inputElement));
        const inputElement = document.querySelector(this._config.inputElement);
        this._submitButton = document.querySelector(this._config.submitButtonSelector);
        this._errorElement = document.querySelector(`.${inputElement.id}-error`);

    }

    //Активация-дизактивация кнопки submit
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._submitButton.classList.add(this._config.inactiveButton);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._config.inactiveButton);
            this._submitButton.disabled = false;
        }
    };

    //Добавляем слушатели для всех инпутов
    _setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();});
        this._toggleButtonState(this._inputList, this._submitButton);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState(this._inputList, this._submitButton);
            });
        });
    };

    //Проверка валидации инпутов при работе с формой
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(this._form, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError(inputElement, errorMessage) {
        inputElement.classList.add(this._config.inputError);
        this._errorElement.classList.add(this._config.errorClass);
        this._errorElement.textContent = errorMessage;
    };


    _hideInputError(inputElement) {
        inputElement.classList.remove(this._config.inputError);
        this._errorElement.classList.remove(this._config.errorClass);
        this._errorElement.textContent = '';
    };

    //Проверяем, что все инпуты валидны
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    //Проверяем валидацию инпутов, перед началом работы с формой
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            if (inputElement.classList.contains(this._config.inputError)) {
                this._hideInputError(inputElement);
            }
        })
    };

    //Добавляем слушатели для всех форм (включаем валидацию)
    enableValidation() {
            this._setEventListeners(this._form);
        };
}
/*
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
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
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState(this._inputList);
            });
        });
    };

    _checkInputValidity() {
        if (!this._inputElement.validity.valid) {
            this._showInputError(this._inputElement);
        } else {
            this._hideInputError(this._inputElement);
        }
    };

    _showInputError() {
        this._inputElement.classList.add(this._config.inputError);
        this._errorElement.classList.add(this._config.errorClass);
        this._errorElement.textContent = this._inputElement.validationMessage;
    };


    _hideInputError() {
        this._inputElement.classList.remove(this._config.inputError);
        this._errorElement.classList.remove(this._config.errorClass);
        this._errorElement.textContent = '';
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    resetValidation() {
      //this._toggleButtonState(); 

      this._inputList.forEach((inputElement) => {
if (inputElement.classList.contains(this._config.inputError)) {
                this._hideInputError(inputElement);
this._toggleButtonState();
            }
      });

    }

    enableValidation() {
            this._setEventListeners(this._form);
    };

};

*/
export {
    FormValidator,
    validConsts, 
};

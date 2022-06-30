const validConsts = {

    formElement: '.form',
    inputElement: '.form__input',
    buttonElementSelector: '.form__submit-button',
    inactiveButton: 'form__submit-button_invalid',
    inputError: 'form__input_type_error',
    errorClass: 'form__error-message'
};

const formList = Array.from(document.querySelectorAll(validConsts.formElement));

class FormValidator {
    constructor(validConsts) {
        this._config = validConsts;
    }

    //Активация-дизактивация кнопки submit
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._config.inactiveButton);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._config.inactiveButton);
            buttonElement.disabled = false;
        }
    };

    //Добавляем слушатели для всех инпутов
    _setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(this._config.inputElement));
        const buttonElement = formElement.querySelector(this._config.buttonElementSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement)
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    //Проверка валидации инпутов при работе с формой
    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputError);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = errorMessage;
    };


    _hideInputError = (inputElement) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputError);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    //Проверяем, что все инпуты валидны
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    //Проверяем валидацию инпутов, перед началом работы с формой
   validatePopupInputs() {
        const inputList = Array.from(document.querySelectorAll(this._config.inputElement));
        const buttonElement = document.querySelector(this._config.buttonElementSelector);
        inputList.forEach((inputElement) => {
            if (inputElement.classList.contains(this._config.inputError)) {
                this._hideInputError(inputElement)
            }
        })
        this._toggleButtonState(inputList, buttonElement);
    };

    //Добавляем слушатели для всех форм (включаем ввалидацию)
    enableValidation() {
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    };

};

formList.forEach((formElement) => {
    formElement = new FormValidator(validConsts);
    formElement.enableValidation(); 
    formElement.validatePopupInputs();
});

export {FormValidator, validConsts};

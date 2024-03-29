export default class FormValidator {
    constructor(validConsts, formElement) {
      this._config = validConsts;
      this._form = formElement;
      this._inputList = Array.from(
        this._form.querySelectorAll(this._config.inputElement)
      );
      this._submitButton = this._form.querySelector(
        this._config.submitButtonSelector
      );
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._config.inactiveButton);
        this._submitButton.disabled = true;
      } else {
        this._submitButton.classList.remove(this._config.inactiveButton);
        this._submitButton.disabled = false;
      }
    }
  
    _setEventListeners() {
      this._toggleButtonState();
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _showInputError(inputElement) {
      inputElement.classList.add(this._config.inputError);
      const errorElement = document.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.add(this._config.errorClass);
      errorElement.textContent = inputElement.validationMessage;
    }
  
    _hideInputError(inputElement) {
      inputElement.classList.remove(this._config.inputError);
      const errorElement = document.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = "";
    }
  
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
    resetValidation() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    }
  
    enableValidation() {
      this._setEventListeners();
    }
  }
  
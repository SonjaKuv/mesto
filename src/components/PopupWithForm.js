import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".form__input");
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._popup.querySelector(".form__submit-button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._submitHandler);
  }

  _submitHandler = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  renderLoading = (isLoading, loadingText = "Сохранение...") => {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  };

  close() {
    super.close();
    this._form.reset();
  }
}

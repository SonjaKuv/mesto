import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
constructor(popupSelector, handleFormSubmit) {
super(popupSelector);
this._handleFormSubmit = handleFormSubmit;
super.setEventListeners();
super.close();
}

_getInputValues() {

}

setEventListeners() {
this._submitButton.addEventListener('submit', () => {
this._handleFormSubmit()
})
}

//нужен еще ресет формы
close() {

}

}
import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
constructor({popupSelector, handleFormSubmit}) {
super(popupSelector);
this._handleFormSubmit = handleFormSubmit;
this._inputList = this._popup.querySelectorAll('.popup');
}

_getInputValues() {
this._inputValues = {};
this._inputList.forEach((input) => {
this._inputValues[input] = input.value;
});
return this._inputValues
}

setEventListeners() {
super.setEventListeners();
this._popup.addEventListener('submit', (evt) => {
evt.preventDefault();
this._handleFormSubmit(this._getInputValues());
this.close()
})
}

//нужен еще ресет формы
close() {
super.close();
this._form = this._popup.querySelector('.form')
this._form.reset();
console.log('a')
}
}
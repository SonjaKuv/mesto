export default class Popup {
constructor(popupSelector) {
this._popup = popupSelector;
this._popupList = Array.from(document.querySelectorAll('.popup'));
this._closeIcon = document.querySelector('.popup__close-icon')
};

_handleEscClose(evt) {
    this._popupList.forEach((popup) => {
        if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
            close(popup);
        }
    });
};

setEventListeners() {
this._closeIcon.addEventListener('mousedown', () => {
 this.close()
})
};

open() {
this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
 this._handleEscClose(evt)
})
};

close() {
this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
 this._handleEscClose(evt)
})
};

}

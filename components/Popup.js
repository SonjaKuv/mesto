export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._popupList = Array.from(document.querySelectorAll('.popup'));
    };

    _handleEscClose(evt) {
this._popupList.forEach((popup) => {
            if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
                this.close();
console.log(popup)
            }})
        };

    setEventListeners() {
        this._closeIcon = this._popup.querySelector('.popup__close-icon')
        this._closeIcon.addEventListener('click', () => {
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
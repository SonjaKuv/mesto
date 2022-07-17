export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._popupList = Array.from(document.querySelectorAll('.popup'));
    };


    _handleEscClose = (evt) => {
        if (evt.key === 'Escape' && this._popup.classList.contains('popup_opened')) {
            this.close();
        }
    };

    _closeByOverlay = (evt) => {
        if (evt.target.classList.contains('popup_opened') ||
            evt.target.classList.contains('popup__close-icon')) {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._closeByOverlay)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}
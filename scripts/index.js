const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-icon');
const saveButton = popup.querySelector('.form__save-button');

let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_value_name');
let jobInput = formElement.querySelector('.form__input_value_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');


function callPopup() {
if (popup.classList.contains('popup_opened')) {
popup.classList.remove('popup_opened')}
else {
popup.classList.add('popup_opened')}
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

editButton.addEventListener('click', callPopup);
closeButton.addEventListener('click', callPopup);
saveButton.addEventListener('click', callPopup);

formElement.addEventListener('submit', formSubmitHandler);
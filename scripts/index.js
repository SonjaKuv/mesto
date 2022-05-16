const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-icon');

let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_value_name');
let jobInput = formElement.querySelector('.form__input_value_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');


function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
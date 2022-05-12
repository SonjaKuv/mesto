const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-icon');


function togglePopup() {
    popup.classList.toggle('popup_opened')
}
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);


let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__item-name');
let jobInput = formElement.querySelector('.form__item-job');

console.log(nameInput.value);
console.log(jobInput.value);


function formSubmitHandler(evt) {
    evt.preventDefault();

    console.log(nameInput.value);
    console.log(jobInput.value);

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__description');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);
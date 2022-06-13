
const checkInputValidity = (formElement, inputElement, validConsts) => {
  if (!inputElement.validity.valid) {
console.log('a')
    showInputError(formElement, inputElement, inputElement.validationMessage, validConsts);
  } else {
    hideInputError(formElement, inputElement, validConsts);
  }
};

const showInputError = (formElement, inputElement, errorMessage, validConsts) => {
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validConsts.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validConsts.errorClass);
};

const hideInputError = (formElement, inputElement, validConsts) => {
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validConsts.inputError);
  errorElement.classList.remove(validConsts.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, validConsts) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validConsts.inactiveButton);
    buttonElement.addAttribute('disabled');
  } else {
    buttonElement.classList.remove(validConsts.inactiveButton);
    buttonElement.removeAttribute('disabled');
  }
}; 

const setEventListeners = (formElement, validConsts) => {
const inputList = Array.from(formElement.querySelectorAll(validConsts.inputElement));
const buttonElement = formElement.querySelector(validConsts.buttonElementSelector);
toggleButtonState(inputList, buttonElement, validConsts);
inputList.forEach((inputElement) => {
inputElement.addEventListener('input', () => {
checkInputValidity(formElement, inputElement, validConsts);
toggleButtonState(inputList, buttonElement, validConsts);
    });
  });
}; 


const enableValidation = (validConsts) => {
  const formList = Array.from(document.querySelectorAll(validConsts.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListeners(formElement, validConsts);
}); 

  };

const validConsts = {

    formElement: '.form',
    inputElement: '.form__input',
    buttonElementSelector: '.form__submit-button',
    inactiveButton: '.form__submit-button_invalid',
    inputError: '.form__input_type_error',
    errorClass: '.form__input-error'
  };
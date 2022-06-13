const validConsts = {

    formElement: '.form',
    inputElement: '.form__input',
    buttonElementSelector: '.form__submit-button',
    inactiveButton: 'form__submit-button_invalid',
    inputError: 'form__input_type_error',
    errorClass: 'form__error-message'
};

const toggleButtonState = (inputList, buttonElement, validConsts) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validConsts.inactiveButton);
        buttonElement.setAttribute('disabled', 'disabled');
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
            checkInputValidity(formElement, inputElement, validConsts)
            toggleButtonState(inputList, buttonElement, validConsts);
        });
    });
};

const checkInputValidity = (formElement, inputElement, validConsts) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validConsts);
    } else {
        hideInputError(formElement, inputElement, validConsts);
    }
};

const showInputError = (formElement, inputElement, errorMessage, validConsts) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validConsts.inputError);
    errorElement.classList.add(validConsts.errorClass);
//    errorElement.textContent = errorMessage;
callErrorMessage(inputElement, errorElement, errorMessage);
};

const callErrorMessage = (inputElement, errorElement, errorMessage) => {
if (inputElement.validity.valueMissing && inputElement.type !== "url") {
errorElement.textContent = 'Вы пропустили это поле.'
} else if (inputElement.type === "url") {
errorElement.textContent = 'Введите адрес сайта.'
} else if (inputElement.validity.tooShort && !inputElement.validity.valueMissing) {
errorElement.textContent = errorMessage
} else if (inputElement.validity.tooLong && !inputElement.validity.valueMissing) {
errorElement.textContent = errorMessage
} else {
errorElement.textContent = ''
}
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

const enableValidation = (validConsts) => {
    const formList = Array.from(document.querySelectorAll(validConsts.formElement));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validConsts);
    });
};

enableValidation(validConsts);



/*
const errorMessage = (inputElement, errorElement) => {
if (inputElement.validity.valueMissing) {
inputElement.setCustomValidity('Вы пропустили это поле.')
} else if (inputElement.classList.contains('form__input_value_link')) {
inputElement.setCustomValidity('Введите адрес сайта.')
} else if (inputElement.validity.tooShort) {
inputElement.setCustomValidity('Минимальное количество символов: ${ element.minLength }. Длина текста сейчас: ${ element.value.length }.')
} else if (inputElement.validity.tooLong) {
inputElement.setCustomValidity('Максимальное количество символов: ${ element.maxLength }. Длина текста сейчас: ${ element.value.length }.')
} else {
inputElement.setCustomValidity('')
}
}
*/
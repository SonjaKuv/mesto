const validConsts = {

    formElement: '.form',
    inputElement: '.form__input',
    buttonElementSelector: '.form__submit-button',
    inactiveButton: 'form__submit-button_invalid',
    inputError: 'form__input_type_error',
    errorClass: 'form__error-message'
};

//Проверяем валидацию инпутов, перед началом работы с формой
const popupValidation = (formElement, validConsts) => {
    const inputList = Array.from(formElement.querySelectorAll(validConsts.inputElement));
    const buttonElement = formElement.querySelector(validConsts.buttonElementSelector);
    inputList.forEach((inputElement) => {
        if (inputElement.classList.contains(validConsts.inputError)) {
            hideInputError(formElement, inputElement, validConsts)
        }
    })
    toggleButtonState(inputList, buttonElement, validConsts);
};

//Активация-дизактивация кнопки submit
const toggleButtonState = (inputList, buttonElement, validConsts) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validConsts.inactiveButton);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(validConsts.inactiveButton);
        buttonElement.removeAttribute('disabled');
    }
};

//Добавляем слушатели для всех инпутов
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

//Проверка валидации инпутов при работе с формой
const checkInputValidity = (formElement, inputElement, validConsts) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validConsts);
    } else {
        hideInputError(formElement, inputElement, validConsts);
    }
};

//Вызов ошибки
const showInputError = (formElement, inputElement, errorMessage, validConsts) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validConsts.inputError);
    errorElement.classList.add(validConsts.errorClass);
    callErrorMessage(inputElement, errorElement, errorMessage);
};

//Условия для вывода ошибки
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

//Скрытие ошибки
const hideInputError = (formElement, inputElement, validConsts) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validConsts.inputError);
    errorElement.classList.remove(validConsts.errorClass);
    errorElement.textContent = '';
};

//Проверяем, что все инпуты валидны
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//Добавляем слушатели для всех форм
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
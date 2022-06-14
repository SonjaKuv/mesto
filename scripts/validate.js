const validConsts = {

    formElement: '.form',
    inputElement: '.form__input',
    buttonElementSelector: '.form__submit-button',
    inactiveButton: 'form__submit-button_invalid',
    inputError: 'form__input_type_error',
    errorClass: 'form__error-message'
};

//Проверяем валидацию инпутов, перед началом работы с формой
const validatePopupInputs = (formElement, validConsts) => {
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
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validConsts.inactiveButton);
        buttonElement.disabled = false;
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
    errorElement.textContent = errorMessage;
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

//Добавляем слушатели для всех форм (включаем ввалидацию)
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
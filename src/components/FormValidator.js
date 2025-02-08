export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    if (!this._buttonElement || this._inputList.length === 0) {
      throw new Error(
        "FormValidator: Invalid form structure or missing elements."
      );
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorElement) return;

    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorElement) return;

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (input) => !input.validity.valid
    );
    this._buttonElement.disabled = hasInvalidInput;
    this._buttonElement.classList.toggle(
      this._settings.inactiveButtonClass,
      hasInvalidInput
    );
  }

  disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((input) => this._hideInputError(input));
  }

  enableValidation() {
    this._setEventListeners();
  }
}

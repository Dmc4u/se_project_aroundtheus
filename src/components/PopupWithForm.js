// PopupWithForm.js
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  // Get form data
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Set input values dynamically
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name] || "";
    });
  }

  // Return form element
  getForm() {
    return this._form;
  }

  // Set event listeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputData = this._getInputValues();
      this._handleSubmit(inputData);
    });
  }

  // Close the popup
  close() {
    super.close();
    this._form.reset();
  }
}

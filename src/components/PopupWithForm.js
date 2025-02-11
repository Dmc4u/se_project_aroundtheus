import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    this._submitButton = this._form.querySelector(".popup__button");
    this._defaultButtonText = this._submitButton.textContent; // Store default text
  }

  // Get form data
  _getInputValues() {
    return this._inputList.reduce((values, input) => {
      values[input.name] = input.value;
      return values;
    }, {});
  }

  // Set input values dynamically
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name] || "";
    });
  }

  // Handle form submission with loading state
  _handleFormSubmit(event) {
    event.preventDefault();
    this._toggleLoadingState(true);

    const inputData = this._getInputValues();
    console.log("Input data:", inputData); // Debugging log

    const result = this._handleSubmit(inputData);
    console.log("Submit result:", result); // Debugging log

    if (result && typeof result.then === "function") {
      result
        .then(() => this.close())
        .catch((err) => console.error("Error submitting form:", err))
        .finally(() => {
          this._toggleLoadingState(false);
        });
    } else {
      console.error("Submit callback did not return a promise");
      this._toggleLoadingState(false);
    }
  }

  // Toggle button loading state
  _toggleLoadingState(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Saving..."
      : this._defaultButtonText;
    this._submitButton.disabled = isLoading;
  }

  // Set event listeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleFormSubmit.bind(this));
  }

  // Reset form before closing
  resetForm() {
    this._form.reset();
  }

  // Close the popup
  close() {
    super.close();
    this.resetForm();
  }
}

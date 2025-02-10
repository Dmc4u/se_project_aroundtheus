import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__confirm");
    this._handleSubmit = null; // Ensure a default value
  }

  setSubmitAction(action) {
    if (typeof action === "function") {
      this._handleSubmit = action;
    } else {
      console.error(
        "PopupWithConfirmation: setSubmitAction must be a function"
      );
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleSubmit) {
        this._toggleLoadingState(true);
        Promise.resolve(this._handleSubmit())
          .then(() => this.close())
          .catch((err) => console.error("Error processing request:", err))
          .finally(() => this._toggleLoadingState(false));
      } else {
        console.error("PopupWithConfirmation: No submit action set");
      }
    });
  }

  _toggleLoadingState(isLoading) {
    this._confirmButton.textContent = isLoading ? "Processing..." : "Yes";
    this._confirmButton.disabled = isLoading;
  }
}

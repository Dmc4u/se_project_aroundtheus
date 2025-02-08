export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    if (!this._popup) {
      throw new Error(`Popup with selector "${popupSelector}" not found.`);
    }

    this._boundHandleEscClose = this._handleEscClose.bind(this);
    this._confirmButton = this._popup.querySelector(".popup__confirm"); // Add confirm button reference
  }

  open(confirmAction = null) {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._boundHandleEscClose);

    // Store delete function for later execution
    if (confirmAction) {
      this._confirmAction = confirmAction;
    }
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._boundHandleEscClose);
    this._confirmAction = null; // Reset action to prevent accidental reuse
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup_opened") ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });

    // Handle confirm button click
    if (this._confirmButton) {
      this._confirmButton.addEventListener("click", () => {
        if (this._confirmAction) {
          this._confirmAction(); // Execute stored delete function
          this.close();
        }
      });
    }
  }
}

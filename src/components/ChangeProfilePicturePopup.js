import Popup from "./Popup.js";

class ChangeProfilePicturePopup extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);

    if (!this._popupElement) {
      console.error(
        `ChangeProfilePicturePopup: Element "${popupSelector}" not found.`
      );
      return;
    }

    this._form = this._popupElement.querySelector(".popup__form");
    this._input = this._popupElement.querySelector(".popup__input_type_url");
    this._submitButton = this._popupElement.querySelector(".popup__button");
    this._defaultButtonText = this._submitButton.textContent; // Store default button text
    this._handleFormSubmit = handleFormSubmit;
    this._errorElement = this._popupElement.querySelector(
      ".popup__error-message"
    );
  }

  _getInputValues() {
    return { avatar: this._input.value };
  }

  showError(message) {
    if (this._errorElement) {
      this._errorElement.textContent = message;
      this._errorElement.style.display = "block";
    }
  }

  _toggleLoadingState(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    if (!this._popupElement) return;

    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._toggleLoadingState(true);

      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error("Error updating profile picture:", err);
          this.showError("Failed to update profile picture. Please try again.");
        })
        .finally(() => {
          this._toggleLoadingState(false);
        });
    });
  }

  resetForm() {
    this._form.reset();
    if (this._errorElement) {
      this._errorElement.textContent = "";
      this._errorElement.style.display = "none";
    }
  }

  close() {
    if (this._popupElement) {
      super.close();
      this.resetForm();
    }
  }
}

export default ChangeProfilePicturePopup;

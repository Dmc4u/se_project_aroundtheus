import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");

    if (!this._popupImage || !this._popupCaption) {
      throw new Error(
        `PopupWithImage: Required elements not found in "${popupSelector}".`
      );
    }
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}

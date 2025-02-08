export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  ) {
    this._id = _id; // Ensure ID is correctly assigned
    this._name = name;
    this._link = link;
    this._isLiked = isLiked; // Store isLiked as a boolean
    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  getId() {
    return this._id; // Ensure we return a valid ID
  }

  isLiked() {
    return this._isLiked; // Return boolean isLiked state
  }

  updateLikesView(isLikedFromAPI) {
    this._isLiked = isLikedFromAPI; // Update internal like state
    this._likeButton.classList.toggle(
      "card__like-button_active",
      this._isLiked
    );
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this, this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.updateLikesView(this._isLiked); // Ensure like state is reflected on load
    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove(); // Removes the card element from the DOM
    this._element = null; // Nullifies the reference to ensure it's fully cleaned up
  }
}

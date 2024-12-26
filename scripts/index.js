// Initial Card Data
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// DOM Selectors
const popups = document.querySelectorAll(".popup");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addCardPopup = document.querySelector("#add-card-popup");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const profileEditPopup = document.querySelector("#edit-profile-popup");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const picturePopup = document.querySelector("#picture-popup");
const picturePopupImage = picturePopup.querySelector(".popup__image");
const picturePopupCaption = picturePopup.querySelector(".popup__caption");

// Utility Functions
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
};

const handleEscClose = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) closePopup(openedPopup);
  }
};

const handleOverlayClick = (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});

function createCard({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Set content
  cardImageEl.src = link;
  cardImageEl.alt = name;
  cardTitleEl.textContent = name;

  // Add event listeners
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPicturePopup(link, name);
  });

  return cardElement;
}

function renderCard(cardData) {
  cardListEl.prepend(createCard(cardData));
}

function openPicturePopup(imageSrc, imageAlt) {
  picturePopupImage.src = imageSrc;
  picturePopupImage.alt = imageAlt;
  picturePopupCaption.textContent = imageAlt;
  openPopup(picturePopup);
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const newCardData = { name: cardTitleInput.value, link: cardUrlInput.value };
  renderCard(newCardData);
  addCardForm.reset();
  closePopup(addCardPopup);
}

function populateProfileEditForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
}

// Event Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
document
  .querySelector("#edit-profile-button")
  .addEventListener("click", populateProfileEditForm);
document
  .querySelector("#close-edit-profile-popup")
  .addEventListener("click", () => closePopup(profileEditPopup));

document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => openPopup(addCardPopup));
document
  .querySelector("#close-add-card-popup")
  .addEventListener("click", () => closePopup(addCardPopup));
addCardForm.addEventListener("submit", handleAddCardSubmit);

picturePopup
  .querySelector(".popup__close_type_picture")
  .addEventListener("click", () => closePopup(picturePopup));

// Initial Card Rendering
initialCards.forEach(renderCard);

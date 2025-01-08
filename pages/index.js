// Import Classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

// Settings for Form Validation
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidators = {};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// DOM Selectors
const popups = document.querySelectorAll(".popup");
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

// Add listener to each popup for overlay click
popups.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});

// Handle Card Image Click
const handleImageClick = ({ name, link }) => {
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  picturePopupCaption.textContent = name;
  openPopup(picturePopup);
};

// Create Card
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
};

// Render Card
const renderCard = (cardData, method = "prepend") => {
  const cardElement = createCard(cardData);
  cardListEl[method](cardElement);
};

// Event Handlers
const handleProfileEditSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
};

const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const newCardData = { name: cardTitleInput.value, link: cardUrlInput.value };
  renderCard(newCardData);
  addCardForm.reset(); // Clear the form
  formValidators[addCardForm.getAttribute("name")].disableButton(); // Disable submit button
  closePopup(addCardPopup);
};

const populateProfileEditForm = () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
};

// Universal Close Button Handler
document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Event Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
document
  .querySelector("#edit-profile-button")
  .addEventListener("click", populateProfileEditForm);
document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => openPopup(addCardPopup));
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Initial Card Rendering
initialCards.forEach((cardData) => renderCard(cardData, "append"));

// Initialize Form Validation
enableValidation(settings);

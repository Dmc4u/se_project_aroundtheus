import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import "./index.css";

// Cache DOM elements
const profileEditButton = document.querySelector("#edit-profile-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Helper function to create a card
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", (data) =>
    imagePopup.open(data)
  );
  return card.generateCard();
};

// Initialize form validators
const formValidators = {};
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    if (formName) {
      formValidators[formName] = validator;
    } else {
      console.warn("Form missing 'name' attribute:", form);
    }
    validator.enableValidation();
  });
};

// Instantiate classes
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#picture-popup");
imagePopup.setEventListeners();

const addCardPopupInstance = new PopupWithForm(
  "#add-card-popup",
  (inputData) => {
    const cardElement = createCard(inputData);
    section.addItem(cardElement);
    formValidators["add-card-form"].disableButton(); // Disable button after submission
    addCardPopupInstance.close();
  }
);
addCardPopupInstance.setEventListeners();

const profileEditPopupInstance = new PopupWithForm(
  "#edit-profile-popup",
  (inputData) => {
    userInfo.setUserInfo(inputData);
    profileEditPopupInstance.close();
  }
);
profileEditPopupInstance.setEventListeners();

// Section instance for rendering initial cards
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();

// Event listeners
profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileEditPopupInstance.setInputValues({ name, job });
  profileEditPopupInstance.open();
});

addCardButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation(); // Reset validation state
  addCardPopupInstance.open();
});

// Enable validation
enableValidation(settings);

import api from "./api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import ChangeProfilePicturePopup from "../components/ChangeProfilePicturePopup.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  // ✅ DOM Elements
  const profileEditButton = document.querySelector("#edit-profile-button");
  const addCardButton = document.querySelector("#add-card-button");
  const changeProfilePictureButton = document.querySelector(
    "#change-profile-picture-button"
  );

  // ✅ Instantiate User Info
  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
    avatarSelector: ".profile__image",
  });

  // ✅ Handle like/unlike logic
  const handleLikeCard = (card) => {
    const isLiked = card.isLiked();
    api
      .toggleLike(card.getId(), isLiked)
      .then((updatedCardData) => {
        if (updatedCardData?.isLiked !== undefined) {
          card.updateLikesView(updatedCardData.isLiked);
        } else {
          console.error("Error: Invalid API response.");
        }
      })
      .catch((err) => console.error(`Error updating like status: ${err}`));
  };

  // ✅ Handle card deletion with confirmation popup
  const handleDeleteCard = (card, cardId) => {
    confirmDeletePopup.open(() => {
      api
        .deleteCard(cardId)
        .then(() => card.removeCard())
        .catch((err) => console.error(`Error deleting card: ${err}`));
    });
  };

  // ✅ Helper function to create a card
  const createCard = (cardData) => {
    const card = new Card(
      cardData,
      "#card-template",
      (data) => imagePopup.open(data),
      () => handleDeleteCard(card, cardData._id),
      () => handleLikeCard(card)
    );
    return card.generateCard();
  };

  // ✅ Initialize Form Validators
  const formValidators = {};
  const enableValidation = (config) => {
    document.querySelectorAll(config.formSelector).forEach((form) => {
      const validator = new FormValidator(config, form);
      formValidators[form.getAttribute("name")] = validator;
      validator.enableValidation();
    });
  };

  // ✅ Popup Instances
  const imagePopup = new PopupWithImage("#picture-popup");
  imagePopup.setEventListeners();

  const addCardPopupInstance = new PopupWithForm(
    "#add-card-popup",
    (inputData) => {
      return api
        .addCard(inputData.name, inputData.link)
        .then((newCard) => {
          if (newCard?.name && newCard?.link) {
            section.addItem(createCard(newCard));
            formValidators["add-card-form"].disableButton();
            addCardPopupInstance.close();
          } else {
            throw new Error("Invalid card data received from API");
          }
        })
        .catch((error) => console.error("Error adding card:", error));
    }
  );
  addCardPopupInstance.setEventListeners();

  const profileEditPopupInstance = new PopupWithForm(
    "#edit-profile-popup",
    (inputData) => {
      return api
        .updateUserInfo(inputData.name, inputData.about)
        .then((updatedUser) => {
          userInfo.setUserInfo(updatedUser);
          profileEditPopupInstance.close();
        })
        .catch((err) => {
          console.error("Error updating profile:", err);
          profileEditPopupInstance.showError(
            "Failed to update profile. Please try again."
          );
        });
    }
  );
  profileEditPopupInstance.setEventListeners();

  const confirmDeletePopup = new Popup("#confirm-delete-popup");
  confirmDeletePopup.setEventListeners();

  const changeProfilePicturePopupInstance = new ChangeProfilePicturePopup(
    "#change-profile-picture-popup",
    (inputData) => {
      return api
        .updateUserAvatar(inputData.avatar)
        .then((updatedUser) => {
          userInfo.setUserAvatar(updatedUser.avatar);
          changeProfilePicturePopupInstance.close();
        })
        .catch((err) => {
          console.error("Error updating profile picture:", err);
          changeProfilePicturePopupInstance.showError(
            "Failed to update profile picture."
          );
        });
    }
  );
  changeProfilePicturePopupInstance.setEventListeners();

  // ✅ Section Instance for Cards
  const section = new Section(
    {
      renderer: (cardData) => section.addItem(createCard(cardData)),
    },
    ".cards__list"
  );

  // ✅ Fetch user info and cards on page load
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardData]) => {
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData.avatar);
      section.renderItems(cardData.reverse());
    })
    .catch((err) => console.error("Error loading initial data:", err));

  // ✅ Event Listeners
  profileEditButton.addEventListener("click", () => {
    const { name, about } = userInfo.getUserInfo();
    profileEditPopupInstance.setInputValues({ name, about });
    formValidators["edit-profile-form"].resetValidation();
    profileEditPopupInstance.resetForm();
    profileEditPopupInstance.open();
  });

  addCardButton.addEventListener("click", () => {
    formValidators["add-card-form"].resetValidation();
    addCardPopupInstance.resetForm();
    addCardPopupInstance.open();
  });

  changeProfilePictureButton.addEventListener("click", () => {
    formValidators["change-profile-picture-form"].resetValidation();
    changeProfilePicturePopupInstance.resetForm();
    changeProfilePicturePopupInstance.open();
  });

  // ✅ Enable validation
  enableValidation(settings);
});

import api from "../components/api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const profileEditButton = document.querySelector("#edit-profile-button");
  const addCardButton = document.querySelector("#add-card-button");
  const changeProfilePictureButton = document.querySelector(
    "#change-profile-picture-button"
  );

  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
    avatarSelector: ".profile__image",
  });

  const formValidators = {};
  const enableValidation = (config) => {
    document.querySelectorAll(config.formSelector).forEach((form) => {
      const validator = new FormValidator(config, form);
      formValidators[form.getAttribute("name")] = validator;
      validator.enableValidation();
    });
  };

  const createCard = (cardData) => {
    const card = new Card(
      cardData,
      "#card-template",
      (data) => imagePopup.open(data),
      (cardInstance) => handleDeleteCard(cardInstance, cardData._id),
      () => handleLikeCard(card)
    );
    return card.generateCard();
  };

  const handleLikeCard = (card) => {
    const isLiked = card.isLiked();
    api
      .toggleLike(card.getId(), isLiked)
      .then((updatedCardData) => {
        card.updateLikesView(updatedCardData.isLiked);
      })
      .catch((err) => console.error(`Error updating like status: ${err}`));
  };

  const confirmDeletePopup = new PopupWithConfirmation("#confirm-delete-popup");
  confirmDeletePopup.setEventListeners();

  const handleDeleteCard = (card, cardId) => {
    confirmDeletePopup.setSubmitAction(() => {
      api
        .deleteCard(cardId)
        .then(() => {
          card.removeCard();
          confirmDeletePopup.close();
        })
        .catch((err) => console.error(`Error deleting card: ${err}`));
    });
    confirmDeletePopup.open();
  };

  const imagePopup = new PopupWithImage("#picture-popup");
  imagePopup.setEventListeners();

  const addCardPopupInstance = new PopupWithForm(
    "#add-card-popup",
    (inputData) => {
      return api.addCard(inputData.name, inputData.link).then((newCard) => {
        section.addItem(createCard(newCard));
      });
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
        });
    }
  );
  profileEditPopupInstance.setEventListeners();

  const changeProfilePicturePopupInstance = new PopupWithForm(
    "#change-profile-picture-popup",
    (inputData) => {
      return api.updateUserAvatar(inputData.avatar).then((updatedUser) => {
        userInfo.setUserAvatar(updatedUser.avatar);
      });
    }
  );
  changeProfilePicturePopupInstance.setEventListeners();

  const section = new Section(
    {
      renderer: (cardData) => section.addItem(createCard(cardData)),
    },
    ".cards__list"
  );

  Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
    ([userData, cardData]) => {
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData.avatar);
      section.renderItems(cardData.reverse());
    }
  );

  profileEditButton.addEventListener("click", () => {
    profileEditPopupInstance.setInputValues(userInfo.getUserInfo());
    profileEditPopupInstance.open();
  });

  addCardButton.addEventListener("click", () => addCardPopupInstance.open());
  changeProfilePictureButton.addEventListener("click", () =>
    changeProfilePicturePopupInstance.open()
  );

  enableValidation(settings);
});

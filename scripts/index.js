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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const pictureModal = document.querySelector("#picture-modal");
const pictureModalImage = pictureModal.querySelector(".modal__image");
const pictureModalCaption = pictureModal.querySelector(".modal__caption");

// Utility Functions
const openModal = (modal) => modal.classList.add("modal_opened");
const closeModal = (modal) => modal.classList.remove("modal_opened");

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
    openPictureModal(link, name);
  });

  return cardElement;
}

function renderCard(cardData) {
  cardListEl.prepend(createCard(cardData));
}

function openPictureModal(imageSrc, imageAlt) {
  pictureModalImage.src = imageSrc;
  pictureModalImage.alt = imageAlt;
  pictureModalCaption.textContent = imageAlt;
  openModal(pictureModal);
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const newCardData = { name: cardTitleInput.value, link: cardUrlInput.value };
  renderCard(newCardData);
  addCardForm.reset();
  closeModal(addCardModal);
}

function populateProfileEditForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

// Event Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
document
  .querySelector("#edit-profile-button")
  .addEventListener("click", populateProfileEditForm);
document
  .querySelector("#close-edit-profile-modal")
  .addEventListener("click", () => closeModal(profileEditModal));

document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => openModal(addCardModal));
document
  .querySelector("#close-add-card-modal")
  .addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

pictureModal
  .querySelector(".modal__close_type_picture")
  .addEventListener("click", () => closeModal(pictureModal));

// Initial Card Rendering
initialCards.forEach(renderCard);

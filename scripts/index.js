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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// DOM Nodes for Add Card Modal
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector("#add-card-form");

// Input fields for Add Card Form
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector(".modal__input_type_url");

// Wrappers
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileEditForm = profileEditModal.querySelector("#modal__form");

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModalCloseButton = profileEditModal.querySelector("#modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewPlaceButton = document.querySelector(".profile__add-button");

// Form data
const profileNameInput = document.querySelector(".modal__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".modal__input_type_descrition"
);

// Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  // Add event listener for like button
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Add event listener for delete button
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
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
  const newCardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };

  // Add the new card to the beginning of the card list
  cardListEl.prepend(getCardElement(newCardData));

  // Clear form inputs
  cardTitleInput.value = "";
  cardUrlInput.value = "";

  // Close the modal
  closeModal(addCardModal);
}

// Event Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
addNewPlaceButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Initial Card Rendering
initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});

// DOM Nodes for Picture Modal
const pictureModal = document.querySelector("#picture-modal");
const pictureModalCloseButton = pictureModal.querySelector(
  ".modal__close_type_picture"
);
const pictureModalImage = pictureModal.querySelector(".modal__image");
const pictureModalCaption = pictureModal.querySelector(".modal__caption");

// Function to open picture modal
function openPictureModal(imageSrc, imageAlt) {
  pictureModalImage.src = imageSrc;
  pictureModalImage.alt = imageAlt;
  pictureModalCaption.textContent = imageAlt;
  openModal(pictureModal);
}

// Event Listener for closing picture modal
pictureModalCloseButton.addEventListener("click", () =>
  closeModal(pictureModal)
);

// Add click event listener to cards
cardListEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const cardImage = event.target;
    openPictureModal(cardImage.src, cardImage.alt);
  }
});

// Smooth modal opening and closing.
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

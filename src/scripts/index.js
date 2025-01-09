import '../pages/index.css';
import { createCard, deleteCard, likeCard} from './components/card.js';
import { openModal, closeModal, modalWindow} from './components/modal';
import {enableValidation, clearValidation} from './components/validation';
import { getUserInfo, getCardList, updateUserInfo, saveNewCard, deleteCardOnServer, updateCardLikes, deleteCardLikes, updateAvatar} from './components/api';

const placesList = document.querySelector('.places__list');
const popupCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formEdit = document.forms['edit-profile'];
const formCard = document.forms['new-place'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['edit-avatar'];
let userProfile = {};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

//Карточки
function openPopupImage(link, name) {
    const popupImage = document.querySelector('.popup_type_image');
    openModal(popupImage);
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__image').alt = name;
}

//popup
document.querySelectorAll('.popup').forEach((item)=>{
    item.classList.add('popup_is-animated');
})

editButton.addEventListener('click', ()=> {
    openModal(popupEdit);
    editForm();
    clearValidation(formEdit, validationConfig);
})

addButton.addEventListener('click', ()=> {
    openModal(popupCard);
    clearValidation(formCard, validationConfig);
});

document.querySelectorAll('.popup').forEach ((item)=> {
    item.addEventListener('click', (evt)=> {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closeModal(item);
        }
    });
})

//Формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const nameInput = formEdit.elements.name.value;
    const jobInput = formEdit.elements.description.value;
    document.querySelector('.profile__title').textContent = nameInput;
    document.querySelector('.profile__description').textContent = jobInput;
    closeModal(modalWindow);
}

function createNewCard(evt, data) {
    evt.preventDefault(); 
    const cardInfo =
        {
          name: `${data.name}`,
          link: `${data.link}`,
          likes: `${data.likes}`,
          _id: `${data._id}`,
          owner: {
            _id: userProfile._id,
          },
        };
    const card = createCard(cardInfo, deleteCard, likeCard, openPopupImage, userProfile._id, deleteCardOnServer, updateCardLikes,  deleteCardLikes);
    placesList.prepend(card);
    formCard.reset();
    closeModal(modalWindow);
}

function editForm() {
    formEdit.elements.name.value = profileTitle.textContent;
    formEdit.elements.description.value = profileDescription.textContent;
}

formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formEdit.querySelector('.button').textContent = 'Сохранение...'
    updateUserInfo(profileTitle.textContent, profileDescription.textContent)
    .then(()=> {
        handleProfileFormSubmit(evt);
    })
    .catch((err)=> {
        console.log(err);
    })
    .finally(()=> {
        formEdit.querySelector('.button').textContent = 'Сохранить';
    })
});

formCard.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    formCard.querySelector('.button').textContent = 'Сохранение...'
    saveNewCard(formCard.elements['place-name'].value, formCard.elements.link.value)
    .then((data)=> {
        createNewCard(evt, data);
    })
    .catch((err)=> {
        console.log(err);
    })
    .finally(()=> {
        formCard.querySelector('.button').textContent = 'Сохранить';
    })
    
});
 
enableValidation(validationConfig);

Promise.all([getUserInfo(), getCardList()])
    .then(([user, data])=> {
        userProfile = user;
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.style.backgroundImage = `url(${user.avatar})`;
        const initialCards = data;
        const cardArray = initialCards.map((item)=>{
            return createCard(item, deleteCard, likeCard, openPopupImage, user._id, deleteCardOnServer, updateCardLikes, deleteCardLikes);
        })
        cardArray.forEach(card => {
            placesList.append(card);
        });
})
.catch((err) => {
    console.log(err);
})

profileImage.addEventListener('click', ()=> {
    openModal(popupAvatar);
});

formAvatar.addEventListener('submit', (evt)=> {
    evt.preventDefault(); 
    formAvatar.querySelector('.button').textContent = 'Сохранение...'
    updateAvatar(formAvatar.elements['avatar-link'].value)
    .then(()=>{
        getUserInfo()
        .then(user => {
            profileImage.style.backgroundImage = `url(${user.avatar})`;
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .then(()=> {
        clearValidation(formAvatar, validationConfig);
        formAvatar.elements['avatar-link'].value = '';
        formAvatar.querySelector('.button').textContent = 'Сохранить';
        closeModal(popupAvatar);
    })
    .catch((err)=> {
        console.log(err);
    })
  
})


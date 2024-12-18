import '../pages/index.css';
import {initialCards} from './cards';
import { createCard, deleteCard, likeCard} from './components/card';
import { openModal, closeModal, modalWindow} from './components/modal';

const placesList = document.querySelector('.places__list');
const popupCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formEdit = document.forms['edit-profile'];
const formCard = document.forms['new-place'];

//Карточки
function openPopupImage(evt) {
    const popupImage = document.querySelector('.popup_type_image');
    openModal(popupImage);
    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__image').alt = evt.target.alt;
}

const cardArray = initialCards.map((item)=>{
    return createCard(item, deleteCard, likeCard, openPopupImage);
})

cardArray.forEach(card => {
    placesList.append(card);
});

//popup
document.querySelectorAll('.popup').forEach((item)=>{
    item.classList.add('popup_is-animated');
})
editButton.addEventListener('click', ()=> openModal(popupEdit));
addButton.addEventListener('click', ()=> openModal(popupCard));

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

function createNewCard(evt) {
    evt.preventDefault(); 
    const name = formCard.elements['place-name'].value;
    const link = formCard.elements.link.value;
    const cardInfo =
        {
          name: `${name}`,
          link: `${link}`,
        };
    const card = createCard(cardInfo, deleteCard, likeCard, openPopupImage);
    placesList.prepend(card);
    formCard.reset();
    closeModal(modalWindow);
}

function editForm() {
    formEdit.elements.name.value = document.querySelector('.profile__title').textContent;
    formEdit.elements.description.value = document.querySelector('.profile__description').textContent;
}

formEdit.addEventListener('submit', handleProfileFormSubmit); 
formCard.addEventListener('submit', createNewCard);
editButton.addEventListener('click', editForm);
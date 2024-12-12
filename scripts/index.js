// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardTemplate = document.querySelector('#card-template').content; 
const placesList = document.querySelector('.places__list');

function deleteCard(button) {
    const cardItem = button.closest('.card');
    cardItem.remove();
}


function createCard(item, deleteCard) {
    
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click',() => deleteCard(deleteButton));
    return cardElement;
}

const cardArray = initialCards.map((item)=>{
    return createCard(item, deleteCard);
})

cardArray.forEach(card => {
    placesList.append(card);
});

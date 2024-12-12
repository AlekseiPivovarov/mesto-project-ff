// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


function createDeleteButton(element) {
    let deleteButton = element.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        let cardItem = deleteButton.closest('.card');
        cardItem.remove();
    })
}

function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const placesList = document.querySelector('.places__list');

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    placesList.append(cardElement);
    createDeleteButton(cardElement);
}


initialCards.forEach((item)=>{
    createCard(item.name, item.link);
})
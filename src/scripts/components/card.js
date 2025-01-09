// const cardTemplate = document.querySelector('#card-template').content; 

export function deleteCard(cardId, cardElement, deleteCardOnServer) {
    deleteCardOnServer(cardId)
    .then(cardElement.remove())
    .catch((err)=> {
        console.log(err);
    })
    
}
   
export function likeCard(evt, updateCardLikes, deleteCardLikes, cardID, likeCount) {
    const button = evt.target.closest('.card__like-button');
    if (!button.classList.contains('card__like-button_is-active')) {
        updateCardLikes(cardID)
        .then(card=> {
            likeCount.textContent = card.likes.length;
            button.classList.toggle('card__like-button_is-active');
        })
        .catch((err)=> {
            console.log(err);
        })
    } else {
        deleteCardLikes(cardID)
        .then(card=> {
            likeCount.textContent = card.likes.length;
            button.classList.toggle('card__like-button_is-active');
        })
        .catch((err)=> {
            console.log(err);
        })
    }
}

export function createCard(item, deleteCard, likeCard, openPopupImage, userID, deleteCardOnServer, updateCardLikes, deleteCardLikes) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeCount = cardElement.querySelector('.like-count');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (item.owner._id !== userID) {
        deleteButton.style.display = "none";
    } else {
        deleteButton.addEventListener('click', () => {
            deleteCard(item._id, cardElement, deleteCardOnServer); 
          });
    }
    
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', (evt) => likeCard(evt, updateCardLikes, deleteCardLikes, item._id, likeCount));
    cardImage.addEventListener('click', () => openPopupImage(item.link, item.name));
    likeCount.textContent = item.likes ? item.likes.length : 0;
    if (item.likes) {
        if (item.likes.some(item => item._id === userID)) {
            likeButton.classList.add('card__like-button_is-active');
        }
    }

    return cardElement;
}
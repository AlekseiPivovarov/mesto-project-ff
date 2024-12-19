export let modalWindow = null; 

function closeEsc(evt) {
    if (evt.key === "Escape") { 
        closeModal(modalWindow); 
        modalWindow = null; 
    }
}

export function openModal(item) {
    item.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
    modalWindow = item;
}

export function closeModal(item) {
    item.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
}



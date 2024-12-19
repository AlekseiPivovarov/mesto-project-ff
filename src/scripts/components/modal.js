import { formEdit } from "..";
export let modalWindow = null; 


function closeEsc(evt) {
    if (evt.key === "Escape") { 
        closeModal(modalWindow); 
        modalWindow = null; 
    }
}

function editForm() {
    formEdit.elements.name.value = document.querySelector('.profile__title').textContent;
    formEdit.elements.description.value = document.querySelector('.profile__description').textContent;
}

export function openModal(item) {
    item.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
    modalWindow = item;

    if (item.classList.contains('popup_type_edit')) {
        editForm();
    }

}

export function closeModal(item) {
    item.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
}



const config = {
  baseUrl:"https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "1aa131cc-2862-4b88-baa9-9f6d0e2456b1",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers,
  })
  .then(getResponseData)
};

export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers,
  })
  .then(getResponseData)
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          about: about
      })
  })
  .then(getResponseData);
};

export const saveNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          link: link
      })
  })
  .then(getResponseData);
};

export const deleteCardOnServer = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: config.headers,
  })
  .then(getResponseData)
};

export const updateCardLikes = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: config.headers,
  })
  .then(getResponseData)
};

export const deleteCardLikes = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: config.headers,
  })
  .then(getResponseData)
};

export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: link
      })
  })
  .then(getResponseData);
};
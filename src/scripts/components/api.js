export const getUserInfo = ()=> {
    return fetch('https://nomoreparties.co/v1/cohort-mag-4/users/me', {
        method: 'GET', 
        headers: {
            authorization: '1aa131cc-2862-4b88-baa9-9f6d0e2456b1'
        }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
    }})
    .then((data) => {
      return data;
    })
    .catch((err) => {
        console.log(err); 
      }); 
}

export const getCardList = ()=> {
  return fetch('https://nomoreparties.co/v1/cohort-mag-4/cards', {
    method: 'GET', 
    headers: {
      authorization: '1aa131cc-2862-4b88-baa9-9f6d0e2456b1'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
  }})
  .then((data) => {
      return data;
  })
  .catch((err) => {
        console.log(err); 
  });
}

export const updateUserInfo = (name, about) => {
  return fetch('https://nomoreparties.co/v1/cohort-mag-4/users/me', {
    method: 'PATCH', 
      headers: {
        authorization: '1aa131cc-2862-4b88-baa9-9f6d0e2456b1',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name: name,
        about: about
      })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
  }})
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(err); 
  }); 
}

export const saveNewCard = (name, link)=> {
  return fetch('https://nomoreparties.co/v1/cohort-mag-4/cards', {
    method: 'POST', 
    headers: {
      authorization: '1aa131cc-2862-4b88-baa9-9f6d0e2456b1',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      name: name,
      link: link
    })
    })
  .then(res => {
      if (res.ok) {
        return res.json();
  }})
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(err); 
  }); 
}

export const deleteCardOnServer = (idCard)=> {
  return fetch(`https://nomoreparties.co/v1/cohort-mag-4/cards/${idCard}`, {
    method: 'DELETE', 
    headers: {
      authorization: '1aa131cc-2862-4b88-baa9-9f6d0e2456b1',
    }})
    .catch((err) => {
      console.log(err); 
    }); 
}

export const updateCardLikes = (idCard)=> {
  return fetch(`https://nomoreparties.co/v1/cohort-mag-4/cards/likes/${idCard}`, {
    method: 'PUT', 
    headers: {
      authorization: '1aa131cc-2862-4b88-baa9-9f6d0e2456b1',
    }})
  .then(res => {
    if (res.ok) {
      return res.json();
  }})
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(err); 
  }); 

}

export const deleteCardLikes = (idCard)=> {
  return fetch(`https://nomoreparties.co/v1/cohort-mag-4/cards/likes/${idCard}`, {
    method: 'DELETE', 
    headers: {
      authorization: '1aa131cc-2862-4b88-baa9-9f6d0e2456b1',
    }})
  .then(res => {
    if (res.ok) {
      return res.json();
  }})
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(err); 
  }); 
}

export const updateAvatar = (link)=> {
  return fetch('https://nomoreparties.co/v1/cohort-mag-4/users/me/avatar', {
    method: 'PATCH', 
    headers: {
      authorization: '1aa131cc-2862-4b88-baa9-9f6d0e2456b1',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      avatar: link
    })
  })
  .catch((err) => {
    console.log(err); 
  }); 
}
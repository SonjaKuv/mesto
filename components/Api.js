export default class Api {
    constructor({url, headers}) {
      this._url = url;
      this._headers = headers;
    }

      getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-46/cards', {
          headers: {
            authorization: 'fc76fdb8-e2ba-4757-a444-c4106fd529da'
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
      }

      getUserInfo() {
        return fetch(this._url, this._headers)
    .then(res => res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
    )
}
  
    editProfileInfo(name, about) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-46/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'fc76fdb8-e2ba-4757-a444-c4106fd529da',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
});
    }

    addNewCard( {name, link} ) {
      fetch(this._url, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({name, link})
    })
    .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
  )
    }

    deleteCard(_id) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-46/cards/cardId', {
            method: 'DELETE',
  headers: {
    authorization: 'fc76fdb8-e2ba-4757-a444-c4106fd529da',
      }
        })
    }

    likeCard() {
fetch('https://mesto.nomoreparties.co/v1/cohort-46/cards/cardId/likes', {
    method: 'PUT',
  headers: {
    authorization: 'fc76fdb8-e2ba-4757-a444-c4106fd529da',
      }
})
    }

  deleteCardLike() {
fetch('https://mesto.nomoreparties.co/v1/cohort-46/cards/cardId/likes', {
    method: 'DELETE',
  headers: {
    authorization: 'fc76fdb8-e2ba-4757-a444-c4106fd529da',
      }
})
  }

  setNewAvatar(avatar) {
    fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar', {
        method: 'PATCH',
        headers: {
          authorization: 'fc76fdb8-e2ba-4757-a444-c4106fd529da',
            },
            body: JSON.stringify({
                avatar: ''
              }) 
    })
  }
}
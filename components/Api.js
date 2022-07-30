export default class Api {
    constructor({url, headers}) {
      this._url = url;
      this._headers = headers;
    }

    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
  )
    }

      getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          headers: this._headers
        })
    .then(res => res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
    )
}
  
    editProfileInfo(name, about) {
      return fetch(`${this._url}/users/me`, {
  method: 'PATCH',
  headers: this._headers,
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
});
    }

    addNewCard( {name, link} ) {
      return fetch(`${this._url}/cards`, {
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
      return fetch(`${this._url}/cards/${_id}`, {
        headers: this._headers,
        method: 'DELETE',
    })
    .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
  )
    }

    likeCard() {
return fetch(`${this._url}/cards/${id}/likes`, {
    method: 'PUT',
  headers: this._headers,
})
    }

  deleteCardLike() {
    return fetch(`${this._url}/cards/${id}/likes`, {
    method: 'DELETE',
  headers: this._headers,
})
  }

  setNewAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
            body: JSON.stringify({
                avatar: ''
              }) 
    })
  }
}
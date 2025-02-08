class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  };

  _fetchWithHandling = (url, options) => {
    return fetch(url, options).then(this._handleResponse);
  };

  // ✅ Fetch user info
  getUserInfo = () => {
    return this._fetchWithHandling(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  };

  // ✅ Update user profile info
  updateUserInfo = (name, about) => {
    return this._fetchWithHandling(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  };

  // ✅ Update profile avatar
  updateUserAvatar = (avatar) => {
    return this._fetchWithHandling(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  };

  // ✅ Get all cards
  getInitialCards = () => {
    return this._fetchWithHandling(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  };

  // ✅ Add a new card
  addCard = (name, link) => {
    return this._fetchWithHandling(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  };

  // ✅ Delete a card
  deleteCard = (cardId) => {
    return this._fetchWithHandling(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  };

  // ✅ Toggle like (PUT to like, DELETE to unlike)
  toggleLike = (cardId, isLiked) => {
    return this._fetchWithHandling(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  };
}

// ✅ Initialize API instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6bf5193a-6919-4631-9825-3d61c0e57a1f",
    "Content-Type": "application/json",
  },
});

export default api;

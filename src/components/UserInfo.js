export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = null; // ✅ Store user ID

    if (!this._nameElement || !this._aboutElement || !this._avatarElement) {
      throw new Error("UserInfo: One or more selectors are invalid.");
    }
  }

  // ✅ Method to retrieve user ID
  getUserId() {
    return this._userId;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      about: this._aboutElement.textContent.trim(),
      avatar: this._avatarElement.src || "",
      userId: this._userId, // ✅ Return user ID
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    if (typeof name === "string" && name.trim()) {
      this._nameElement.textContent = name;
    }

    if (typeof about === "string" && about.trim()) {
      this._aboutElement.textContent = about;
    }

    if (typeof avatar === "string" && avatar.trim()) {
      this.setUserAvatar(avatar);
    }

    if (_id) {
      this._userId = _id; // ✅ Store user ID
    }
  }

  setUserAvatar(avatar) {
    if (typeof avatar === "string" && avatar.trim()) {
      this._avatarElement.src = avatar;
    } else {
      console.warn("UserInfo: Invalid avatar URL.");
    }
  }
}

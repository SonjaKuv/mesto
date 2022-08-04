export default class UserInfo {
    constructor(name, about, avatar) {
      this._name = name;
      this._about = about;
      this._avatar = avatar;
    }
  
    getUserInfo() {
      const info = {};
      info.name = this._name.textContent;
      info.about = this._about.textContent;
      info.avatar = this._avatar.src;
      return info;
    }
  
    setUserInfo(newInfo) {
      this._name.textContent = newInfo.name;
      this._about.textContent = newInfo.about;
      this._avatar.src = newInfo.avatar;
    }
  }
  
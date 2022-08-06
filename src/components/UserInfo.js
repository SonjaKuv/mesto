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
  
    setUserInfo( { name, about, avatar} ) {
      this._name.textContent = name;
      this._about.textContent = about;
      this._avatar.src = avatar;
    }
  }
  
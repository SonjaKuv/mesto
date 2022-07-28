export default class UserInfo {
    constructor({ profileName, profileJob, profileAvatar }) {
        this._name = document.querySelector(profileName);
        this._job = document.querySelector(profileJob);
        this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            user: this._name.textContent,
            job: this._job.textContent
          }
    }

    setUserInfo(inputName, inputJob) {
        this._name.textContent = inputName;
        this._job.textContent = inputJob;
        return this._info;

    }

    setProfileAvatar(inputAvatar) {
        this._avatar.src = inputAvatar;
    }
}
export default class UserInfo {
    constructor({ profileName, profileJob }) {
        this._name = document.querySelector(profileName);
        this._job = document.querySelector(profileJob);
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
}
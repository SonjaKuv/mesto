export default class UserInfo {
    constructor({ profileName, profileJob }) {
        this._name = profileName;
        this._job = profileJob;
    }

    getUserInfo(inputName, inputJob) {
        inputName.value = this._name.textContent;
        inputJob.value = this._job.textContent;
        this._info = {
            user: inputName.value,
            job: inputJob.value,
        };
        return this._info
    }

    setUserInfo(inputName, inputJob) {
        this._name.textContent = inputName;
        this._job.textContent = inputJob;
        return this._info;

    }
}
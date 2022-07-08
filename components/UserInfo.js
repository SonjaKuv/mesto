export default class UserInfo {
constructor({profile: name, job}) {
this._name = name;
this._job = job
}
//озвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
getUserInfo() {
return {}
}
//принимает новые данные пользователя и добавляет их на страницу.
setUserInfo(profileName, profileJob) {
profileName = this._name.textContent;
profileJob = this._job.textContent;
}
}
export default class UserInfo {
constructor({profileName, profileJob}) {   //это селекторы инпутов, куда мы вставляем значения
this._name = profileName;
this._job = profileJob;
}
//озвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
getUserInfo() {
this._info = {user: this._name.textContent,
job: this._job.textContent
};
return this._info
}
//принимает новые данные пользователя и добавляет их на страницу.
setUserInfo(inputName, inputJob) {
this._name.textContent = inputName;
this._job.textContent = inputJob;
return this._info;
}
}
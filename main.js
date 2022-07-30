!function(){"use strict";const e={formElement:".form",inputElement:".form__input",submitButtonSelector:".form__submit-button",inactiveButton:"form__submit-button_invalid",inputError:"form__input_type_error",errorClass:"form__error-message"},t=document.querySelector(".profile__edit-button"),r=document.querySelector(".profile__add-button"),s=document.querySelector(".profile__avatar"),i=document.querySelector(".popup_type_edit"),o=document.querySelector(".popup_type_add"),n=document.querySelector(".popup_type_edit-avatar").querySelector(".form"),a=i.querySelector(".form"),l=o.querySelector(".form"),c=a.querySelector(".form__input_value_name"),u=a.querySelector(".form__input_value_job"),_=document.querySelector(".form__input_value_avatar"),h=l.querySelector(".form__input_value_title"),d=l.querySelector(".form__input_value_link"),p=document.querySelector(".profile__name"),m=document.querySelector(".profile__description");class f{constructor(e,t,r,s){let{name:i,link:o}=e;this._title=i,this._link=o,this._cardSelector=t,this._handleCardClick=r,this._handleCardRemove=s}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".grid-item").cloneNode(!0)}_toggleLike(){this._likeButton.classList.toggle("grid-item__like_active")}removeCard(){this._element.remove(),this._element=null}_setEventListeners(){this._cardImage=this._element.querySelector(".grid-item__photo"),this._likeButton=this._element.querySelector(".grid-item__like"),this._trashIcon=this._element.querySelector(".grid-item__trash"),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._title,this._link)})),this._likeButton.addEventListener("click",(()=>{this._toggleLike()})),this._trashIcon.addEventListener("click",(()=>{this._handleCardRemove()}))}generateCard(){return this._element=this._getTemplate(),this._setEventListeners(),this._cardTitle=this._element.querySelector(".grid-item__title"),this._cardTitle.textContent=this._title,this._cardImage.alt=this._title,this._cardImage.src=this._link,this._element}}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class y{constructor(e){v(this,"_handleEscClose",(e=>{"Escape"===e.key&&this.close()})),v(this,"_closeByOverlay",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-icon"))&&this.close()})),this._popup=document.querySelector(e)}setEventListeners(){this._popup.addEventListener("mousedown",this._closeByOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class g extends y{constructor(e){let{popupSelector:t,handleFormSubmit:r}=e;var s,i;super(t),i=e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues()),this.close()},(s="_submitHandler")in this?Object.defineProperty(this,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):this[s]=i,this._handleFormSubmit=r,this._inputList=this._popup.querySelectorAll(".form__input"),this._form=this._popup.querySelector(".form")}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}close(){super.close(),this._form.reset()}}class S{constructor(e,t){this._config=e,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputElement)),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}_toggleButtonState(){this._hasInvalidInput()?(this._submitButton.classList.add(this._config.inactiveButton),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._config.inactiveButton),this._submitButton.disabled=!1)}_setEventListeners(){this._toggleButtonState(),this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){e.classList.add(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.add(this._config.errorClass),t.textContent=e.validationMessage}_hideInputError(e){e.classList.remove(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._config.errorClass),t.textContent=""}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}const b=new S(e,a),E=new S(e,l),L=new S(e,n),k=new class{constructor(e,t){let{renderer:r}=e;this._renderer=r,this._container=document.querySelector(t)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=C(e);k.addItem(t)}},".grid-elements"),C=e=>new f(e,".item-template",I,j).generateCard(),q=new class extends y{constructor(e){super(e),this._cardImage=this._popup.querySelector(".card__picture"),this._cardTitle=this._popup.querySelector(".card__title")}open(e,t){super.open(),this._title=e,this._link=t,this._cardImage.src=this._link,this._cardTitle.textContent=this._title,this._cardImage.alt=this._title}}(".popup_type_view"),I=(e,t)=>{q.open(e,t)};q.setEventListeners();const w=new g({popupSelector:".popup_type_edit-avatar",handleFormSubmit:e=>{e={avatar:_.value},T.setProfileAvatar(e.avatar)}});w.setEventListeners();const B=new g({popupSelector:".popup_type_delete",handleFormSubmit:e=>{new f({},".item-template",I,j).removeCard()}}),j=()=>{B.open()};B.setEventListeners();const V=new g({popupSelector:".popup_type_add",handleFormSubmit:e=>{e={title:h.value,link:d.value},k.addItem(C(e))}});V.setEventListeners();const P=new g({popupSelector:".popup_type_edit",handleFormSubmit:e=>{e={user:c.value,job:u.value},T.setUserInfo(e.user,e.job)}});P.setEventListeners();const T=new class{constructor(e){let{profileName:t,profileJob:r,profileAvatar:s}=e;this._name=document.querySelector(t),this._job=document.querySelector(r),this._avatar=document.querySelector(s)}getUserInfo(){return{user:this._name.textContent,job:this._job.textContent}}setUserInfo(e,t){return this._name.textContent=e,this._job.textContent=t,this._info}setProfileAvatar(e){this._avatar.src=e}}({profileName:".profile__name",profileJob:".profile__description",profileAvatar:".profile__avatar-photo"});t.addEventListener("click",(()=>{c.value=p.textContent,u.value=m.textContent,b.resetValidation(),P.open()})),r.addEventListener("click",(()=>{E.resetValidation(),V.open()})),s.addEventListener("click",(()=>{L.resetValidation(),w.open()})),b.enableValidation(),E.enableValidation(),L.enableValidation();const x=new class{constructor(e){let{url:t,headers:r}=e;this._url=t,this._headers=r}getInitialCards(){return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}getUserInfo(){return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}editProfileInfo(e,t){return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:"Marie Skłodowska Curie",about:"Physicist and Chemist"})})}addNewCard(e){let{name:t,link:r}=e;return fetch(this._url,{headers:this._headers,method:"POST",body:JSON.stringify({name:t,link:r})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}deleteCard(e){return console.log("".concat(this._url,"/cards/").concat(e)),fetch("".concat(this._url,"/cards/").concat(e),{headers:this._headers,method:"DELETE"}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}likeCard(){return fetch("".concat(this._url,"/cards/").concat(id,"/likes"),{method:"PUT",headers:this._headers})}deleteCardLike(){return fetch("".concat(this._url,"/cards/").concat(id,"/likes"),{method:"DELETE",headers:this._headers})}setNewAvatar(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:""})})}}({url:"https://mesto.nomoreparties.co/v1/cohort-46",headers:{authorization:"fc76fdb8-e2ba-4757-a444-c4106fd529da","Content-Type":"application/json"}});x.getInitialCards().then((e=>{console.log(e),k.renderItems(e)})).catch((e=>{console.log(e)})),x.deleteCard(3).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}();
!function(){"use strict";const e={formElement:".form",inputElement:".form__input",submitButtonSelector:".form__submit-button",inactiveButton:"form__submit-button_invalid",inputError:"form__input_type_error",errorClass:"form__error-message"},t=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__avatar"),r=document.querySelector(".popup_type_edit"),o=document.querySelector(".popup_type_add"),n=document.querySelector(".popup_type_edit-avatar").querySelector(".form"),a=r.querySelector(".form"),l=o.querySelector(".form"),c=a.querySelector(".form__input_value_name"),_=a.querySelector(".form__input_value_job"),h=document.querySelector(".form__input_value_avatar"),u=l.querySelector(".form__input_value_title"),d=l.querySelector(".form__input_value_link"),p=document.querySelector(".profile__name"),m=document.querySelector(".profile__description");class v{constructor(e,t,s,i,r,o){let{name:n,link:a,_id:l,likes:c}=e;this._title=n,this._link=a,this._id=l,this._likes=c,this._cardSelector=t,this._handleCardClick=s,this._handleTrashIconClick=i,this._handleDeleteCard=r,this._handleLikeIconClick=o}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".grid-item").cloneNode(!0)}_toggleLike(){this._handleLikeIconClick(this._id,this.isLiked).then((e=>{this._likeButton.classList.toggle("grid-item__like_active"),this.isLiked=!this.isLiked,this._likesNumber.textContent=this._likes.length,console.log(this._likes.length)})).catch((e=>{console.log(e)}))}_removeCard(){console.log(this._id),this._handleDeleteCard(this._id).then((e=>{this._element.remove(),this._element=null})).catch((e=>{console.log(e)}))}_setEventListeners(){this._cardImage=this._element.querySelector(".grid-item__photo"),this._likeButton=this._element.querySelector(".grid-item__like"),this._trashIcon=this._element.querySelector(".grid-item__trash"),this._likesNumber=this._element.querySelector(".grid-item__likes-number"),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._title,this._link)})),this._likeButton.addEventListener("click",(()=>{this._toggleLike()})),this._trashIcon.addEventListener("click",(()=>{this._handleTrashIconClick(this._id)}))}generateCard(){return this._element=this._getTemplate(),this._setEventListeners(),this._cardTitle=this._element.querySelector(".grid-item__title"),this._cardTitle.textContent=this._title,this._cardImage.alt=this._title,this._cardImage.src=this._link,this._likesNumber.textContent=this._likes.length,this._element}}function f(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class g{constructor(e){f(this,"_handleEscClose",(e=>{"Escape"===e.key&&this.close()})),f(this,"_closeByOverlay",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-icon"))&&this.close()})),this._popup=document.querySelector(e)}setEventListeners(){this._popup.addEventListener("mousedown",this._closeByOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class y extends g{constructor(e){let{popupSelector:t,handleFormSubmit:s}=e;var i,r;super(t),r=e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues()),this.close()},(i="_submitHandler")in this?Object.defineProperty(this,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[i]=r,this._handleFormSubmit=s,this._inputList=this._popup.querySelectorAll(".form__input"),this._form=this._popup.querySelector(".form")}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}close(){super.close(),this._form.reset()}}class S{constructor(e,t){this._config=e,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputElement)),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}_toggleButtonState(){this._hasInvalidInput()?(this._submitButton.classList.add(this._config.inactiveButton),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._config.inactiveButton),this._submitButton.disabled=!1)}_setEventListeners(){this._toggleButtonState(),this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){e.classList.add(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.add(this._config.errorClass),t.textContent=e.validationMessage}_hideInputError(e){e.classList.remove(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._config.errorClass),t.textContent=""}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}const k=new S(e,a),b=new S(e,l),L=new S(e,n),E=new class{constructor(e,t){let{renderer:s}=e;this._renderer=s,this._container=document.querySelector(t)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=C(e);E.addItem(t)}},".grid-elements"),C=e=>new v(e,".item-template",q,B,A,N).generateCard(),I=new class extends g{constructor(e){super(e),this._cardImage=this._popup.querySelector(".card__picture"),this._cardTitle=this._popup.querySelector(".card__title")}open(e,t){super.open(),this._title=e,this._link=t,this._cardImage.src=this._link,this._cardTitle.textContent=this._title,this._cardImage.alt=this._title}}(".popup_type_view"),q=(e,t)=>{I.open(e,t)};I.setEventListeners();const w=new y({popupSelector:".popup_type_edit-avatar",handleFormSubmit:e=>{e={avatar:h.value},T.setProfileAvatar(e.avatar)}});w.setEventListeners();const j=new y({popupSelector:".popup_type_delete",handleFormSubmit:e=>{deleteCard,new v({},".item-template",q,B,A,N).removeCard(id),console.log(id)}}),B=e=>{j.open()};j.setEventListeners();const V=new y({popupSelector:".popup_type_add",handleFormSubmit:e=>{e={title:u.value,link:d.value},E.addItem(C(e))}});V.setEventListeners();const x=new y({popupSelector:".popup_type_edit",handleFormSubmit:e=>{e={user:c.value,job:_.value},T.setUserInfo(e.user,e.job)}});x.setEventListeners();const T=new class{constructor(e){let{profileName:t,profileJob:s,profileAvatar:i}=e;this._name=document.querySelector(t),this._job=document.querySelector(s),this._avatar=document.querySelector(i)}getUserInfo(){return{user:this._name.textContent,job:this._job.textContent}}setUserInfo(e,t){return this._name.textContent=e,this._job.textContent=t,this._info}setProfileAvatar(e){this._avatar.src=e}}({profileName:".profile__name",profileJob:".profile__description",profileAvatar:".profile__avatar-photo"});t.addEventListener("click",(()=>{c.value=p.textContent,_.value=m.textContent,k.resetValidation(),x.open()})),s.addEventListener("click",(()=>{b.resetValidation(),V.open()})),i.addEventListener("click",(()=>{L.resetValidation(),w.open()})),k.enableValidation(),b.enableValidation(),L.enableValidation();const P=new class{constructor(e){let{url:t,headers:s}=e;this._url=t,this._headers=s}getInitialCards(){return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}getUserInfo(){return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}addNewCard(e){let{name:t,link:s}=e;return fetch("".concat(this._url,"/cards"),{headers:this._headers,method:"POST",body:JSON.stringify({name:t,link:s})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}deleteCard(e){return fetch("".concat(this._url,"/cards/").concat(e),{headers:this._headers,method:"DELETE"}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}changeLikeStatus(e,t){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:t?"DELETE":"PUT",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}}({url:"https://mesto.nomoreparties.co/v1/cohort-46",headers:{authorization:"fc76fdb8-e2ba-4757-a444-c4106fd529da","Content-Type":"application/json"}});P.getInitialCards().then((e=>{console.log(e),E.renderItems(e)})).catch((e=>{console.log(e)}));const N=(e,t)=>{P.changeLikeStatus(e,t).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))},A=e=>{P.deleteCard(e).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}}();
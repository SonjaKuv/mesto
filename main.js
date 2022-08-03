!function(){"use strict";const e={formElement:".form",inputElement:".form__input",submitButtonSelector:".form__submit-button",inactiveButton:"form__submit-button_invalid",inputError:"form__input_type_error",errorClass:"form__error-message"},t=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__avatar"),r=document.querySelector(".popup_type_edit"),n=document.querySelector(".popup_type_add"),o=document.querySelector(".popup_type_edit-avatar").querySelector(".form"),a=r.querySelector(".form"),l=n.querySelector(".form"),c=a.querySelector(".form__input_value_name"),h=a.querySelector(".form__input_value_job"),u=document.querySelector(".form__input_value_avatar"),_=l.querySelector(".form__input_value_title"),d=l.querySelector(".form__input_value_link"),p=document.querySelector(".profile__name"),m=document.querySelector(".profile__description"),v=document.querySelector(".profile__avatar-photo");class f{constructor(e,t,s,i,r,n){let{name:o,link:a,_id:l,likes:c,owner:h}=e;var u,_;_=()=>{this._handleLikeIconClick(this._id,this.isLiked,this._likesNumber),this._likeButton.classList.toggle("grid-item__like_active"),this.isLiked=!this.isLiked,this._likesNumber.textContent=this._likes.length},(u="_toggleLike")in this?Object.defineProperty(this,u,{value:_,enumerable:!0,configurable:!0,writable:!0}):this[u]=_,this._title=o,this._link=a,this._id=l,this._likes=c,this._ownerId=h._id,this._cardSelector=t,this._handleCardClick=s,this._handleDeleteIconClick=i,this._handleLikeIconClick=r,this._profileId=n}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".grid-item").cloneNode(!0)}removeCard(){this._element.remove(),this._element=null}updateLikeStatus(e){console.log(this._element),this._likesNumber.textContent=e.length}_checkLikesAuthor(){this._likes.some((e=>e._id===this._profileId))&&this._likeButton.classList.add("grid-item__like_active")}_checkCardAuthor(){this._ownerId!==this._profileId&&this._trashIcon.classList.remove("grid-item__trash")}_setEventListeners(){this._cardImage=this._element.querySelector(".grid-item__photo"),this._likeButton=this._element.querySelector(".grid-item__like"),this._trashIcon=this._element.querySelector(".grid-item__trash"),this._likesNumber=this._element.querySelector(".grid-item__likes-number"),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._title,this._link)})),this._likeButton.addEventListener("click",(()=>{this._toggleLike()})),this._trashIcon.addEventListener("click",(()=>{this._handleDeleteIconClick(this)}))}generateCard(){return this._element=this._getTemplate(),this._setEventListeners(),this._checkLikesAuthor(),this._checkCardAuthor(),this._cardTitle=this._element.querySelector(".grid-item__title"),this._cardTitle.textContent=this._title,this._cardImage.alt=this._title,this._cardImage.src=this._link,this._likesNumber.textContent=this._likes.length,this._element}}function g(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class b{constructor(e){g(this,"_handleEscClose",(e=>{"Escape"===e.key&&this.close()})),g(this,"_closeByOverlay",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-icon"))&&this.close()})),this._popup=document.querySelector(e)}setEventListeners(){this._popup.addEventListener("mousedown",this._closeByOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}function k(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class L extends b{constructor(e){let{popupSelector:t,handleFormSubmit:s}=e;super(t),k(this,"_submitHandler",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())})),k(this,"setLoading",(e=>{this._submitButton=this._popup.querySelector(".form__submit-button"),!0===e?this._submitButton.textContent="Сохранение...":this.close()})),this._handleFormSubmit=s,this._inputList=this._popup.querySelectorAll(".form__input"),this._form=this._popup.querySelector(".form")}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}close(){super.close(),this._form.reset()}}class y{constructor(e,t){this._config=e,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputElement)),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}_toggleButtonState(){this._hasInvalidInput()?(this._submitButton.classList.add(this._config.inactiveButton),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._config.inactiveButton),this._submitButton.disabled=!1)}_setEventListeners(){this._toggleButtonState(),this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){e.classList.add(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.add(this._config.errorClass),t.textContent=e.validationMessage}_hideInputError(e){e.classList.remove(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._config.errorClass),t.textContent=""}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this._submitButton.textContent=this._submitButton.value,this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}const S=new class{constructor(e){let{url:t,headers:s}=e;this._url=t,this._headers=s}getInitialCards(){return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}getUserInfo(){return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}setUserInfo(e,t){return fetch("".concat(this._url,"/users/me"),{headers:this._headers,method:"PATCH",body:JSON.stringify({name:e,about:t})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}setNewAvatar(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}addNewCard(e,t){return fetch("".concat(this._url,"/cards"),{headers:this._headers,method:"POST",body:JSON.stringify({name:e,link:t})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}deleteCard(e){return fetch("".concat(this._url,"/cards/").concat(e),{headers:this._headers,method:"DELETE"}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}changeLikeStatus(e,t){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:t?"DELETE":"PUT",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}}({url:"https://mesto.nomoreparties.co/v1/cohort-46",headers:{authorization:"fc76fdb8-e2ba-4757-a444-c4106fd529da","Content-Type":"application/json"}}),E=new class{constructor(e,t){let{renderer:s}=e;this._renderer=s,this._container=document.querySelector(t)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addServerCard(e){this._container.append(e)}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=I(e);E.addServerCard(t)}},".grid-elements");let C;const I=e=>{const t=new f(e,".item-template",N,A,q,j);return C=t.generateCard(),C};S.getInitialCards().then((e=>{console.log(e),E.renderItems(e)})).catch((e=>{console.log(e)}));const q=(e,t)=>{S.changeLikeStatus(e,t).then((e=>{new f(e,".item-template",N,A,q,j).updateLikeStatus(C,e)})).catch((e=>{console.log(e)}))},w=new L({popupSelector:".popup_type_add",handleFormSubmit:e=>{e={name:_.value,link:d.value},w.setLoading(!0),S.addNewCard(e.name,e.link).then((e=>{E.addItem(I(e)),w.setLoading(!1)})).catch((e=>{console.log(e)}))}}),B=new class{constructor(e,t,s){this._name=e,this._about=t,this._avatar=s}getUserInfo(){const e={};return e.name=this._name.textContent,e.about=this._about.textContent,e.avatar=this._avatar.src,e}setUserInfo(e){this._name.textContent=e.name,this._about.textContent=e.about,this._avatar.src=e.avatar}}(p,m,v);let j;S.getUserInfo().then((e=>{j=e._id,B.setUserInfo(e)})).catch((e=>{console.log(e)}));const x=new L({popupSelector:".popup_type_edit",handleFormSubmit:e=>{e={name:c.value,about:h.value},x.setLoading(!0),S.setUserInfo(e.name,e.about).then((e=>{B.setUserInfo(e),x.setLoading(!1)})).catch((e=>{console.log(e)}))}}),P=new L({popupSelector:".popup_type_edit-avatar",handleFormSubmit:e=>{e={avatar:u.value},P.setLoading(!0),S.setNewAvatar(e.avatar).then((e=>{B.setUserInfo(e),P.setLoading(!1)})).catch((e=>{console.log(e)}))}}),V=new class extends b{constructor(e){super(e),this._cardImage=this._popup.querySelector(".card__picture"),this._cardTitle=this._popup.querySelector(".card__title")}open(e,t){super.open(),this._title=e,this._link=t,this._cardImage.src=this._link,this._cardTitle.textContent=this._title,this._cardImage.alt=this._title}}(".popup_type_view"),N=(e,t)=>{V.open(e,t)};V.setEventListeners();const T=new class extends b{constructor(e){let{popupSelector:t,handleCardDelete:s}=e;var i,r;super(t),r=e=>{e.preventDefault(),this._handleCardDelete(),super.close()},(i="_submitHandler")in this?Object.defineProperty(this,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[i]=r,this._handleCardDelete=s}open(){super.open(),this._setEventListeners()}_setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}}({popupSelector:".popup_type_delete",handleCardDelete:()=>{S.deleteCard(T.card._id).then((()=>{T.card.removeCard(),T.close(),T.card=""})).catch((e=>{console.log(e)}))}}),A=e=>{T.card=e,T.open()},D=new y(e,a),O=new y(e,l),U=new y(e,o);D.enableValidation(),O.enableValidation(),U.enableValidation(),t.addEventListener("click",(()=>{c.value=p.textContent,h.value=m.textContent,D.resetValidation(),x.open(),x.setEventListeners()})),s.addEventListener("click",(()=>{O.resetValidation(),w.open(),w.setEventListeners()})),i.addEventListener("click",(()=>{U.resetValidation(),P.open(),P.setEventListeners()}))}();
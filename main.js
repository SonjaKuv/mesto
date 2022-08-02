!function(){"use strict";const e={formElement:".form",inputElement:".form__input",submitButtonSelector:".form__submit-button",inactiveButton:"form__submit-button_invalid",inputError:"form__input_type_error",errorClass:"form__error-message"},t=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__avatar"),r=document.querySelector(".popup_type_edit"),o=document.querySelector(".popup_type_add"),n=document.querySelector(".popup_type_edit-avatar").querySelector(".form"),a=r.querySelector(".form"),l=o.querySelector(".form"),c=a.querySelector(".form__input_value_name"),u=a.querySelector(".form__input_value_job"),h=document.querySelector(".form__input_value_avatar"),_=l.querySelector(".form__input_value_title"),d=l.querySelector(".form__input_value_link"),p=document.querySelector(".profile__name"),m=document.querySelector(".profile__description"),v=document.querySelector(".profile__avatar-photo");class f{constructor(e,t,s,i,r,o,n){let{name:a,link:l,_id:c,likes:u}=e;this._title=a,this._link=l,this._id=c,this._likes=u,this._cardSelector=t,this._handleCardClick=s,this._openPopupDeleteCard=i,this._handleDeleteCard=r,this._handleLikeIconClick=o}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".grid-item").cloneNode(!0)}_toggleLike(){this._handleLikeIconClick(this._id,this.isLiked).then((e=>{this._likeButton.classList.toggle("grid-item__like_active"),this.isLiked=!this.isLiked})).catch((e=>{console.log(e)}))}updateLikeStatus(e){this._likesNumber.textContent=e.length}_checkLikesAuthor(){console.log(this._likes._id)}_setEventListeners(){this._cardImage=this._element.querySelector(".grid-item__photo"),this._likeButton=this._element.querySelector(".grid-item__like"),this._trashIcon=this._element.querySelector(".grid-item__trash"),this._likesNumber=this._element.querySelector(".grid-item__likes-number"),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._title,this._link)})),this._likeButton.addEventListener("click",(()=>{this._toggleLike()})),this._trashIcon.addEventListener("click",(()=>{this._openPopupDeleteCard(this._id)}))}generateCard(){return this._element=this._getTemplate(),this._setEventListeners(),this._checkLikesAuthor(),this._cardTitle=this._element.querySelector(".grid-item__title"),this._cardTitle.textContent=this._title,this._cardImage.alt=this._title,this._cardImage.src=this._link,this._likesNumber.textContent=this._likes.length,this._element}}function g(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class y{constructor(e){g(this,"_handleEscClose",(e=>{"Escape"===e.key&&this.close()})),g(this,"_closeByOverlay",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-icon"))&&this.close()})),this._popup=document.querySelector(e)}setEventListeners(){this._popup.addEventListener("mousedown",this._closeByOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class b extends y{constructor(e){let{popupSelector:t,handleFormSubmit:s}=e;var i,r;super(t),r=e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues()),this.close()},(i="_submitHandler")in this?Object.defineProperty(this,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[i]=r,this._handleFormSubmit=s,this._inputList=this._popup.querySelectorAll(".form__input"),this._form=this._popup.querySelector(".form")}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}close(){super.close(),this._form.reset()}}class S{constructor(e,t){this._config=e,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputElement)),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}_toggleButtonState(){this._hasInvalidInput()?(this._submitButton.classList.add(this._config.inactiveButton),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._config.inactiveButton),this._submitButton.disabled=!1)}_setEventListeners(){this._toggleButtonState(),this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){e.classList.add(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.add(this._config.errorClass),t.textContent=e.validationMessage}_hideInputError(e){e.classList.remove(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._config.errorClass),t.textContent=""}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}const k=new class{constructor(e){let{url:t,headers:s}=e;this._url=t,this._headers=s}getInitialCards(){return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}getUserInfo(){return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}setUserInfo(e,t){return fetch("".concat(this._url,"/users/me"),{headers:this._headers,method:"PATCH",body:JSON.stringify({name:e,about:t})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}setNewAvatar(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}addNewCard(e,t){return fetch("".concat(this._url,"/cards"),{headers:this._headers,method:"POST",body:JSON.stringify({name:e,link:t})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}deleteCard(e){return fetch("".concat(this._url,"/cards/").concat(e),{headers:this._headers,method:"DELETE"}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}changeLikeStatus(e,t){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:t?"DELETE":"PUT",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}}({url:"https://mesto.nomoreparties.co/v1/cohort-46",headers:{authorization:"fc76fdb8-e2ba-4757-a444-c4106fd529da","Content-Type":"application/json"}}),L=new class{constructor(e,t){let{renderer:s}=e;this._renderer=s,this._container=document.querySelector(t)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=E(e);L.addItem(t)}},".grid-elements"),E=e=>new f(e,".item-template",x,T,C).generateCard();k.getInitialCards().then((e=>{console.log(e),L.renderItems(e)})).catch((e=>{console.log(e)}));const C=(e,t)=>{k.changeLikeStatus(e,t).then((t=>{new f(e,".item-template",x,T,C).updateLikeStatus(t)})).catch((e=>{console.log(e)}))},I=new b({popupSelector:".popup_type_add",handleFormSubmit:e=>{e={name:_.value,link:d.value},k.addNewCard(e.name,e.link).then((e=>{L.addItem(E(e)),console.log(e)})).catch((e=>{console.log(e)}))}}),q=new class{constructor(e,t,s){this._name=e,this._about=t,this._avatar=s}getUserInfo(){const e={};return e.name=this._name.textContent,e.about=this._about.textContent,e.avatar=this._avatar.src,e}setUserInfo(e){this._name.textContent=e.name,this._about.textContent=e.about,this._avatar.src=e.avatar}}(p,m,v);let w;k.getUserInfo().then((e=>{w=e._id,q.setUserInfo(e)})).catch((e=>{console.log(e)}));const j=new b({popupSelector:".popup_type_edit",handleFormSubmit:e=>{e={name:c.value,about:u.value},k.setUserInfo(e.name,e.about).then((e=>{q.setUserInfo(e)})).catch((e=>{console.log(e)}))}}),B=new b({popupSelector:".popup_type_edit-avatar",handleFormSubmit:e=>{e={avatar:h.value},k.setNewAvatar(e.avatar).then((e=>{q.setUserInfo(e),console.log(e)})).catch((e=>{console.log(e)}))}}),P=new class extends y{constructor(e){super(e),this._cardImage=this._popup.querySelector(".card__picture"),this._cardTitle=this._popup.querySelector(".card__title")}open(e,t){super.open(),this._title=e,this._link=t,this._cardImage.src=this._link,this._cardTitle.textContent=this._title,this._cardImage.alt=this._title}}(".popup_type_view"),x=(e,t)=>{P.open(e,t)};P.setEventListeners();const V=new class extends y{constructor(e,t){let{popupSelector:s}=e;var i,r;super(s),r=e=>{e.preventDefault(),console.log(this._id),this._handleCardDelete(this._id),super.close()},(i="_submitHandler")in this?Object.defineProperty(this,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[i]=r,this._handleCardDelete=t}open(e){super.open(),this._id=e}_setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}}({popupSelector:".popup_type_delete",handleCardDelete:()=>{k.deleteCard().then((e=>{e.remove(),V.close()})).catch((e=>{console.log(e)}))}}),T=e=>{V.open(e),console.log(e),V.setEventListeners()},D=new S(e,a),N=new S(e,l),U=new S(e,n);D.enableValidation(),N.enableValidation(),U.enableValidation(),t.addEventListener("click",(()=>{c.value=p.textContent,u.value=m.textContent,D.resetValidation(),j.open(),j.setEventListeners()})),s.addEventListener("click",(()=>{N.resetValidation(),I.open(),I.setEventListeners()})),i.addEventListener("click",(()=>{U.resetValidation(),B.open(),B.setEventListeners()}))}();
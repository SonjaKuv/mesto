!function(){"use strict";const e={formElement:".form",inputElement:".form__input",submitButtonSelector:".form__submit-button",inactiveButton:"form__submit-button_invalid",inputError:"form__input_type_error",errorClass:"form__error-message"},t=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__avatar"),r=document.querySelector(".popup_type_edit"),n=document.querySelector(".popup_type_add"),o=document.querySelector(".popup_type_edit-avatar").querySelector(".form"),a=r.querySelector(".form"),l=n.querySelector(".form"),c=(a.querySelector(".form__input_value_name"),a.querySelector(".form__input_value_job"),document.querySelector(".form__input_value_avatar")),h=l.querySelector(".form__input_value_title"),_=l.querySelector(".form__input_value_link"),u=document.querySelector(".profile__name"),d=document.querySelector(".profile__description"),p=document.querySelector(".profile__avatar-photo");class m{constructor(e){let{data:t,cardSelector:s,handleCardClick:i,handleDeleteIconClick:r,handleLikeIconClick:n,profileId:o}=e;this._title=t.name,this._link=t.link,this._id=t._id,this._likes=t.likes,this._ownerId=t.owner._id,this._cardSelector=s,this._handleCardClick=i,this._handleDeleteIconClick=r,this._handleLikeIconClick=n,this._profileId=o}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".grid-item").cloneNode(!0)}_checkLikesAuthor(){this._likes.some((e=>e._id===this._profileId))&&(this._likeButton.classList.add("grid-item__like_active"),console.log(this._likeButton))}_checkCardAuthor(){this._ownerId!==this._profileId&&this._trashIcon.classList.remove("grid-item__trash")}_setEventListeners(){this._cardImage=this._element.querySelector(".grid-item__photo"),this._likeButton=this._element.querySelector(".grid-item__like"),this._trashIcon=this._element.querySelector(".grid-item__trash"),this._likesNumber=this._element.querySelector(".grid-item__likes-number"),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this)})),this._likeButton.addEventListener("click",(()=>{this._handleLikeIconClick(this)})),this._trashIcon.addEventListener("click",(()=>{this._handleDeleteIconClick(this)}))}generateCard(){return this._element=this._getTemplate(),this._setEventListeners(),this._checkLikesAuthor(),this._checkCardAuthor(),this._cardTitle=this._element.querySelector(".grid-item__title"),this._cardTitle.textContent=this._title,this._cardImage.alt=this._title,this._cardImage.src=this._link,this._likesNumber.textContent=this._likes.length,this._element}removeCard(){this._element.remove(),this._element=null}updateLikeStatus(e){this._likesNumber.textContent=e,this._likeButton.classList.toggle("grid-item__like_active"),this.isLiked=!this.isLiked}}function f(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class v{constructor(e){f(this,"_handleEscClose",(e=>{"Escape"===e.key&&this.close()})),f(this,"_closeByOverlay",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-icon"))&&this.close()})),this._popup=document.querySelector(e)}setEventListeners(){this._popup.addEventListener("mousedown",this._closeByOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}function g(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class k extends v{constructor(e){var t;let{popupSelector:s,handleFormSubmit:i}=e;super(s),t=this,g(this,"_submitHandler",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())})),g(this,"renderLoading",(function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";t._submitButton.textContent=e?s:t._submitButtonText})),this._handleFormSubmit=i,this._inputList=this._popup.querySelectorAll(".form__input"),this._form=this._popup.querySelector(".form"),this._submitButton=this._popup.querySelector(".form__submit-button"),this._submitButtonText=this._submitButton.textContent}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e]=e.value})),this._formValues}setInputValues(e){this._inputList.forEach((t=>{t.value=e[t.name]}))}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}close(){super.close(),this._form.reset()}}class y{constructor(e,t){this._config=e,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputElement)),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}_toggleButtonState(){this._hasInvalidInput()?(this._submitButton.classList.add(this._config.inactiveButton),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._config.inactiveButton),this._submitButton.disabled=!1)}_setEventListeners(){this._toggleButtonState(),this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){e.classList.add(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.add(this._config.errorClass),t.textContent=e.validationMessage}_hideInputError(e){e.classList.remove(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._config.errorClass),t.textContent=""}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}const L=new class{constructor(e){let{url:t,headers:s}=e;this._url=t,this._headers=s}_checkResponse(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}getInitialCards(){return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then(this._checkResponse)}getUserInfo(){return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then(this._checkResponse)}setUserInfo(e,t){return fetch("".concat(this._url,"/users/me"),{headers:this._headers,method:"PATCH",body:JSON.stringify({name:e,about:t})}).then(this._checkResponse)}setNewAvatar(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}addNewCard(e,t){return fetch("".concat(this._url,"/cards"),{headers:this._headers,method:"POST",body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}deleteCard(e){return fetch("".concat(this._url,"/cards/").concat(e),{headers:this._headers,method:"DELETE"}).then(this._checkResponse)}changeLikeStatus(e,t){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:t?"DELETE":"PUT",headers:this._headers}).then(this._checkResponse)}}({url:"https://mesto.nomoreparties.co/v1/cohort-46",headers:{authorization:"fc76fdb8-e2ba-4757-a444-c4106fd529da","Content-Type":"application/json"}}),b=new class{constructor(e,t){let{renderer:s}=e;this._renderer=s,this._container=document.querySelector(t)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addServerCard(e){this._container.append(e)}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=S(e);b.addServerCard(t)}},".grid-elements"),S=e=>new m({data:e,cardSelector:".item-template",handleCardClick:e=>{B.open(e._title,e._link)},handleDeleteIconClick:e=>{x.card=e,x.open()},handleLikeIconClick:e=>{L.changeLikeStatus(e._id,e.isLiked).then((t=>{const s=t.likes.length;e.updateLikeStatus(s)})).catch((e=>{console.log(e)}))},profileId:I}).generateCard(),C=new class{constructor(e,t,s){this._name=e,this._about=t,this._avatar=s}getUserInfo(){const e={};return e.name=this._name.textContent,e.about=this._about.textContent,e.avatar=this._avatar.src,e}setUserInfo(e){this._name.textContent=e.name,this._about.textContent=e.about,this._avatar.src=e.avatar}}(u,d,p);let I;Promise.all([L.getUserInfo(),L.getInitialCards()]).then((e=>{let[t,s]=e;I=t._id,C.setUserInfo(t),console.log(s),b.renderItems(s)})).catch((e=>{console.log(e)}));const E=new k({popupSelector:".popup_type_edit",handleFormSubmit:e=>{e={},E.renderLoading(!0),L.setUserInfo(e.name,e.about).then((e=>{C.setUserInfo(e),E.close()})).catch((e=>{console.log(e)})).finally((()=>{E.renderLoading(!1)}))}});E.setEventListeners();const q=new k({popupSelector:".popup_type_edit-avatar",handleFormSubmit:e=>{e={avatar:c.value},q.renderLoading(!0),L.setNewAvatar(e.avatar).then((e=>{C.setUserInfo(e),q.close()})).catch((e=>{console.log(e)})).finally((()=>{q.renderLoading(!1)}))}});q.setEventListeners();const w=new k({popupSelector:".popup_type_add",handleFormSubmit:e=>{e={name:h.value,link:_.value},w.renderLoading(!0),L.addNewCard(e.name,e.link).then((e=>{b.addItem(S(e)),w.close()})).catch((e=>{console.log(e)})).finally((()=>{w.renderLoading(!1)}))}});w.setEventListeners();const B=new class extends v{constructor(e){super(e),this._cardImage=this._popup.querySelector(".card__picture"),this._cardTitle=this._popup.querySelector(".card__title")}open(e,t){super.open(),this._title=e,this._link=t,this._cardImage.src=this._link,this._cardTitle.textContent=this._title,this._cardImage.alt=this._title}}(".popup_type_view");B.setEventListeners();const x=new class extends v{constructor(e){let{popupSelector:t,handleCardDelete:s}=e;var i,r;super(t),r=e=>{e.preventDefault(),this._handleCardDelete(),super.close()},(i="_submitHandler")in this?Object.defineProperty(this,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[i]=r,this._handleCardDelete=s}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}}({popupSelector:".popup_type_delete",handleCardDelete:()=>{L.deleteCard(x.card._id).then((()=>{x.card.removeCard(),x.close(),x.card=""})).catch((e=>{console.log(e)}))}});x.setEventListeners();const V=new y(e,a),T=new y(e,l),D=new y(e,o);V.enableValidation(),T.enableValidation(),D.enableValidation(),t.addEventListener("click",(()=>{E.setInputValues(),V.resetValidation(),E.open()})),s.addEventListener("click",(()=>{T.resetValidation(),w.open()})),i.addEventListener("click",(()=>{D.resetValidation(),q.open()}))}();
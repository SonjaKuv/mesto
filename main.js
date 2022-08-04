!function(){"use strict";const e={formElement:".form",inputElement:".form__input",submitButtonSelector:".form__submit-button",inactiveButton:"form__submit-button_invalid",inputError:"form__input_type_error",errorClass:"form__error-message"},t=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__avatar"),r=document.querySelector(".popup_type_edit"),n=document.querySelector(".popup_type_add"),o=document.querySelector(".popup_type_edit-avatar").querySelector(".form"),a=r.querySelector(".form"),l=n.querySelector(".form"),c=a.querySelector(".form__input_value_name"),h=a.querySelector(".form__input_value_job"),u=document.querySelector(".form__input_value_avatar"),_=l.querySelector(".form__input_value_title"),d=l.querySelector(".form__input_value_link"),p=document.querySelector(".profile__name"),m=document.querySelector(".profile__description"),v=document.querySelector(".profile__avatar-photo");class f{constructor(e){let{data:t,cardSelector:s,handleCardClick:i,handleDeleteIconClick:r,handleLikeIconClick:n,profileId:o}=e;var a,l;l=()=>{this._handleLikeIconClick(this._id,this.isLiked),this._likeButton.classList.toggle("grid-item__like_active"),this.isLiked=!this.isLiked,this.updateLikeStatus()},(a="_toggleLike")in this?Object.defineProperty(this,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):this[a]=l,this._title=t.name,this._link=t.link,this._id=t._id,this._likes=t.likes,this._ownerId=t.owner._id,this._cardSelector=s,this._handleCardClick=i,this._handleDeleteIconClick=r,this._handleLikeIconClick=n,this._profileId=o}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".grid-item").cloneNode(!0)}removeCard(){this._element.remove(),this._element=null}setLikesAmount(e){this._likesAmount=e}updateLikeStatus(){this._likesNumber.textContent=this._likesAmount,console.log(this._likesAmount)}_checkLikesAuthor(){this._likes.some((e=>e._id===this._profileId))&&this._likeButton.classList.add("grid-item__like_active")}_checkCardAuthor(){this._ownerId!==this._profileId&&this._trashIcon.classList.remove("grid-item__trash")}_setEventListeners(){this._cardImage=this._element.querySelector(".grid-item__photo"),this._likeButton=this._element.querySelector(".grid-item__like"),this._trashIcon=this._element.querySelector(".grid-item__trash"),this._likesNumber=this._element.querySelector(".grid-item__likes-number"),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._title,this._link)})),this._likeButton.addEventListener("click",(()=>{this._toggleLike()})),this._trashIcon.addEventListener("click",(()=>{this._handleDeleteIconClick(this)}))}generateCard(){return this._element=this._getTemplate(),this._setEventListeners(),this._checkLikesAuthor(),this._checkCardAuthor(),this._cardTitle=this._element.querySelector(".grid-item__title"),this._cardTitle.textContent=this._title,this._cardImage.alt=this._title,this._cardImage.src=this._link,this._likesNumber.textContent=this._likes.length,this._element}}function g(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class k{constructor(e){g(this,"_handleEscClose",(e=>{"Escape"===e.key&&this.close()})),g(this,"_closeByOverlay",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-icon"))&&this.close()})),this._popup=document.querySelector(e)}setEventListeners(){this._popup.addEventListener("mousedown",this._closeByOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}function b(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class L extends k{constructor(e){let{popupSelector:t,handleFormSubmit:s}=e;super(t),b(this,"_submitHandler",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())})),b(this,"setLoading",(e=>{this._submitButton=this._popup.querySelector(".form__submit-button"),!0===e?this._submitButton.textContent="Сохранение...":this.close()})),this._handleFormSubmit=s,this._inputList=this._popup.querySelectorAll(".form__input"),this._form=this._popup.querySelector(".form")}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}close(){super.close(),this._form.reset()}}class y{constructor(e,t){this._config=e,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputElement)),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}_toggleButtonState(){this._hasInvalidInput()?(this._submitButton.classList.add(this._config.inactiveButton),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._config.inactiveButton),this._submitButton.disabled=!1)}_setEventListeners(){this._toggleButtonState(),this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){e.classList.add(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.add(this._config.errorClass),t.textContent=e.validationMessage}_hideInputError(e){e.classList.remove(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._config.errorClass),t.textContent=""}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this._submitButton.textContent=this._submitButton.value,this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}const S=new class{constructor(e){let{url:t,headers:s}=e;this._url=t,this._headers=s}getInitialCards(){return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}getUserInfo(){return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}setUserInfo(e,t){return fetch("".concat(this._url,"/users/me"),{headers:this._headers,method:"PATCH",body:JSON.stringify({name:e,about:t})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}setNewAvatar(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}addNewCard(e,t){return fetch("".concat(this._url,"/cards"),{headers:this._headers,method:"POST",body:JSON.stringify({name:e,link:t})}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}deleteCard(e){return fetch("".concat(this._url,"/cards/").concat(e),{headers:this._headers,method:"DELETE"}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}changeLikeStatus(e,t){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:t?"DELETE":"PUT",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))))}}({url:"https://mesto.nomoreparties.co/v1/cohort-46",headers:{authorization:"fc76fdb8-e2ba-4757-a444-c4106fd529da","Content-Type":"application/json"}}),C=new class{constructor(e,t){let{renderer:s}=e;this._renderer=s,this._container=document.querySelector(t)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addServerCard(e){this._container.append(e)}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=I(e);C.addServerCard(t)}},".grid-elements"),I=e=>{const t=new f({data:e,cardSelector:".item-template",handleCardClick:(e,t)=>{x.open(e,t)},handleDeleteIconClick:e=>{A.card=e,A.open()},handleLikeIconClick:(e,s)=>{S.changeLikeStatus(e,s).then((e=>{const s=e.likes.length;t.setLikesAmount(s)})).catch((e=>{console.log(e)}))},profileId:w});return t.generateCard()};S.getInitialCards().then((e=>{console.log(e),C.renderItems(e)})).catch((e=>{console.log(e)}));const E=new L({popupSelector:".popup_type_add",handleFormSubmit:e=>{e={name:_.value,link:d.value},E.setLoading(!0),S.addNewCard(e.name,e.link).then((e=>{C.addItem(I(e)),E.setLoading(!1)})).catch((e=>{console.log(e)}))}}),q=new class{constructor(e,t,s){this._name=e,this._about=t,this._avatar=s}getUserInfo(){const e={};return e.name=this._name.textContent,e.about=this._about.textContent,e.avatar=this._avatar.src,e}setUserInfo(e){this._name.textContent=e.name,this._about.textContent=e.about,this._avatar.src=e.avatar}}(p,m,v);let w;S.getUserInfo().then((e=>{w=e._id,q.setUserInfo(e)})).catch((e=>{console.log(e)}));const B=new L({popupSelector:".popup_type_edit",handleFormSubmit:e=>{e={name:c.value,about:h.value},B.setLoading(!0),S.setUserInfo(e.name,e.about).then((e=>{q.setUserInfo(e),B.setLoading(!1)})).catch((e=>{console.log(e)}))}}),j=new L({popupSelector:".popup_type_edit-avatar",handleFormSubmit:e=>{e={avatar:u.value},j.setLoading(!0),S.setNewAvatar(e.avatar).then((e=>{q.setUserInfo(e),j.setLoading(!1)})).catch((e=>{console.log(e)}))}}),x=new class extends k{constructor(e){super(e),this._cardImage=this._popup.querySelector(".card__picture"),this._cardTitle=this._popup.querySelector(".card__title")}open(e,t){super.open(),this._title=e,this._link=t,this._cardImage.src=this._link,this._cardTitle.textContent=this._title,this._cardImage.alt=this._title}}(".popup_type_view");x.setEventListeners();const A=new class extends k{constructor(e){let{popupSelector:t,handleCardDelete:s}=e;var i,r;super(t),r=e=>{e.preventDefault(),this._handleCardDelete(),super.close()},(i="_submitHandler")in this?Object.defineProperty(this,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[i]=r,this._handleCardDelete=s}open(){super.open(),this._setEventListeners()}_setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}}({popupSelector:".popup_type_delete",handleCardDelete:()=>{S.deleteCard(A.card._id).then((()=>{A.card.removeCard(),A.close(),A.card=""})).catch((e=>{console.log(e)}))}}),P=new y(e,a),V=new y(e,l),D=new y(e,o);P.enableValidation(),V.enableValidation(),D.enableValidation(),t.addEventListener("click",(()=>{c.value=p.textContent,h.value=m.textContent,P.resetValidation(),B.open(),B.setEventListeners()})),s.addEventListener("click",(()=>{V.resetValidation(),E.open(),E.setEventListeners()})),i.addEventListener("click",(()=>{D.resetValidation(),j.open(),j.setEventListeners()}))}();
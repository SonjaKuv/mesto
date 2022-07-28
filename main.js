!function(){"use strict";const e={formElement:".form",inputElement:".form__input",submitButtonSelector:".form__submit-button",inactiveButton:"form__submit-button_invalid",inputError:"form__input_type_error",errorClass:"form__error-message"},t=document.querySelector(".profile__edit-button"),r=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__avatar"),s=document.querySelector(".popup_type_edit"),n=document.querySelector(".popup_type_add"),o=document.querySelector(".popup_type_edit-avatar").querySelector(".form"),l=s.querySelector(".form"),a=n.querySelector(".form"),c=l.querySelector(".form__input_value_name"),u=l.querySelector(".form__input_value_job"),_=document.querySelector(".form__input_value_avatar"),p=a.querySelector(".form__input_value_title"),d=a.querySelector(".form__input_value_link"),h=document.querySelector(".profile__name"),m=document.querySelector(".profile__description");document.querySelector(".profile__avatar");class v{constructor(e,t,r,i){this._title=e.title,this._link=e.link,this._cardSelector=t,this._handleCardClick=r,this._handleCardRemove=i}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".grid-item").cloneNode(!0)}_toggleLike(){this._likeButton.classList.toggle("grid-item__like_active")}removeCard(){this._element.remove(),this._element=null}_setEventListeners(){this._cardImage=this._element.querySelector(".grid-item__photo"),this._likeButton=this._element.querySelector(".grid-item__like"),this._trashIcon=this._element.querySelector(".grid-item__trash"),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._title,this._link)})),this._likeButton.addEventListener("click",(()=>{this._toggleLike()})),this._trashIcon.addEventListener("click",(()=>{this._handleCardRemove()}))}generateCard(){return this._element=this._getTemplate(),this._setEventListeners(),this._cardTitle=this._element.querySelector(".grid-item__title"),this._cardTitle.textContent=this._title,this._cardImage.alt=this._title,this._cardImage.src=this._link,this._element}}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class y{constructor(e){f(this,"_handleEscClose",(e=>{"Escape"===e.key&&this.close()})),f(this,"_closeByOverlay",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-icon"))&&this.close()})),this._popup=document.querySelector(e)}setEventListeners(){this._popup.addEventListener("mousedown",this._closeByOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class g extends y{constructor(e){let{popupSelector:t,handleFormSubmit:r}=e;var i,s;super(t),s=e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues()),this.close()},(i="_submitHandler")in this?Object.defineProperty(this,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):this[i]=s,this._handleFormSubmit=r,this._inputList=this._popup.querySelectorAll(".form__input"),this._form=this._popup.querySelector(".form")}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",this._submitHandler)}close(){super.close(),this._form.reset()}}class S{constructor(e,t){this._config=e,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputElement)),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}_toggleButtonState(){this._hasInvalidInput()?(this._submitButton.classList.add(this._config.inactiveButton),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._config.inactiveButton),this._submitButton.disabled=!1)}_setEventListeners(){this._toggleButtonState(),this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){e.classList.add(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.add(this._config.errorClass),t.textContent=e.validationMessage}_hideInputError(e){e.classList.remove(this._config.inputError);const t=document.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._config.errorClass),t.textContent=""}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}const b=new S(e,l),E=new S(e,a),L=new S(e,o),k=new class{constructor(e,t){let{renderer:r}=e;this._renderer=r,this._container=document.querySelector(t)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=q(e);k.addItem(t)}},".grid-elements"),q=e=>new v(e,".item-template",C,x).generateCard(),I=new class extends y{constructor(e){super(e),this._cardImage=this._popup.querySelector(".card__picture"),this._cardTitle=this._popup.querySelector(".card__title")}open(e,t){super.open(),this._title=e,this._link=t,this._cardImage.src=this._link,this._cardTitle.textContent=this._title,this._cardImage.alt=this._title}}(".popup_type_view"),C=(e,t)=>{I.open(e,t)};I.setEventListeners();const w=new g({popupSelector:".popup_type_edit-avatar",handleFormSubmit:e=>{e={avatar:_.value},A.setProfileAvatar(e.avatar)}});w.setEventListeners();const B=new g({popupSelector:".popup_type_delete",handleFormSubmit:e=>{}}),x=()=>{B.open()};B.setEventListeners();const j=new g({popupSelector:".popup_type_add",handleFormSubmit:e=>{e={title:p.value,link:d.value},k.addItem(q(e))}});j.setEventListeners();const V=new g({popupSelector:".popup_type_edit",handleFormSubmit:e=>{e={user:c.value,job:u.value},A.setUserInfo(e.user,e.job)}});V.setEventListeners();const A=new class{constructor(e){let{profileName:t,profileJob:r,profileAvatar:i}=e;this._name=document.querySelector(t),this._job=document.querySelector(r),this._avatar=document.querySelector(i)}getUserInfo(){return{user:this._name.textContent,job:this._job.textContent}}setUserInfo(e,t){return this._name.textContent=e,this._job.textContent=t,this._info}setProfileAvatar(e){this._avatar.style.backgroundImage="`${inputAvatar}`"}}({profileName:".profile__name",profileJob:".profile__description",profileAvatar:".profile__avatar"});t.addEventListener("click",(()=>{c.value=h.textContent,u.value=m.textContent,b.resetValidation(),V.open()})),r.addEventListener("click",(()=>{E.resetValidation(),j.open()})),i.addEventListener("click",(()=>{L.resetValidation(),w.open()})),b.enableValidation(),E.enableValidation(),L.enableValidation(),k.renderItems([{title:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{title:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{title:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{title:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{title:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{title:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}])}();
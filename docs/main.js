!function(e,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof exports?exports.File=i():e.File=i()}(self,(()=>(()=>{"use strict";var e={d:(i,t)=>{for(var n in t)e.o(t,n)&&!e.o(i,n)&&Object.defineProperty(i,n,{enumerable:!0,get:t[n]})},o:(e,i)=>Object.prototype.hasOwnProperty.call(e,i),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},i={};e.r(i),e.d(i,{default:()=>n});const t={size:2e6,messages:{invalidSize:"Le poids de votre fichier est trop lourd",invalidType:"Le type de votre fichier est incorrect",invalidFile:"Aucun fichier n'a été sélectionné"},types:["image/jpeg","image/jpg","image/png","application/pdf"]};class n{constructor(e,i={}){var n;this.$input=null,this.$information=null,this.el=e,this.options={...t,...i},this.$input=this.el.querySelector("[type=file]"),this.$information=this.el.querySelector(".js-information"),null===(n=this.$input)||void 0===n||n.style.setProperty("pointer-events","none")}init(){if(null===this.el||void 0===this.el)return!1;this.initEvents()}initEvents(){this.el.addEventListener("click",(e=>{e.stopPropagation(),this.$input&&this.$input.click()})),this.el.addEventListener("keydown",(e=>{"Enter"===e.key&&this.$input&&this.$input.click()})),this.$input.addEventListener("change",(()=>{this.change()})),[...this.$input.labels].forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault()}))}))}change(){var e,i,t,n,o,s;const{files:r}=this.$input;return!(null!==r&&void 0!==r[0]&&(this.el.removeAttribute("aria-invalid"),0===r.length?(this.$information.innerHTML=null!==(t=null===(i=null===(e=this.options)||void 0===e?void 0:e.messages)||void 0===i?void 0:i.invalidFile)&&void 0!==t?t:"",this.el.setAttribute("aria-invalid","true"),1):((e,i)=>{for(let t=0;t<i.length;t+=1)if(e.type===i[t])return!0;return!1})(r[0],this.options.types)?this.options.size&&r[0].size>this.options.size?(this.$information.innerHTML=this.options.messages?`${this.options.messages.invalidSize} (${(e=>{let i=`${(e/1048576).toFixed(1)} Mo`;return 1024>e?i=`${e} octets`:1024<=e&&1048576>e&&(i=`${(e/1024).toFixed(1)} Ko`),i})(r[0].size)})`:"",this.el.setAttribute("aria-invalid","true"),1):(this.$information.innerHTML=r[0].name,0):(this.$information.innerHTML=null!==(s=null===(o=null===(n=this.options)||void 0===n?void 0:n.messages)||void 0===o?void 0:o.invalidType)&&void 0!==s?s:"",this.el.setAttribute("aria-invalid","true"),1)))}}return i})()));
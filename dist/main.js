(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var o=n.getElementsByTagName("script");if(o.length)for(var c=o.length-1;c>-1&&!t;)t=o[c--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),document.addEventListener("DOMContentLoaded",(function(){document.querySelector(".exitToken").addEventListener("click",(function(e){e.preventDefault(),console.log("exitToken click"),document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",window.location.href="/"}))})),document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".sidebarBtn a").forEach((function(e){e.addEventListener("click",(function(t){t.preventDefault();const n=encodeURIComponent(e.getAttribute("data-category"));window.location.href="/category/"+n}))}))}));let t=document.querySelector(".pagination"),n=document.querySelectorAll(".title-stories"),o=document.querySelectorAll(".profile-content"),c=10,r=1;function i(e){let c=document.createElement("button");c.classList.add("page-link"),c.textContent=e,c.addEventListener("click",(function(){r=e,l(n),l(o),a()})),t.appendChild(c)}function l(e){e.forEach(((e,t)=>{e.style.display=t<(r-1)*c||t>=r*c?"none":"block"}))}for(let e=0;e<Math.ceil(n.length/c);e++)i(e+1);function a(){document.querySelectorAll(".page-link").forEach(((e,t)=>{t+1===r?e.classList.add("active"):e.classList.remove("active")}))}a(),l(n),l(o),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll(".RejectBtn");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(){e[t].parentElement.nextElementSibling.style.display="block",e[t].style.display="none"}))}));let d=document.getElementById("passwordInput"),u=document.getElementById("confirmPasswordInput"),s=document.getElementById("confirmPasswordError"),p=document.getElementById("emailInput"),m=document.getElementById("loginInput");u.addEventListener("input",(function(){let e=d.value,t=u.value;s.style.display=e===t||""===t?"none":"block"})),p.addEventListener("input",(async function(){let e=p.value;try{await fetch(`/check-email?email=${e}`)}catch(e){console.error(e)}})),m.addEventListener("input",(async function(){let e=m.value;try{await fetch(`/check-login?login=${e}`)}catch(e){console.error(e)}}));let f=document.getElementById("passwordCheckbox1");f.addEventListener("change",(function(){g("passwordInput",f)}));let y=document.getElementById("passwordCheckbox2");function g(e,t){document.getElementById(e).type=t.checked?"text":"password"}y.addEventListener("change",(function(){g("confirmPasswordInput",y)})),e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p})();
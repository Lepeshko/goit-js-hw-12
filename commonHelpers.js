import{S as f,i as u}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function m(o){const s=`https://pixabay.com/api/?${new URLSearchParams({key:"44048092-3090edf6b3c3e0216bf005362",q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"}).toString()}`,i=await fetch(s);if(!i.ok)throw new Error(`Failed to fetch images. Status: ${i.status}`);return i.json()}function p(o,r){const s=o.map(e=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <div class="full-image" class="loader">
                    <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}">
                    <ul class="image-button">
                        <li><p class="info-name">Likes</p><p>${e.likes}</p></li>
                        <li><p class="info-name">Views</p><p>${e.views}</p></li>
                        <li><p class="info-name">Comments</p><p>${e.comments}</p></li>
                        <li><p class="info-name">Downloads</p><p>${e.downloads}</p></li>
                        </ul>
                </div>
            </a>
        </li>
    `).join("");r.innerHTML=s,new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function n(o,r){u[r]({message:o,messageColor:"white",position:"topRight",backgroundColor:"red"})}const c=document.querySelector("form"),d=document.querySelector(".gallery"),l=document.querySelector(".loader");c.addEventListener("submit",async o=>{o.preventDefault(),d.innerHTML="",l.classList.remove("is-hidden");const r=o.target.elements.search_input.value.trim();if(r===""){n("All form fields must be filled in","warning"),l.classList.add("is-hidden");return}try{const s=await m(r);s.total===0?n("Sorry, no images found. Please try again!","error"):p(s.hits,d)}catch(s){console.error("Error fetching images:",s),n("An error occurred while fetching images. Please try again later.","error")}finally{c.reset(),l.classList.add("is-hidden")}});
//# sourceMappingURL=commonHelpers.js.map

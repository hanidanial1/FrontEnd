import { renderPoke } from "./RenderPokemon.js";
const cards = document.querySelector("#cards");
const homePage = document.querySelector("#homePage");
const loaderParent = document.querySelector("#loaderParent");


// to search Pokemon By name
export const searchPokemon = async (para) => {
     homePage.innerHTML = "";
     cards.innerHTML = "";
     loaderParent.style.display = "block";
     const res = await fetch(para);
     const data = await res.json();
     renderPoke(data.data);
   };
import { renderPoke } from "./RenderPokemon.js";
const typesApi = "https://api.pokemontcg.io/v2/types";
const dropDown = document.querySelector("#dropDown");
const cards = document.querySelector("#cards");
const homePage = document.querySelector("#homePage");
const loaderParent = document.querySelector("#loaderParent");

//to get The Type Of Pokemons
export const catFunc = async () => {

  try {
    const res = await fetch(typesApi);
    const data = await res.json();

    for (let item of data.data) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.classList = "dropdown-item";
      a.textContent = item;
      a.addEventListener("click", async () => {
        homePage.innerHTML = "";
        cards.innerHTML = "";
        loaderParent.style.display = "block";
        pokemonByType(item);
      });
      li.append(a);
      dropDown.append(li);
    }
 } catch (error) {
    console.log(error);
  }
};
catFunc()
let TypePokemonArr = [];
//to get the wanted Pokemon From other Api
const apiUrl = " https://api.pokemontcg.io/v2/cards";

 //the parameter i have got from the upper function 
async function pokemonByType(type) {
  const res = await fetch(apiUrl);
  const data = await res.json();
  for (let item1 of data.data) {
    if (item1.types[0] === type) {

      //here i got duplicated card bcz i should rest the array 
      TypePokemonArr.push(item1);
     
    }
  }
  // here to create the card of pokemon 
  renderPoke(TypePokemonArr);
  //here i have rest the array 
  TypePokemonArr = []
}

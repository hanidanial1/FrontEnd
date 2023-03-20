//to get all pokemons done
import { renderPoke, pokemonCreate } from "./RenderPokemon.js";
//catagories done
import { catFunc } from "./categories-poke.js";
//search done
import { searchPokemon } from "./searchPoke.js";

//global holding elements
const cards = document.querySelector("#cards");
const loaderParent = document.querySelector("#loaderParent");
const dropDown = document.querySelector("#dropDown");
const homeBtn = document.querySelector("#homeBtn");
const homePage = document.querySelector("#homePage");
const savedPokemon = document.querySelector("#savedJobs");
const pokeElement = document.querySelector("#poke");
const searchBtn = document.querySelector("#searchBtn");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const cata = document.querySelector("#cata");

pokeElement.addEventListener("click", () => {
  pokemonCreate();
});

// Home Page To Say Hello To users
const render = () => {
  homePage.innerHTML = `   
     <div class="jumbotron m-5">
     <h1 class="display-4">Welcome to Our Jobs search service </h1>
     <p class="lead">to use our service all what you need is a good heart, and little mind 🕵🏻</p>
     <hr class="my-4">
     <h3 class="display-6">Enjoy</h3>
</div>
`;
};

// to go back to home Page
homeBtn.addEventListener("click", () => {
  homePage.innerHTML = "";
  cards.innerHTML = "";
  loaderParent.style.display = "block";
  render();
  randomQuotes("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
  loaderParent.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault(form);
  const searchApi = `https://api.pokemontcg.io/v2/cards?q=name:${searchInput.value}`;
  homePage.innerHTML = "";
  cards.innerHTML = "";
  loaderParent.style.display = "block";
  searchPokemon(searchApi);
});
//             -------->>>>> Important <<<<<<--------
//  this event allow me to get data from local Storage and Render them
//on saved Pokemons Page   !!!!!Important
savedPokemon.addEventListener("click", () => {
  //to rest cards and main body everytime user click savedPokemonBtn
  homePage.innerHTML = "";
  cards.innerHTML = "";
  // to refresh the local Storage each time user click savedPokemon
  //you get localstorage everytime user click like in line 65
  let pokeStorage = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

  // then you can render the array with all objs in it like in line 70
  renderPoke(pokeStorage, false);
});

//to get random Quotes for home Page
const randomQuotes = async (para) => {
  const res = await fetch(para);
  const data = await res.json();
  const p = document.createElement("h3");
  p.classList = "card-text p-6 text-center text-smaller mt-2";
  p.textContent = data;
  homePage.append(p);
};
randomQuotes("https://ron-swanson-quotes.herokuapp.com/v2/quotes");

const ScrollBtn = document.querySelector("#ScrollBtn");
window.addEventListener("scroll",  ()=> {
ScrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })});
})

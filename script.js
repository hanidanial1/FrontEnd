//importing all functions needed
import { renderPoke, pokemonCreate } from "./RenderPokemon.js";
import { catFunc } from "./categories-poke.js";
import { searchPokemon } from "./searchPoke.js";

//global holding elements
const cards = document.querySelector("#cards");
const loaderParent = document.querySelector("#loaderParent");
const homeBtn = document.querySelector("#homeBtn");
const homePage = document.querySelector("#homePage");
const savedPokemon = document.querySelector("#savedJobs");
const pokeElement = document.querySelector("#poke");
const searchBtn = document.querySelector("#searchBtn");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");

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

//search for pokemon by name
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



//here to go fast to the top by goUpBtn
const ScrollBtn = document.querySelector("#ScrollBtn");
window.addEventListener("scroll", () => {
  let y = window.screenY;
  console.log(y);
  ScrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

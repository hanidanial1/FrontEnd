const cards = document.querySelector("#cards");
const homePage = document.querySelector("#homePage");
const loaderParent = document.querySelector("#loaderParent");
 let pokeStorage = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
//to get all Pokemons
const apiUrl = " https://api.pokemontcg.io/v2/cards";
export const pokemonCreate = async () => {
  homePage.innerHTML = "";
  cards.innerHTML = "";
  loaderParent.style.display = "block";
  const res = await fetch(apiUrl);
  const data = await res.json();
  renderPoke(data.data);
};

export const renderPoke = (arr, trueOrFalse = true) => {
  for (let item of arr) {
    const col = document.createElement("div");
    col.classList = "col";
    const cardDiv = document.createElement("div");
    cardDiv.classList = "card d-flex align-items-center m-0";
    const bodyDiv = document.createElement("div");
    bodyDiv.classList = " m-0";
    //to get all companies names and render them
    const p = document.createElement("h3");
    p.classList = "card-text bg-light p-6 text-center text-smaller mt-2";
    p.textContent = item.name;
    //to get all jobs salary and render them
    const salary = document.createElement("p");
    salary.classList = "card-text bg-light m-2  text-smaller ";
    salary.textContent = item.flavorText;
    //to get all companies logo and render them
    const img = document.createElement("img");
    img.classList = "card-img-top m-0";
    img.src = item.images.large;
    img.width = "100%";
    //to get all companies title and render them
    const h5 = document.createElement("h6");
    h5.classList = "card-title fs-6 text-center";
    h5.textContent = item.title;
    h5.style.textDecoration = "underline";
    //to get all jobs data and render them

    //create two buttons for adding to saved Jobs
    const saveBtn = document.createElement("button");
    saveBtn.classList = "btn btn-danger m-4 ";
    saveBtn.textContent = trueOrFalse ? "Save Fav Job 🤍" : "delete From Fav😱";
    trueOrFalse
      ? saveBtn.addEventListener("click", () => {
          const added = document.createElement("p");
          added.classList = "card-text m-0  text-smaller text-center";
          added.textContent = "added successfuly";
          saveBtn.style.display = "none";
          added.style.color = "green";
          saveBtn.after(added);
          for (let i of pokeStorage) {
            if (i.id === item.id) {
              return console.log("here");
            }
          }
          saveBtn.after(added);
          pokeStorage.push(item);
          localStorage.setItem("items", JSON.stringify(pokeStorage));
        })
      : saveBtn.addEventListener("click", () => {
          let newPokeStorage = pokeStorage.filter(
            (element) => element !== item
          );
          localStorage.setItem("items", JSON.stringify(newPokeStorage));
          pokeStorage = newPokeStorage;
          homePage.innerHTML = "";
          cards.innerHTML = "";
          renderPoke(pokeStorage, false);
        });

    //  and linked to there websites
    const seeJob = document.createElement("button");
    seeJob.classList = "btn btn-danger m-4 ";
    seeJob.textContent = "See more";
    seeJob.addEventListener("click", () => {
      window.location = item.cardmarket.url;
    });

    bodyDiv.append(p, img, salary, h5, saveBtn, seeJob);
    cardDiv.appendChild(bodyDiv);
    col.appendChild(cardDiv);
    cards.appendChild(col);
    homePage.appendChild(cards);
  }
  loaderParent.style.display = "none";
};

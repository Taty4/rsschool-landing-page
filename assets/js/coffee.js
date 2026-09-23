import { switchTheme, restoreInputs } from "./theme.js";
import { initBurger } from "./burger.js";

const themesBlock = document.querySelector(".header-theme");
const switchBlock = document.querySelector(".switch-block");

restoreInputs();
initBurger();

themesBlock.addEventListener("change", (event) => {
  const currentTheme = event.target.value || "light";

  switchTheme(currentTheme);
});

const products = await getProducts();
const inputActive = document.querySelector('input[name="switch-item"]:checked');

if (inputActive) {
  renderCards(inputActive.value);
}

switchBlock.addEventListener("change", (event) => {
  const category = event.target.value;

  renderCards(category);
});

function renderCards(currenCategory) {
  const cardsConatiner = document.querySelector(".container-cards");

  cardsConatiner.replaceChildren();

  const currentProducts = products.filter(
    (product) => product.category === currenCategory,
  );

  currentProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
              <div class="card-img">
                <img src="./assets/images/${currenCategory}/${currenCategory}-${index + 1}.webp" alt="${product.name}" />
              </div>
              <div class="card-description">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">
                  ${product.description}
                </p>
                <p class="card-price">$${product.price}</p>
              </div>

    `;

    cardsConatiner.append(card);
  });
}

async function getProducts() {
  try {
    const response = await fetch("./assets/js/products.json");

    if (!response.ok) {
      throw new Error("Error download data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert("Something went wrong! Please, reload page");
  }
}

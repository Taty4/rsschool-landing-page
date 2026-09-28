import { initSwitchTheme } from "./theme.js";
import { initBurger } from "./burger.js";

initSwitchTheme();
initBurger();

const switchBlock = document.querySelector(".switch-block");

const products = await getProducts();
const inputActive = document.querySelector('input[name="switch-item"]:checked');
const cardsConatiner = document.querySelector(".container-cards");
const btnShowAll = document.querySelector(".button-refresh");

let currentCategory;
let allCards = [];

if (inputActive) {
  currentCategory = inputActive.value;
  renderCards();
}

switchBlock.addEventListener("change", (event) => {
  currentCategory = event.target.value;

  renderCards();
});

function renderCards() {
  cardsConatiner.replaceChildren();

  const currentProducts = products.filter(
    (product) => product.category === currentCategory,
  );
  allCards = [];
  currentProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = index;

    card.innerHTML = `
              <div class="card-img">
                <img src="./assets/images/${currentCategory}/${currentCategory}-${index + 1}.webp" alt="${product.name}" />
              </div>
              <div class="card-description">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">
                  ${product.description}
                </p>
                <p class="card-price">$${product.price}</p>
              </div>

    `;
    allCards.push(card);
    cardsConatiner.append(card);
  });

  if (window.innerWidth > 768) {
    showAllCards();
  } else {
    hideCards();
  }
  if (window.innerWidth > 768) {
    showAllCards();
  } else {
    hideCards();
  }
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

const modal = document.querySelector(".modal");
const title = document.querySelector(".modal-title");
const desc = document.querySelector(".modal-desc");
const totalValue = document.querySelector(".total-value");
const sizeOptions = document.querySelector(".size-options");
const additivelOptions = document.querySelector(".additive-options");
const modalImg = document.querySelector(".modal-img");
const btnCloseModal = document.querySelector(".modal-close");

cardsConatiner.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (card) {
    const cardIndex = Number(card.dataset.id);

    renderModal(cardIndex);

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.querySelector("main").setAttribute("inert", "");
    document.querySelector("footer").setAttribute("inert", "");
    document.querySelector("header").setAttribute("inert", "");
  }
});

const selectedOptions = {
  size: "s",
  additions: new Set(),
};

function renderModal(cardIndex) {
  const currentProducts = products.filter(
    (product) => product.category === currentCategory,
  );

  const product = currentProducts[cardIndex];

  title.textContent = product.name;
  desc.textContent = product.description;
  modalImg.src = `./assets/images/${product.category}/${product.category}-${cardIndex + 1}.webp`;

  renderSizeOptions(product);
  renderAdditivesOptions(product);
  updateTotalValue(product);
}

function renderSizeOptions(product) {
  sizeOptions.innerHTML = "";

  Object.keys(product.sizes).forEach((key) => {
    const data = product.sizes[key];
    const chip = document.createElement("button");
    chip.className = `chip ${key === selectedOptions.size ? "is-selected" : ""}`;

    chip.innerHTML = `
            <span class="chip-badge"> ${key} </span>
             <span> ${data.size} </span>
    `;

    chip.addEventListener("click", () => {
      selectedOptions.size = key;
      renderSizeOptions(product);
      updateTotalValue(product);
    });

    sizeOptions.append(chip);
  });
}

function renderAdditivesOptions(product) {
  additivelOptions.innerHTML = "";

  product.additives.forEach((additive, index) => {
    const chip = document.createElement("button");
    chip.className = `chip`;

    chip.innerHTML = `
            <span class="chip-badge"> ${index + 1} </span>
             <span> ${additive.name} </span>
    `;

    chip.addEventListener("click", () => {
      chip.classList.toggle("is-selected");
      selectedOptions.additions.has(additive.name)
        ? selectedOptions.additions.delete(additive.name)
        : selectedOptions.additions.add(additive.name);
      updateTotalValue(product);
    });

    additivelOptions.append(chip);
  });
}

function updateTotalValue(product) {
  const dataSize = product.sizes[selectedOptions.size];
  const dataAdditions = product.additives;

  let costAdditions = 0;

  if (selectedOptions.additions.size > 0) {
    selectedOptions.additions.forEach((value) => {
      const additive = dataAdditions.filter((add) => add.name === value)[0];

      costAdditions += +additive["add-price"];
    });
  }

  totalValue.textContent = `$${(
    +product.price +
    +dataSize["add-price"] +
    +costAdditions
  ).toFixed(2)}`;
}

btnCloseModal.addEventListener("click", closeModal);

function closeModal() {
  selectedOptions.size = "s";
  selectedOptions.additions.clear();

  modal.classList.remove("is-open");
  document.body.style.overflow = "";

  document.querySelector("main").removeAttribute("inert");
  document.querySelector("footer").removeAttribute("inert");
  document.querySelector("header").removeAttribute("inert");
}

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && modal.classList.contains("is-open"))
    closeModal();
});

btnShowAll.addEventListener("click", showAllCards);

let resizeTimer;
let oldWindowSize = window.innerWidth;

if (window.innerWidth > 768) {
  showAllCards();
} else {
  hideCards();
}

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    const newWindowSize = window.innerWidth;

    if (oldWindowSize <= 768 && newWindowSize > 768) showAllCards();
    if (oldWindowSize > 768 && newWindowSize <= 768) hideCards();

    oldWindowSize = newWindowSize;
  }, 100);
});

function showAllCards() {
  btnShowAll.classList.add("hidden");
  allCards.forEach((card) => {
    card.classList.remove("hidden");
  });
}

function hideCards() {
  if (allCards.length <= 4) return;
  btnShowAll.classList.remove("hidden");
  allCards.forEach((card, index) => {
    if (index > 3) {
      card.classList.add("hidden");
    }
  });
}

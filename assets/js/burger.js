const buttonBurger = document.querySelector(".burger-button");
const menuBurger = document.querySelector(".header-nav");
const mainContent = document.querySelector("main");
const footer = document.querySelector("footer");

function closeMenu() {
  document.body.classList.remove("menu-open");

  mainContent.removeAttribute("inert");
  footer.removeAttribute("inert");
}

export function initBurger() {
  let resizeTimer;

  buttonBurger.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");

    mainContent.toggleAttribute("inert", isOpen);
    footer.toggleAttribute("inert", isOpen);
  });

  menuBurger.addEventListener("click", (event) => {
    if (event.target.closest(".nav-item")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    }, 100);
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeMenu();
    }
  });
}

import { switchTheme, restoreInputs } from "./theme.js";

restoreInputs();

const themesBlock = document.querySelector(".header-theme");

themesBlock.addEventListener("change", (event) => {
  const currentTheme = event.target.value || "light";

  switchTheme(currentTheme);
});

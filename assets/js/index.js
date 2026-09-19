import { switchTheme, restoreInputs } from "./theme.js";

const themesBlock = document.querySelector(".header-theme");

restoreInputs();

themesBlock.addEventListener("change", (event) => {
  const currentTheme = event.target.value || "light";

  switchTheme(currentTheme);
});

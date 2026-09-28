const STORAGE_KEY = `theme-taty4-kcnThs7`;
const themesBlock = document.querySelector(".header-theme");

function switchTheme(currentTheme) {
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  localStorage.setItem(STORAGE_KEY, currentTheme);
}

function restoreInputs() {
  const currentTheme = localStorage.getItem(STORAGE_KEY) || "light";
  switchTheme(currentTheme);

  const inputId = currentTheme === "dark" ? "dark-theme" : "light-theme";

  const input = document.getElementById(inputId);
  input.checked = true;
}

export function initSwitchTheme() {
  restoreInputs();

  themesBlock.addEventListener("change", (event) => {
    const currentTheme = event.target.value || "light";

    switchTheme(currentTheme);
  });
}

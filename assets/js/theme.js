const STORAGE_KEY = `theme-taty4-kcnThs7`;

export function switchTheme(currentTheme) {
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  localStorage.setItem(STORAGE_KEY, currentTheme);
}

export function restoreInputs() {
  const currentTheme = localStorage.getItem(STORAGE_KEY) || "light";
  switchTheme(currentTheme);

  const inputId = currentTheme === "dark" ? "dark-theme" : "light-theme";

  const input = document.getElementById(inputId);
  input.checked = true;
}

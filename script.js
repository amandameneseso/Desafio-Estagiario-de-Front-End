tailwind.config = {
  darkMode: "class",
};

const HTML = document.documentElement;
const THEME_KEY = "fitpower_theme";

const themeToggleBtn = document.getElementById("theme-toggle");
const iconMoon = document.getElementById("icon-moon");
const iconSun = document.getElementById("icon-sun");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const yearSpan = document.getElementById("year");

new Vivus(
  "gym",
  {
    type: "delayed",
    duration: 500,
    start: "autostart",
  },
  function (obj) {
    obj.reset().play();
  }
);

new Vivus(
  "heart",
  {
    type: "delayed",
    duration: 500,
    start: "autostart",
  },
  function (obj) {
    obj.reset().play();
  }
);

new Vivus(
  "group",
  {
    type: "delayed",
    duration: 500,
    start: "autostart",
  },
  function (obj) {
    obj.reset().play();
  }
);

// ano atual
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// inicializa tema
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") {
    HTML.classList.add("dark");
  } else if (saved === "light") {
    HTML.classList.remove("dark");
  } else {
    // sem preferência salva → respeita preferencia do sistema
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      HTML.classList.add("dark");
    }
  }
  updateToggleVisual();
})();

function updateToggleVisual() {
  const isDark = HTML.classList.contains("dark");
  // mostrar/ocultar ícones
  if (iconMoon) iconMoon.classList.toggle("hidden", isDark);
  if (iconSun) iconSun.classList.toggle("hidden", !isDark);

  // aria-pressed
  if (themeToggleBtn)
    themeToggleBtn.setAttribute("aria-pressed", String(isDark));
}

// botão de alternância
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    HTML.classList.toggle("dark");
    const isDarkNow = HTML.classList.contains("dark");
    localStorage.setItem(THEME_KEY, isDarkNow ? "dark" : "light");
    updateToggleVisual();
  });
}

// menu mobile
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
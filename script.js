// Configuração do Tailwind para permitir alternância de tema (escuro/claro) com base em uma classe
tailwind.config = {
  darkMode: "class", // O modo escuro será ativado ou desativado com a adição ou remoção da classe 'dark'
};

// Variáveis para elementos do DOM que serão manipulados no código
const HTML = document.documentElement; // Elemento raiz <html> do documento
const THEME_KEY = "fitpower_theme"; // Chave usada para armazenar a preferência de tema no localStorage

// Referências aos botões e ícones que controlam a alternância de tema e o menu mobile
const themeToggleBtn = document.getElementById("theme-toggle");
const iconMoon = document.getElementById("icon-moon");
const iconSun = document.getElementById("icon-sun");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const yearSpan = document.getElementById("year");

// Animações dos ícones de serviço usando o Vivus (para animação SVG)
new Vivus(
  "gym",
  {
    type: "delayed", // Tipo de animação (com atraso)
    duration: 500, // Duração da animação
    start: "autostart", // A animação começa automaticamente
  },
  function (obj) {
    obj.reset().play(); // Reinicia e reproduz a animação sempre que é inicializada
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

// Exibe o ano atual no elemento com id 'year', se ele existir
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Função para inicializar a preferência de tema ao carregar a página
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY); // Tenta obter a preferência de tema salva no localStorage
  if (saved === "dark") {
    HTML.classList.add("dark"); // Se o tema salvo for 'dark', aplica a classe 'dark' no HTML
  } else if (saved === "light") {
    HTML.classList.remove("dark"); // Se o tema for 'light', remove a classe 'dark'
  } else {
    // Se não houver preferência salva, verifica a preferência do sistema
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      HTML.classList.add("dark"); // Caso o sistema esteja no modo escuro, aplica o tema escuro
    }
  }
  updateToggleVisual(); // Atualiza a aparência dos ícones de alternância
})();

// Atualiza os ícones de alternância e o atributo aria-pressed com base no tema atual
function updateToggleVisual() {
  const isDark = HTML.classList.contains("dark"); // Verifica se o tema atual é escuro
  // Alterna a visibilidade dos ícones conforme o tema
  if (iconMoon) iconMoon.classList.toggle("hidden", isDark); // Exibe o ícone da lua se o tema for claro
  if (iconSun) iconSun.classList.toggle("hidden", !isDark); // Exibe o ícone do sol se o tema for escuro

  // Atualiza o atributo 'aria-pressed' para acessibilidade
  if (themeToggleBtn)
    themeToggleBtn.setAttribute("aria-pressed", String(isDark));
}

// Função que alterna entre os temas claro e escuro quando o botão é clicado
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    HTML.classList.toggle("dark"); // Alterna a classe 'dark' no HTML
    const isDarkNow = HTML.classList.contains("dark"); // Verifica o estado atual do tema
    localStorage.setItem(THEME_KEY, isDarkNow ? "dark" : "light"); // Salva a preferência de tema
    updateToggleVisual(); // Atualiza os ícones de alternância
  });
}

// Função que exibe ou oculta o menu mobile ao clicar no botão
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden"); // Alterna a visibilidade do menu mobile
  });
}
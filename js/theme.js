const themeStorageKey = "timed-theme";
const themeRoot = document.documentElement;
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function getInitialTheme() {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(themeStorageKey);
  } catch (error) {
    console.error("Unable to read the saved theme preference.", error);
  }

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

function updateTheme(theme, savePreference) {
  const isDark = theme === "dark";
  themeRoot.dataset.theme = isDark ? "dark" : "light";

  if (themeColorMeta) {
    themeColorMeta.content = isDark ? "#050b18" : "#ffffff";
  }

  const themeButton = document.querySelector(".theme-toggle");
  if (themeButton) {
    themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
    themeButton.setAttribute("aria-pressed", String(isDark));
  }

  if (savePreference) {
    try {
      localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
    } catch (error) {
      console.error("Unable to save the theme preference.", error);
    }
  }
}

updateTheme(getInitialTheme(), false);

function initTheme() {
  const themeButton = document.querySelector(".theme-toggle");

  if (!themeButton) {
    return;
  }

  updateTheme(themeRoot.dataset.theme, false);

  themeButton.addEventListener("click", function () {
    const nextTheme = themeRoot.dataset.theme === "dark" ? "light" : "dark";
    updateTheme(nextTheme, true);
  });
}

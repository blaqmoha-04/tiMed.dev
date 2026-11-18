const featureScripts = ["navigation.js", "animations.js", "interactions.js"];
const scriptFolder = new URL(".", document.currentScript.src);
let loadedScripts = 0;

function initializePortfolio() {
  initTheme();
  initNavigation();
  initAnimations();
  initInteractions();
}

function loadFeatureScript(fileName) {
  const script = document.createElement("script");
  script.src = new URL(fileName, scriptFolder).href;

  script.onload = function () {
    loadedScripts += 1;

    if (loadedScripts === featureScripts.length) {
      initializePortfolio();
    }
  };

  script.onerror = function () {
    console.error("Unable to load portfolio script:", script.src);
  };

  document.head.appendChild(script);
}

featureScripts.forEach(loadFeatureScript);

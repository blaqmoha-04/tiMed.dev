function initNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (!menuButton || !navigation) {
    return;
  }

  const navigationLinks = navigation.querySelectorAll("a");
  const backdrop = document.createElement("div");
  let savedScrollPosition = 0;

  backdrop.className = "mobile-menu-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  document.body.appendChild(backdrop);

  function closeMenu() {
    const menuWasOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.documentElement.classList.remove("nav-open");

    if (menuWasOpen) {
      window.scrollTo(0, savedScrollPosition);
    }
  }

  function openMenu() {
    savedScrollPosition = window.scrollY;
    menuButton.setAttribute("aria-expanded", "true");
    navigation.classList.add("is-open");
    document.documentElement.classList.add("nav-open");
    window.scrollTo(0, savedScrollPosition);
  }

  menuButton.addEventListener("click", function () {
    if (menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", closeMenu);

  navigationLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 650) {
      closeMenu();
    }
  });
}

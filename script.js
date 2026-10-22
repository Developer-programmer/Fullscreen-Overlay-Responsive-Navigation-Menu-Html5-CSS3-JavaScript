const menuToggle = document.querySelector(".menu-toggle");
const menuOverlay = document.querySelector("#site-menu");
const menuLinks = menuOverlay.querySelectorAll("a");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
  menuOverlay.classList.toggle("is-open", isOpen);
  menuOverlay.inert = !isOpen;
  document.body.classList.toggle("menu-open", isOpen);

  if (isOpen) {
    menuLinks[0].focus();
  } else {
    menuToggle.focus();
  }
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    return;
  }

  if (event.key !== "Tab" || menuToggle.getAttribute("aria-expanded") !== "true") {
    return;
  }

  const focusableElements = [menuToggle, ...menuLinks];
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

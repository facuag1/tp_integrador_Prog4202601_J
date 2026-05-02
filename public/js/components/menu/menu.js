document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector("#sidebar");
  const overlay = document.querySelector("#sidebarOverlay");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("is-active");
      overlay.classList.toggle("is-active");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("is-active");
      overlay.classList.remove("is-active");
    });
  }

  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const parent = toggle.parentElement;
      parent.classList.toggle("open");
    });
  });
});

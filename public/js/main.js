document.addEventListener("DOMContentLoaded", () => {
  function initMenuEvents() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const menuBtn = document.querySelector(".menu-toggle");
    const submenuToggles = document.querySelectorAll(".submenu-toggle");

    // Seleccionamos todos los enlaces de navegación 
    const menuLinks = document.querySelectorAll('.nav-link');


    // Lógica de navegación dinámica
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const viewPath = link.getAttribute('data-view');
          
            if (viewPath) {
           
                loadComponent("main-content", viewPath);

                // Opcional: Si es mobile, cerramos el menú al elegir una opción
                if (window.innerWidth < 1024 && sidebar.classList.contains('is-active')) {
                    sidebar.classList.remove('is-active');
                    if(overlay) overlay.classList.remove('is-active');
                }

                // Opcional: Cambiar la clase "active" para pintar el botón seleccionado
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });	
    });


    if (menuBtn && sidebar) {
      menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("is-active");
        if (overlay) overlay.classList.toggle("is-active");
      });
    }

    if (overlay) {
      overlay.addEventListener("click", () => {
        sidebar.classList.remove("is-active");
        overlay.classList.remove("is-active");
      });
    }

    submenuToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        const parent = toggle.closest(".has-submenu");
        parent.classList.toggle("open");
      });
    });
  }

  const loadComponent = async (id, path) => {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`No se encontró el archivo: ${path}`);

      const html = await response.text();
      document.getElementById(id).innerHTML = html;

      if (id === "sidebar-container") {
        initMenuEvents();
      }
    } catch (error) {
      console.error(`Error cargando el componente ${path}:`, error);
    }
  };

  loadComponent("header-container", "public/js/components/header/header.html");
  loadComponent("sidebar-container", "public/js/components/menu/menu.html");
  loadComponent("main-content", "public/views/dashboard-page/dashboard.html");
  
  
});

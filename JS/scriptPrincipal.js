// ==========================================================
// ==== SCRIPT PRINCIPAL (Carrusel + Menú Hamburguesa) ======
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // ==== Carrusel Nosotros ====
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  if (slider && slides.length > 0) {
    let index = 1; // empezamos en el primer slide real
    const slideWidth = slides[0].clientWidth;

    // Clonamos primero y último
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slider.firstChild);

    // Posicionamos al primer slide real
    slider.style.transform = `translateX(${-slideWidth * index}px)`;

    // Función para mover
    function moveToSlide() {
      slider.style.transition = "transform 1s ease-in-out";
      slider.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    // Botones
    nextBtn.addEventListener("click", () => {
      if (index >= slides.length + 1) return; 
      index++;
      moveToSlide();
    });

    prevBtn.addEventListener("click", () => {
      if (index <= 0) return;
      index--;
      moveToSlide();
    });

    // Reset cuando llegamos a clones
    slider.addEventListener("transitionend", () => {
      const realSlides = document.querySelectorAll('.slide');

      if (realSlides[index].id === firstClone.id) {
        slider.style.transition = "none";
        index = 1;
        slider.style.transform = `translateX(${-slideWidth * index}px)`;
      }

      if (realSlides[index].id === lastClone.id) {
        slider.style.transition = "none";
        index = realSlides.length - 2;
        slider.style.transform = `translateX(${-slideWidth * index}px)`;
      }
    });

    // === AUTOPLAY ===
    let autoplayInterval = setInterval(() => {
      nextBtn.click();
    }, 6000);

    slider.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
    slider.addEventListener("mouseleave", () => {
      autoplayInterval = setInterval(() => {
        nextBtn.click();
      }, 4000);
    });
  } else {
    console.warn("No se encontró el carrusel en esta página.");
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
  // ==== Menú hamburguesa responsive ====
  const toggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  if (!toggle || !navbar) {
    console.warn("Menu toggle o navbar no encontrados. Revisa los IDs en el HTML.");
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("show");  // muestra/oculta
    toggle.classList.toggle("open", isOpen);         // animación X
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // cerrar al clicar un enlace (útil en móvil)
  navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("show")) {
        navbar.classList.remove("show");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

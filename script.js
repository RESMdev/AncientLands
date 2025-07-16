// script.js
  function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    const burgerIcon = document.getElementById("burgerIcon");

    menu.classList.toggle("abierto");

    // Cambiar imagen
    burgerIcon.src = menu.classList.contains("abierto")
      ? "/assets/burguerClick.svg"
      : "/assets/burguer.svg";
  }

  // Cierra el menú al hacer clic en un enlace
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById("mobileMenu").classList.remove("abierto");
      document.getElementById("burgerIcon").src = "/assets/burguer.svg";
    });
  });

  window.addEventListener('resize', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  const breakpoint = 768; // ancho máximo para versión móvil
  
  if (window.innerWidth > breakpoint && mobileMenu.classList.contains('abierto')) {
    mobileMenu.classList.remove('abierto'); // Cierra el menú si está abierto
  }
});

// Scroll personalizado
const scrollContainer = document.getElementById('scrollContainer');
const customScrollbar = document.getElementById('customScrollbar');

let isDragging = false;
let startY = 0, startTop = 0;

customScrollbar.style.top = '0px'; // inicial

customScrollbar.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
  startTop = parseFloat(customScrollbar.style.top) || 0;
  customScrollbar.style.cursor = 'grabbing';
  e.preventDefault();
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dy = e.clientY - startY;
  const maxTop = scrollContainer.clientHeight - customScrollbar.clientHeight;
  const newTop = Math.min(Math.max(0, startTop + dy), maxTop);
  customScrollbar.style.top = `${newTop}px`;

  // Sincronizar scroll real
  const scrollPercent = newTop / maxTop;
  const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
  scrollContainer.scrollTop = scrollPercent * maxScroll;
});

window.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    customScrollbar.style.cursor = 'grab';
  }
});

scrollContainer.addEventListener('scroll', () => {
  const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
  const scrollPercent = scrollContainer.scrollTop / maxScroll;
  const maxTop = scrollContainer.clientHeight - customScrollbar.clientHeight;
  customScrollbar.style.top = `${scrollPercent * maxTop}px`;
  
  updateGhastVisibility(); // Asegura visibilidad correcta al hacer scroll
});

function updateGhastVisibility() {
  if (scrollContainer.scrollHeight > scrollContainer.clientHeight) {
    customScrollbar.style.display = 'block';
  } else {
    customScrollbar.style.display = 'none';
  }
}

// Comprobar al cargar y al redimensionar
window.addEventListener('load', updateGhastVisibility);
window.addEventListener('resize', updateGhastVisibility);

// Animación de entrada y salida de página
const supportsPageTransition = performance && performance.navigation && performance.navigation.type !== 1;

  // Solo si NO es recarga
  if (supportsPageTransition) {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.classList.remove('is-exiting');
    });

    document.querySelectorAll('a[href]').forEach(link => {
      const isSameHost = link.hostname === location.hostname;
      const isInternal = link.getAttribute('target') !== '_blank' &&
                         !link.href.includes('#') &&
                         !link.hasAttribute('download');

      if (isSameHost && isInternal) {
        link.addEventListener('click', e => {
          e.preventDefault();
          document.body.classList.add('is-exiting');
          setTimeout(() => {
            window.location.href = link.href;
          }, 150); // Súper rápido: no da tiempo al navegador a pintar negro
        });
      }
    });
  }

//Hovers
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.elementoMenu');
  let activeItem = null;
  let useB = false; // variable para saber qué sufijo usar

  menuItems.forEach(item => {
    const icon = item.querySelector('.icono-menu');
    if (icon) {
      if (icon.src.includes('MenuClickB.svg')) {
        activeItem = item;
        useB = true;
      } else if (icon.src.includes('MenuClick.svg')) {
        activeItem = item;
        useB = false;
      }
    }
  });

  if (!activeItem) return;

  function setActiveImage(normal) {
    const icon = activeItem.querySelector('.icono-menu');
    if (!icon) return;

    if (useB) {
      icon.src = normal ? 'assets/MenuNormalB.svg' : 'assets/MenuClickB.svg';
    } else {
      icon.src = normal ? 'assets/MenuNormal.svg' : 'assets/MenuClick.svg';
    }
  }

  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (item !== activeItem) {
        setActiveImage(true);
      }
    });

    item.addEventListener('mouseleave', () => {
      const anyHover = Array.from(menuItems).some(i => i.matches(':hover'));
      if (!anyHover) {
        setActiveImage(false);
      }
    });
  });
});

//Navegacion Hover Click, etc
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navBtn-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const navItem = document.querySelector(`#navBtn-${id}`);

      if (entry.isIntersecting) {
        // Quitar la clase .active de todos
        navLinks.forEach((link) => link.classList.remove("active"));

        // Agregarla solo al que corresponde
        navItem.classList.add("active");
      }
    });
  },
  {
    threshold: 0.6, // Cambia al 60% de visibilidad
  }
);

sections.forEach((section) => observer.observe(section));

// Propagannda escalado
function resizePropagandadiv() {
  const div = document.querySelector('.Propagandadiv');
  if (!div) return;

  const maxW = 1280;
  const maxH = 894;

  const availableW = window.innerWidth;
  const availableH = window.innerHeight * 0.84; // por 8vh arriba y abajo

  const scaleX = availableW / maxW;
  const scaleY = availableH / maxH;
  const scale = Math.min(scaleX, scaleY, 1); // no escalar más allá del 100%

  div.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', resizePropagandadiv);
window.addEventListener('DOMContentLoaded', resizePropagandadiv);

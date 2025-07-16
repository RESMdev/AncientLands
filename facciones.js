document.querySelectorAll('.tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('click', () => {
    console.log('Tarjeta clickeada');
    tarjeta.classList.toggle('sombra-click');
  });
});

function desactivarScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}


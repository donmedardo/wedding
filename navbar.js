function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('navbar.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('navbar-container').innerHTML = html;
    })
    .then(() => {
      // Reasignar evento al botón después de insertar el HTML
      document.querySelector('.hamburger').addEventListener('click', toggleMenu);
    })
    .catch(err => {
      console.error('Error al cargar navbar:', err);
    });
});
// Selección de elementos del HTML
let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector(".menu");

// Definimos evento click sobre el boton del menú
burger.addEventListener("click", function() {

    burger.classList.toggle("fa-bars");
    burger.classList.toggle("fa-times");
    menu_opt.classList.toggle("menu-show");

});




(() => {
  const texts = document.querySelectorAll(".text-block");
  const images = document.querySelectorAll(".background img");
  const total = texts.length;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // índice según la sección de scroll
  
    const index = Math.floor(scrollY / (vh * 0.8));


    texts.forEach((el, i) => {
      if (i === index) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  });
})();
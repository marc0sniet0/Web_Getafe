// Selección de elementos del HTML
let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector(".menu");

// Definimos evento click sobre el boton del menú
burger.addEventListener("click", function() {

    burger.classList.toggle("fa-bars");
    burger.classList.toggle("fa-times");
    menu_opt.classList.toggle("menu-show");

});


/* /////////TARJETAS///////// */

const cards = document.querySelectorAll('.card');
const nextSection = document.querySelector('.next-section');

const triggers = [0.12, 0.28, 0.44, 0.60, 0.76];
const entranceWindow = 0.08;

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const windowH = window.innerHeight;
  const docH = document.body.scrollHeight;
  const scrollPercent = scrollY / (docH - windowH);

  cards.forEach((card, index) => {
    const trigger = triggers[index];
    const entranceProgress = clamp(
      (scrollPercent - (trigger - entranceWindow)) / entranceWindow,
      0, 1
    );

    if (scrollPercent < trigger - entranceWindow) {
      card.style.opacity = 0;
      card.style.transform = "translate(-50%, 120%) scale(1)";
      return;
    }

    if (entranceProgress < 1) {
      const yOffset = 120 - entranceProgress * 170;
      card.style.opacity = 1;
      card.style.transform = `translate(-50%, ${yOffset}%) scale(1)`;
      card.style.zIndex = index + 1;
      return;
    }

    const depth = Math.max(0, scrollPercent - trigger);
    const scale = clamp(1 - depth * 0.6, 0.5, 1);
    const yOffset = clamp(-50 - depth * 40, -92, -50);
    card.style.opacity = 1;
    card.style.transform = `translate(-50%, ${yOffset}%) scale(${scale})`;
    card.style.zIndex = index + 1;
  });

  
});



/* /////////VISIT IMPRES///////// */

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
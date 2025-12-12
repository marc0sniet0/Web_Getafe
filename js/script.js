
let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector(".menu");


burger.addEventListener("click", function() {

    burger.classList.toggle("fa-bars");
    burger.classList.toggle("fa-times");
    menu_opt.classList.toggle("menu-show");

});


/* /////////TARJETAS///////// */

const cards = document.querySelectorAll('.card');
const nextSection = document.querySelector('.next-section');

const triggers = [0.25, 0.40, 0.55, 0.70, 0.85];
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




/////EVENTOS/////

const track = document.querySelector('.carousel-track');
track.innerHTML += track.innerHTML;




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
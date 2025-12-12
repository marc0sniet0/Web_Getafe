
let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector(".menu");


burger.addEventListener("click", function() {

    burger.classList.toggle("fa-bars");
    burger.classList.toggle("fa-times");
    menu_opt.classList.toggle("menu-show");

});


(() => {
  const imgs = Array.from(document.querySelectorAll(".stage img"));
  const texts = Array.from(document.querySelectorAll(".text-block"));
  const draggables = Array.from(document.querySelectorAll(".draggable-img"));
  const N = imgs.length;

  const dropped = new Array(N).fill(false);

  const smooth = (t) => 1 - Math.pow(1 - t, 3);
  const clamp01 = (x) => Math.max(0, Math.min(1, x));

  const render = () => {
    const vh = window.innerHeight;
    const s = window.scrollY / vh;
    const i = Math.round(s);   
    const t = clamp01(s - i);

    const curr = Math.max(0, Math.min(i, N - 1));
    const next = Math.min(i + 1, N - 1);

    const fadeIn = smooth(t);
    const fadeOut = 1 - smooth(t);

   
    for (let k = 0; k < N; k++) {
      imgs[k].style.opacity = 0;
      imgs[k].style.transform = "translateY(0) scale(1)";
      texts[k].classList.remove("active");
    }

   
    imgs[curr].style.opacity = fadeOut;
    imgs[next].style.opacity = fadeIn;

    
    const parallaxAmt = 20; 
    const zoomAmt = 0.015;  
    imgs[curr].style.transform = `translateY(${(-t) * parallaxAmt}px) scale(${1 + (1 - t) * zoomAmt})`;
    imgs[next].style.transform = `translateY(${(1 - t) * parallaxAmt}px) scale(${1 + t * zoomAmt})`;

    
    if (fadeOut >= 0.5) texts[curr].classList.add("active");
    if (fadeIn >= 0.5)  texts[next].classList.add("active");

   
    for (let k = 0; k <= curr; k++) {
      if (!dropped[k]) {
        draggables[k].style.display = "block";
      }
    }
  };

  window.addEventListener("scroll", () => requestAnimationFrame(render), { passive: true });
  window.addEventListener("resize", render);
  render();

  
  window.__DRAG_STATE__ = { dropped, render };
})();



$(function() {
  const $droppable = $("#droppable");
  const state = window.__DRAG_STATE__;
  const dropped = state.dropped;

  
  $(".draggable-img").each(function(index) {
    $(this).draggable({
      revert: "invalid",
      containment: "window",
      scroll: false
    });
  });

  
  $droppable.droppable({
    tolerance: "intersect",
    drop: function(event, ui) {
      const $drag = ui.draggable;
      const idx = $(".draggable-img").index($drag);

      if (idx >= 0) dropped[idx] = true;

      
      $drag.appendTo($droppable);

      
      const spacing = 100; 
      const startX = 20;   
      const startY = 20;   
      const col = idx % 3;
      const row = Math.floor(idx / 3);

      const posX = startX + col * spacing;
      const posY = startY + row * spacing;

      $drag.css({
        position: "absolute",
        left: `${posX}px`,
        top: `${posY}px`,
        transform: "none",
        zIndex: 3
      });

      
      $drag.draggable("disable");
      $drag.css({ cursor: "default", pointerEvents: "none" });

      
      $droppable.find(".drop-msg").html("Sigue añadiendo!");

      
      const count = dropped.filter(Boolean).length;
      $droppable.find(".drop-counter").html(`${count}/5`);

      
      if (count === 5) {
        $("#modal").fadeIn();
      }

      
      state.render();
    }
  });

  
  $("#closeModal").on("click", function() {
        $("#modal").fadeOut();
    });

    
    $(".close").on("click", function() {
    $("#modal").fadeOut();
    });


    $("#closeModal").on("click", function() {
    window.location.href = "index.html"; 
    });

 
    $(window).on("click", function(event) {
    if ($(event.target).is("#modal")) {
        $("#modal").fadeOut();
    }
    });

});




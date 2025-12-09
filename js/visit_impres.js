// ------ Scroll + crossfade + draggables persistentes ------
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
    const i = Math.round(s);   // usamos round para que aparezcan antes
    const t = clamp01(s - i);

    const curr = Math.max(0, Math.min(i, N - 1));
    const next = Math.min(i + 1, N - 1);

    const fadeIn = smooth(t);
    const fadeOut = 1 - smooth(t);

    // Reset imágenes y textos
    for (let k = 0; k < N; k++) {
      imgs[k].style.opacity = 0;
      imgs[k].style.transform = "translateY(0) scale(1)";
      texts[k].classList.remove("active");
    }

    // Crossfade
    imgs[curr].style.opacity = fadeOut;
    imgs[next].style.opacity = fadeIn;

    // Parallax vertical + zoom sutil
    const parallaxAmt = 20; // px
    const zoomAmt = 0.015;  // 1.5%
    imgs[curr].style.transform = `translateY(${(-t) * parallaxAmt}px) scale(${1 + (1 - t) * zoomAmt})`;
    imgs[next].style.transform = `translateY(${(1 - t) * parallaxAmt}px) scale(${1 + t * zoomAmt})`;

    // Texto activo dentro del marco
    if (fadeOut >= 0.5) texts[curr].classList.add("active");
    if (fadeIn >= 0.5)  texts[next].classList.add("active");

    // Mostrar el draggable actual y mantener visibles los anteriores
    for (let k = 0; k <= curr; k++) {
      if (!dropped[k]) {
        draggables[k].style.display = "block";
      }
    }
  };

  window.addEventListener("scroll", () => requestAnimationFrame(render), { passive: true });
  window.addEventListener("resize", render);
  render();

  // Exponer estado para el bloque jQuery
  window.__DRAG_STATE__ = { dropped, render };
})();


// ------ jQuery UI: arrastrar y soltar ------
$(function() {
  const $droppable = $("#droppable");
  const state = window.__DRAG_STATE__;
  const dropped = state.dropped;

  // Inicializar todos los draggables
  $(".draggable-img").each(function(index) {
    $(this).draggable({
      revert: "invalid",
      containment: "window",
      scroll: false
    });
  });

  // Configurar el droppable del marco
  $droppable.droppable({
    tolerance: "intersect",
    drop: function(event, ui) {
      const $drag = ui.draggable;
      const idx = $(".draggable-img").index($drag);

      if (idx >= 0) dropped[idx] = true;

      // Insertar dentro del marco
      $drag.appendTo($droppable);

      // Distribuir en posiciones únicas dentro del marco
      const spacing = 100; // px entre imágenes
      const startX = 20;   // margen izquierdo
      const startY = 20;   // margen superior
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

      // Desactivar interacción futura
      $drag.draggable("disable");
      $drag.css({ cursor: "default", pointerEvents: "none" });

      // Feedback visual: solo texto, sin cambiar color
      $droppable.find(".drop-msg").html("Dropped!");

      // Actualizar contador
      const count = dropped.filter(Boolean).length;
      $droppable.find(".drop-counter").html(`${count}/5`);

      // Si ya están las 5 imágenes, mostrar modal
      if (count === 5) {
        $("#modal").fadeIn();
      }

      // Re-render para mantener visibles los demás
      state.render();
    }
  });

  // Cerrar modal
  $("#closeModal").on("click", function() {
        $("#modal").fadeOut();
    });

    // Cerrar modal con la X
    $(".close").on("click", function() {
    $("#modal").fadeOut();
    });

    // Botón "Cerrar" redirige a otra página
    $("#closeModal").on("click", function() {
    window.location.href = "https://tupagina.com"; // cambia por tu URL
    });

    // Cerrar modal si haces click fuera del contenido
    $(window).on("click", function(event) {
    if ($(event.target).is("#modal")) {
        $("#modal").fadeOut();
    }
    });

});




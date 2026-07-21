/* Toolset cover-flow shelves · each category row is a scroll-driven
   cover flow: cards rotate in 3D around the centered one (iPod landscape
   style). Click a side card to center it; click the centered card to flip
   it and read the detail on its back. */
(function () {
  "use strict";

  var shell = document.querySelector(".cf-shell");
  if (!shell) return;

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* distance of a card from its row's center, in card-widths.
     Returns null when layout isn't measurable (e.g. before first paint). */
  var offsetOf = function (row, card) {
    var rowRect = row.getBoundingClientRect();
    var cardRect = card.getBoundingClientRect();
    if (!rowRect.width || !cardRect.width) return null;
    var rowCenter = rowRect.left + rowRect.width / 2;
    var cardCenter = cardRect.left + cardRect.width / 2;
    return (cardCenter - rowCenter) / cardRect.width;
  };

  var unflip = function (card) {
    if (card.classList.contains("is-flipped")) {
      card.classList.remove("is-flipped");
      card.setAttribute("aria-pressed", "false");
    }
  };

  /* the cover-flow transform pass for one row */
  var applyFlow = function (row) {
    row.querySelectorAll(".cf-card").forEach(function (card) {
      var d = offsetOf(row, card);
      if (d === null) return;
      var ad = Math.abs(d);
      var isCenter = ad < 0.5;

      if (!reduced) {
        var rot = Math.max(-48, Math.min(48, -d * 32));
        var scale = 1 - Math.min(ad * 0.07, 0.18);
        var z = -Math.min(ad * 46, 150);
        card.style.transform =
          "translateZ(" + z + "px) rotateY(" + rot + "deg) scale(" + scale + ")";
      }
      card.style.zIndex = String(100 - Math.min(99, Math.round(ad * 10)));
      card.classList.toggle("is-center", isCenter);
      if (!isCenter) unflip(card); /* fold cards back as they leave center */
    });
  };

  var centerCard = function (row, card, instant) {
    row.scrollTo({
      left:
        card.offsetLeft - (row.clientWidth - card.offsetWidth) / 2,
      behavior: instant || reduced ? "auto" : "smooth",
    });
  };

  shell.querySelectorAll(".shelf-row-wrap").forEach(function (wrap) {
    var row = wrap.querySelector(".shelf-row");
    if (!row) return;

    var cards = Array.prototype.slice.call(row.querySelectorAll(".cf-card"));

    /* index of the card currently nearest the center */
    var centeredIndex = function () {
      var best = 0;
      var bestDist = Infinity;
      cards.forEach(function (card, i) {
        var d = offsetOf(row, card);
        if (d !== null && Math.abs(d) < bestDist) {
          bestDist = Math.abs(d);
          best = i;
        }
      });
      return best;
    };

    /* ---------- edge fades ---------- */
    var updateFades = function () {
      var max = row.scrollWidth - row.clientWidth;
      wrap.classList.toggle("can-left", row.scrollLeft > 6);
      wrap.classList.toggle("can-right", max > 6 && row.scrollLeft < max - 6);
    };


    /* ---------- scroll → flow (rAF-throttled) + hide arrow while scrolling ---------- */
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        applyFlow(row);
        updateFades();
        ticking = false;
      });
    };

    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    /* ---------- clicks: center first, flip when centered ---------- */
    row.querySelectorAll(".cf-card").forEach(function (card) {
      card.addEventListener("click", function () {
        if (card.dataset.dragging === "1") return;
        var d = offsetOf(row, card);
        if (d !== null && Math.abs(d) >= 0.5) {
          centerCard(row, card);
          return;
        }
        var flipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", flipped ? "true" : "false");
      });
    });

    /* ---------- mouse drag-to-scroll ---------- */
    var down = false;
    var moved = false;
    var startX = 0;
    var startScroll = 0;

    row.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = e.clientX;
      startScroll = row.scrollLeft;
    });

    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 6) {
        moved = true;
        row.classList.add("is-dragging");
        row.querySelectorAll(".cf-card").forEach(function (c) {
          c.dataset.dragging = "1";
        });
      }
      if (moved) row.scrollLeft = startScroll - dx;
    });

    window.addEventListener("pointerup", function () {
      if (!down) return;
      down = false;
      row.classList.remove("is-dragging");
      setTimeout(function () {
        row.querySelectorAll(".cf-card").forEach(function (c) {
          delete c.dataset.dragging;
        });
      }, 0);
    });

    /* ---------- init: open on the middle card so the shelf reads full ---------- */
    var openAtMiddle = function () {
      if (!cards.length) return;
      centerCard(row, cards[Math.floor((cards.length - 1) / 2)], true);
      applyFlow(row);
      updateFades();
    };

    openAtMiddle();
    row._openAtMiddle = openAtMiddle;
  });

  /* re-run once fonts/layout settle, so the centering lands accurately */
  window.addEventListener("load", function () {
    shell.querySelectorAll(".shelf-row").forEach(function (row) {
      if (row._openAtMiddle) row._openAtMiddle();
    });
  });
})();

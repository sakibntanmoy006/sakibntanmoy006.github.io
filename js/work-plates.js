/* Crafted with Code · exhibition plates.
   Hovering (or focusing) a work in the index swaps the framed plate on the
   left; clicking anywhere opens the project. */
(function () {
  "use strict";

  var plate = document.getElementById("work-plate");
  var caption = document.getElementById("wp-caption");
  if (!plate || !caption) return;

  var imgs = plate.querySelectorAll(".wp-img");
  var rows = document.querySelectorAll(".wk-row");
  if (!imgs.length || !rows.length) return;

  var activate = function (row) {
    var i = parseInt(row.getAttribute("data-i"), 10);
    if (isNaN(i) || !imgs[i]) return;

    rows.forEach(function (r) {
      r.classList.toggle("is-active", r === row);
    });
    imgs.forEach(function (img, k) {
      img.classList.toggle("is-active", k === i);
    });
    caption.textContent = row.getAttribute("data-caption") || "";
    plate.setAttribute("href", row.getAttribute("href"));
  };

  rows.forEach(function (row) {
    row.addEventListener("mouseenter", function () {
      activate(row);
    });
    row.addEventListener("focus", function () {
      activate(row);
    });
  });
})();

/* Where I Work Best · dossier index accordion.
   One dossier open at a time; clicking the open one closes it. */
(function () {
  "use strict";

  var items = document.querySelectorAll(".dx-item");
  if (!items.length) return;

  items.forEach(function (item) {
    var head = item.querySelector(".dx-head");
    if (!head) return;

    head.addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");

      items.forEach(function (other) {
        other.classList.remove("is-open");
        var h = other.querySelector(".dx-head");
        if (h) h.setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("is-open");
        head.setAttribute("aria-expanded", "true");
      }
    });
  });
})();

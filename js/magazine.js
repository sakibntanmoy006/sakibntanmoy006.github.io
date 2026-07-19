/* Editorial portfolio — interactions */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    .matches;

  /* Dark / light mode toggle (theme is pre-applied in <head> to avoid flash) */
  var themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var dark = document.documentElement.classList.toggle("dark-mode");
      try {
        localStorage.setItem("darkMode", dark ? "enabled" : "disabled");
      } catch (e) {}
    });
  }

  /* Mobile menu toggle */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.textContent = open ? "Close" : "Menu";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.textContent = "Menu";
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Digit-scramble decode effect (used on section numbers) */
  var scramble = function (el) {
    if (reducedMotion || !el || el.dataset.scrambled) return;
    el.dataset.scrambled = "1";
    var final = el.textContent;
    var frame = 0;
    var total = 14;
    var iv = setInterval(function () {
      frame++;
      var out = "";
      for (var i = 0; i < final.length; i++) {
        var ch = final.charAt(i);
        if (!/[0-9]/.test(ch)) {
          out += ch;
        } else if (frame / total > (i + 1) / final.length) {
          out += ch;
        } else {
          out += Math.floor(Math.random() * 10);
        }
      }
      el.textContent = out;
      if (frame >= total) {
        clearInterval(iv);
        el.textContent = final;
      }
    }, 40);
  };

  /* Reveal on scroll — elements arriving together get a small stagger */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length && !reducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        var delay = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          el.style.transitionDelay = delay + "ms";
          el.classList.add("visible");
          io.unobserve(el);
          if (el.classList.contains("section-head")) {
            scramble(el.querySelector(".section-no"));
          }
          /* clear the delay afterwards so hover transitions stay snappy */
          setTimeout(function () {
            el.style.transitionDelay = "";
          }, 900 + delay);
          delay += 90;
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* Eased smooth scrolling for same-page anchor links */
  var animateScroll = function (toY) {
    var fromY = window.scrollY;
    var dist = toY - fromY;
    var root = document.documentElement;
    if (reducedMotion || Math.abs(dist) < 4) {
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, toY);
      root.style.scrollBehavior = "";
      return;
    }
    /* disable native smooth scrolling so it doesn't fight the rAF easing */
    root.style.scrollBehavior = "auto";
    var dur = Math.min(1100, 450 + Math.abs(dist) * 0.2);
    var start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      p = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      window.scrollTo(0, fromY + dist * p);
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        root.style.scrollBehavior = "";
      }
    };
    requestAnimationFrame(step);
  };

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href*='#']") : null;
    if (!a) return;
    var url;
    try {
      url = new URL(a.href, location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== location.origin || url.pathname !== location.pathname)
      return;
    var hash = url.hash;
    if (!hash) return;
    if (hash === "#top") {
      e.preventDefault();
      animateScroll(0);
      return;
    }
    var target = document.getElementById(hash.slice(1));
    if (!target) return;
    e.preventDefault();
    var header = document.querySelector(".masthead");
    var offset = (header ? header.offsetHeight : 76) + 4;
    var y = target.getBoundingClientRect().top + window.scrollY - offset;
    animateScroll(Math.max(0, y));
    if (history.pushState) history.pushState(null, "", hash);
  });

  /* Hero terminal — typed rotating roles */
  var termText = document.querySelector(".term-text");
  if (termText) {
    var roles = [];
    try {
      roles = JSON.parse(termText.getAttribute("data-roles")) || [];
    } catch (err) {
      roles = [];
    }
    if (roles.length) {
      if (reducedMotion) {
        termText.textContent = roles[0];
      } else {
        var ri = 0;
        var ci = 0;
        var deleting = false;
        var tick = function () {
          var word = roles[ri];
          if (!deleting) {
            ci++;
            termText.textContent = word.slice(0, ci);
            if (ci === word.length) {
              deleting = true;
              setTimeout(tick, 2400);
              return;
            }
            setTimeout(tick, 55 + Math.random() * 65);
          } else {
            ci--;
            termText.textContent = word.slice(0, ci);
            if (ci === 0) {
              deleting = false;
              ri = (ri + 1) % roles.length;
              setTimeout(tick, 400);
              return;
            }
            setTimeout(tick, 28);
          }
        };
        setTimeout(tick, 900);
      }
    }
  }

  /* Console signature */
  if (window.console && console.log) {
    console.log(
      "%c SNT %c data · compliance · code %c sakibntanmoy006.github.io",
      "background:#c2401f;color:#f6f3ec;padding:3px 8px;font-family:monospace;font-weight:bold",
      "background:#16130f;color:#f6f3ec;padding:3px 8px;font-family:monospace",
      "color:#8b8377;padding:3px 4px;font-family:monospace"
    );
  }

  /* Scroll progress bar + scrollspy (active nav link) */
  var progress = document.querySelector(".scroll-progress");
  var navLinks = document.querySelectorAll(".nav-links a[href*='#']");
  var spyTargets = [];
  navLinks.forEach(function (a) {
    var hash = a.getAttribute("href").split("#")[1];
    var el = hash && document.getElementById(hash);
    if (el) spyTargets.push({ link: a, el: el });
  });

  var ticking = false;
  var onScroll = function () {
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
    }
    if (spyTargets.length) {
      var current = null;
      var line = window.innerHeight * 0.4;
      spyTargets.forEach(function (t) {
        if (t.el.getBoundingClientRect().top <= line) current = t;
      });
      spyTargets.forEach(function (t) {
        t.link.classList.toggle("active", t === current);
      });
    }
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  /* Stat counters — count up when they enter the viewport */
  var counters = document.querySelectorAll("[data-count]");
  var runCounter = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var pad = function (n) {
      return n < 10 ? "0" + n : "" + n;
    };
    if (reducedMotion || !("requestAnimationFrame" in window)) {
      el.textContent = pad(target);
      return;
    }
    var start = null;
    var dur = 1300;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      p = 1 - Math.pow(1 - p, 3);
      el.textContent = pad(Math.round(target * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            cio.unobserve(entry.target);
            runCounter(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) {
      cio.observe(el);
    });
  } else {
    counters.forEach(runCounter);
  }

  /* Magnetic buttons — drift a few pixels toward the cursor */
  if (finePointer && !reducedMotion) {
    var magnets = document.querySelectorAll(
      ".btn-editorial, .nav-email-btn, .social-btn"
    );
    magnets.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        el.style.transform =
          "translate(" + (x * 3).toFixed(1) + "px, " + (y * 3).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* Gentle 3D tilt — hero portrait */
  if (finePointer && !reducedMotion) {
    var tiltEls = document.querySelectorAll(".hero-photo-frame");
    tiltEls.forEach(function (el) {
      var host = el;
      host.addEventListener("mousemove", function (e) {
        var r = host.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        host.style.setProperty("--ry", (x * 3).toFixed(2) + "deg");
        host.style.setProperty("--rx", (-y * 3).toFixed(2) + "deg");
      });
      host.addEventListener("mouseleave", function () {
        host.style.setProperty("--ry", "0deg");
        host.style.setProperty("--rx", "0deg");
      });
    });
  }
})();

/* Audit Desk · hero easter-egg mini-game.
   Loose records drift across the hero. A live audit rule is pinned at the
   top and rotates mid-round; stamp the violating records before they escape
   off the left edge. Correct rejection +10, false flag −15, escape −5. */
(function () {
  "use strict";

  var hero = document.querySelector(".hero");
  var layer = document.getElementById("audit-desk");
  if (!hero || !layer) return;

  var fine =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced || window.innerWidth < 1024) {
    layer.style.display = "none";
    var pinEl = document.getElementById("ad-pin");
    if (pinEl) pinEl.style.display = "none";
    return;
  }

  var stage = document.getElementById("ad-stage");
  var pin = document.getElementById("ad-pin");
  var startBtn = document.getElementById("ad-start");
  var panel = document.getElementById("ad-panel");
  var ruleBox = document.getElementById("ad-rule");
  var ruleText = document.getElementById("ad-rule-text");
  var scoreEl = document.getElementById("ad-score");
  var accEl = document.getElementById("ad-acc");
  var clockEl = document.getElementById("ad-clock");
  var closeBtn = document.getElementById("ad-close");
  var brief = document.getElementById("ad-brief");
  var beginBtn = document.getElementById("ad-begin");

  /* tuning */
  var ROUND = 45; /* seconds per shift */
  var RULE_EVERY = 15; /* seconds between rule updates */
  var BAD_RATIO = 0.42; /* share of spawned records that violate the rule */
  var GLITCHES = ["NULL", "#ERR"];

  /* rule set · each can generate a violating / clean value and judge one */
  var RULES = [
    {
      text: "reject values > 60.00",
      makeBad: function () { return (61 + Math.random() * 34).toFixed(2); },
      makeClean: function () { return (18 + Math.random() * 40).toFixed(2); },
      isBad: function (v) {
        var n = parseFloat(v);
        return !isNaN(n) && n > 60;
      },
    },
    {
      text: "reject values < 30.00",
      makeBad: function () { return (5 + Math.random() * 24).toFixed(2); },
      makeClean: function () { return (31 + Math.random() * 55).toFixed(2); },
      isBad: function (v) {
        var n = parseFloat(v);
        return !isNaN(n) && n < 30;
      },
    },
    {
      text: "reject NULL / #ERR records",
      makeBad: function () {
        return GLITCHES[Math.floor(Math.random() * GLITCHES.length)];
      },
      makeClean: function () { return (20 + Math.random() * 60).toFixed(2); },
      isBad: function (v) { return isNaN(parseFloat(v)); },
    },
  ];

  var state = "idle"; /* idle | playing | over */
  var cards = []; /* { el, x, y, baseY, phase, value, judged } */
  var score = 0, hits = 0, falseFlags = 0, misses = 0;
  var clock = ROUND, ruleIdx = 0, ruleTimer = 0, spawnTimer = 0;
  var recNo = 100;
  var rafId = null, lastTs = null;

  var heroRect = function () {
    return hero.getBoundingClientRect();
  };

  var rule = function () {
    return RULES[ruleIdx % RULES.length];
  };

  /* ---------- UI helpers ---------- */
  var setRule = function (idx, flash) {
    ruleIdx = idx;
    ruleText.textContent = rule().text;
    if (flash) {
      ruleBox.classList.remove("is-updating");
      void ruleBox.offsetWidth; /* restart animation */
      ruleBox.classList.add("is-updating");
    }
  };

  var accuracy = function () {
    var total = hits + falseFlags + misses;
    return total === 0 ? null : Math.round((hits / total) * 100);
  };

  var renderHud = function () {
    scoreEl.textContent = score;
    var acc = accuracy();
    accEl.textContent = acc === null ? "--" : acc + "%";
    clockEl.textContent = Math.ceil(clock);
  };

  var tick = function (x, y, text, bad) {
    var el = document.createElement("span");
    el.className = "ad-tick" + (bad ? " is-bad" : "");
    el.textContent = text;
    el.style.left = x + "px";
    el.style.top = y + "px";
    layer.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 850);
  };

  /* ---------- record cards ---------- */
  var spawnCard = function (r) {
    var bad = Math.random() < BAD_RATIO;
    var value = bad ? rule().makeBad() : rule().makeClean();
    var card = {
      x: r.width + 40,
      baseY: 70 + Math.random() * Math.max(120, r.height - 210),
      phase: Math.random() * Math.PI * 2,
      value: value,
      judged: false,
      el: document.createElement("button"),
    };
    card.y = card.baseY;

    var el = card.el;
    el.type = "button";
    el.className = "ad-card" + (isNaN(parseFloat(value)) ? " is-glitch" : "");
    el.innerHTML =
      '<span class="ad-card-id">rec-' +
      recNo++ +
      '</span><b class="ad-card-val">' +
      value +
      "</b>";
    el.addEventListener("click", function () {
      judgeCard(card);
    });
    stage.appendChild(el);
    cards.push(card);
  };

  var judgeCard = function (card) {
    if (state !== "playing" || card.judged) return;
    card.judged = true;
    card.el.classList.add("is-judged");

    var stamp = document.createElement("span");
    var bad = rule().isBad(card.value); /* judged by the CURRENT rule */

    if (bad) {
      hits++;
      score += 15;
      card.el.classList.add("is-rejected");
      stamp.className = "ad-card-stamp";
      stamp.textContent = "rejected ✗";
      tick(card.x, card.y - 26, "+15");
    } else {
      falseFlags++;
      score -= 15;
      card.el.classList.add("is-void");
      stamp.className = "ad-card-stamp is-void-stamp";
      stamp.textContent = "false flag";
      tick(card.x, card.y - 26, "−15", true);
    }
    card.el.appendChild(stamp);
    renderHud();

    setTimeout(function () {
      removeCard(card);
    }, 650);
  };

  var removeCard = function (card) {
    if (card.el.parentNode) card.el.parentNode.removeChild(card.el);
    var i = cards.indexOf(card);
    if (i > -1) cards.splice(i, 1);
  };

  var clearCards = function () {
    cards.slice().forEach(removeCard);
  };

  /* ---------- game flow ---------- */
  var startGame = function () {
    state = "playing";
    pin.classList.add("ad-hidden");
    panel.hidden = false;
    ruleBox.hidden = false;

    score = 0;
    hits = 0;
    falseFlags = 0;
    misses = 0;
    clock = ROUND;
    ruleTimer = 0;
    spawnTimer = 0;
    recNo = 100 + Math.floor(Math.random() * 300);
    setRule(Math.floor(Math.random() * RULES.length), false);
    renderHud();

    var old = layer.querySelector(".ad-verdict-stamp");
    if (old) old.parentNode.removeChild(old);

    lastTs = null;
    rafId = requestAnimationFrame(loop);
  };

  var finish = function () {
    state = "over";
    cards.forEach(function (c) {
      c.judged = true;
      c.el.classList.add("is-judged", "is-void");
    });

    var acc = accuracy();
    var grade =
      score >= 160
        ? "SENIOR AUDITOR ✓"
        : score >= 70
        ? "STAFF AUDITOR"
        : "INTERN · TRY AGAIN ✗";

    var best = null;
    try {
      best = parseInt(localStorage.getItem("auditDeskBest"), 10);
    } catch (e) {}
    var isBest = score > 0 && (!best || score > best);
    if (isBest) {
      try {
        localStorage.setItem("auditDeskBest", String(score));
      } catch (e) {}
    }

    var stamp = document.createElement("div");
    stamp.className = "ad-verdict-stamp";
    stamp.innerHTML =
      "<span>" +
      grade +
      "</span><small>score " +
      score +
      (acc === null ? "" : " · accuracy " + acc + "%") +
      (isBest ? " · new best" : "") +
      "</small>";
    layer.appendChild(stamp);

    setTimeout(function () {
      clearCards();
    }, 700);
  };

  var reset = function () {
    state = "idle";
    if (rafId) cancelAnimationFrame(rafId);
    clearCards();
    var stamp = layer.querySelector(".ad-verdict-stamp");
    if (stamp) stamp.parentNode.removeChild(stamp);
    panel.hidden = true;
    ruleBox.hidden = true;
    brief.hidden = true;
    pin.classList.remove("ad-hidden");
  };

  /* pin click → show the shift briefing; begin → play; outside click → cancel */
  startBtn.addEventListener("click", function () {
    if (state !== "idle") return;
    pin.classList.add("ad-hidden");
    brief.hidden = false;
  });
  beginBtn.addEventListener("click", function () {
    brief.hidden = true;
    startGame();
  });
  brief.addEventListener("click", function (e) {
    if (e.target === brief) reset();
  });
  closeBtn.addEventListener("click", reset);

  /* ---------- main loop ---------- */
  var loop = function (ts) {
    if (state !== "playing") return;
    if (lastTs === null) lastTs = ts;
    var dt = Math.min((ts - lastTs) / 1000, 0.05);
    lastTs = ts;
    var r = heroRect();
    var elapsed = ROUND - clock;

    clock -= dt;
    if (clock <= 0) {
      renderHud();
      finish();
      return;
    }

    /* rotate the live rule */
    ruleTimer += dt;
    if (ruleTimer >= RULE_EVERY) {
      ruleTimer = 0;
      setRule(ruleIdx + 1, true);
    }

    /* spawn · cadence tightens as the shift wears on */
    spawnTimer += dt;
    var cadence = Math.max(0.85, 1.5 - elapsed * 0.014);
    if (spawnTimer >= cadence) {
      spawnTimer = 0;
      spawnCard(r);
    }

    /* drift · speed ramps with elapsed time */
    var speed = 90 + elapsed * 1.8;
    cards.slice().forEach(function (card) {
      if (card.judged) return;
      card.x -= speed * dt;
      card.phase += dt * 2;
      card.y = card.baseY + Math.sin(card.phase) * 9;
      card.el.style.transform =
        "translate(" +
        card.x +
        "px, " +
        card.y +
        "px) rotate(" +
        Math.sin(card.phase * 0.7) * 2.5 +
        "deg)";

      /* escaped off the left edge */
      if (card.x < -130) {
        if (rule().isBad(card.value)) {
          misses++;
          score -= 5;
          tick(24, card.y, "−5 missed", true);
          renderHud();
        }
        removeCard(card);
      }
    });

    renderHud();
    rafId = requestAnimationFrame(loop);
  };
})();

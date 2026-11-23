const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav: background on scroll + active section link
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const navLinks = [...document.querySelectorAll(".nav-links a")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["work", "projects", "skills", "contact"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
if (menuBtn) {
  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  document.querySelectorAll(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

// Rotating word in the headline
const word = document.querySelector(".rot-word");
const words = ["backends", "APIs", "data pipelines", "scrapers"];
if (word && !reduceMotion) {
  let i = 0;
  setInterval(() => {
    word.classList.add("out");
    setTimeout(() => {
      i = (i + 1) % words.length;
      word.textContent = words[i];
      word.classList.remove("out");
      word.classList.add("in-start");
      requestAnimationFrame(() => requestAnimationFrame(() => word.classList.remove("in-start")));
    }, 350);
  }, 2600);
}

// Cursor spotlight on cards
document.querySelectorAll(".glow-card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// Copy buttons
document.querySelectorAll(".copy").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Copied ✓";
      btn.classList.add("done");
      setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1600);
    } catch { /* clipboard unavailable */ }
  });
});

// Count-up numbers
function countUp(el) {
  const to = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.dec || "0", 10);
  const dur = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (to * eased).toFixed(dec);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Reveal on scroll (+ trigger count-ups)
const targets = document.querySelectorAll(".job, .card, .skill-group, .edu, .contact-card, .stat, .section-head");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
  targets.forEach((el, idx) => {
    el.classList.add("reveal");
    // small stagger for items in the same row
    el.style.transitionDelay = `${(idx % 3) * 70}ms`;
    io.observe(el);
  });
}

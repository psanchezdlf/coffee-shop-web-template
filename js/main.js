"use strict";

/* =========================================================
MAIN JS 
========================================================= */

/* Menú móvil toggle */
const navToggle = document.querySelector(".nav-toggle");
const siteNavs = document.querySelectorAll(".site-nav");

if (navToggle && siteNavs.length) {
  const setOpenState = (open) => {
    siteNavs.forEach((nav) => nav.classList.toggle("open", open));
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentlyOpen = siteNavs[0].classList.contains("open");
    setOpenState(!currentlyOpen);
  });

 
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      setOpenState(false);
    }
  });

 
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpenState(false);
  });

  
  siteNavs.forEach((nav) => {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpenState(false));
    });
  });
}

/* Animación al hacer scroll */
const revealItems = document.querySelectorAll(".section, .hero-panel .card, .service-card, .case-card, .insight-card, .testimonial-card, .cta");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});

/* Funcionalidad del acordeón de FAQ */
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.getAttribute("aria-expanded") === "true";
    item.setAttribute("aria-expanded", isOpen ? "false" : "true");
    const panel = item.nextElementSibling;
    if (panel) {
      panel.hidden = isOpen;
    }
    const icon = item.querySelector(".faq-icon");
    if (icon) {
      icon.textContent = isOpen ? "+" : "–";
    }
  });
});

/* =========================================================
FIN DE MAIN JS
========================================================= */

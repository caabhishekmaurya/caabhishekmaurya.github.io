(() => {
  "use strict";

  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("navLinks");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close section index" : "Open section index");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open section index");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open section index");
      }
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const railLinks = Array.from(document.querySelectorAll("[data-rail]"));
  const trackedSections = Array.from(document.querySelectorAll("[data-track]"));

  if ("IntersectionObserver" in window && railLinks.length && trackedSections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        railLinks.forEach((link) => {
          const active = link.dataset.rail === entry.target.id;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });

    trackedSections.forEach((section) => observer.observe(section));
  }

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("motion-enabled");
    const revealTargets = document.querySelectorAll(".firm-layout,.section-heading-wide,.credential-card,.practice-item,.reference-group,.contact-record");
    const revealObserver = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((item) => {
      item.classList.add("reveal");
      revealObserver.observe(item);
    });
  }
})();
// Smooth scroll for nav and CTAs
function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;

  if (prefersReducedMotion) {
    window.scrollTo(0, top);
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}

document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll-to");
    if (target) smoothScrollToId(target);
  });
});

// Mobile nav toggle
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    header.classList.toggle("is-open");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
    })
  );
}

// Scroll reveal animations
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealEls.forEach((el, index) => {
    el.dataset.delay = String(index % 4);
    observer.observe(el);
  });
} else {
  // Fallback
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Hero parallax effect
const heroCar = document.querySelector(".hero-car");

if (heroCar) {
  const handleParallax = (event) => {
    const rect = heroCar.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -4;
    const rotateY = x * 6;

    heroCar.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const resetParallax = () => {
    heroCar.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  heroCar.addEventListener("mousemove", handleParallax);
  heroCar.addEventListener("mouseleave", resetParallax);
}

// Fake play interaction
const playButton = document.querySelector(".play-button");

if (playButton) {
  playButton.addEventListener("click", () => {
    playButton.classList.add("is-playing");
    playButton.blur();
  });
}

// Simple form handling (demo only)
const visitForm = document.querySelector(".visit-form");

if (visitForm) {
  visitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const btn = visitForm.querySelector("button[type=submit]");
    if (!btn) return;

    const originalText = btn.textContent;
    btn.textContent = "Request sent";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      visitForm.reset();
    }, 1600);
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}


/* Animaties zijn pure verfraaiing: zonder GSAP toont boot.js alle content gewoon.
   prefers-reduced-motion: alles statisch, geen reveal/parallax/tilt. */
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initPageAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".reveal").forEach(function (el) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      }
    );
  });

  /* Subtiele parallax op de hero-foto */
  gsap.to(".hero-bg", {
    yPercent: 12,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  /* Ken Burns: heel trage zoom op de gevelfoto — geeft de hero een filmisch,
     video-achtig gevoel zonder video (en zonder extra bytes). */
  gsap.fromTo(".hero-bg", { scale: 1.02 }, {
    scale: 1.12,
    duration: 26,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
}

if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  initPageAnimations();
} else {
  /* GSAP niet beschikbaar of reduced motion: reveal-verberging uit, alles zichtbaar */
  document.documentElement.classList.remove("js");
}

if (!reduceMotion && window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 4,
    speed: 600,
    glare: true,
    "max-glare": 0.08
  });
}

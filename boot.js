/* Progressive enhancement bootstrap — draait in de <head>, vóór de eerste paint.
   Zet de 'js' class zodat de reveal-animaties alleen verborgen worden als JS
   beschikbaar is. Zonder (of bij falende) JS blijft alle content gewoon zichtbaar,
   in plaats van permanent op opacity:0 te blijven staan op een trage mobiele lijn. */
document.documentElement.classList.add("js");

/* Vangnet: mocht GSAP niet geladen zijn kort na het laden van de pagina
   (bv. mislukte request op 4G/5G), toon dan alsnog alle content. */
window.addEventListener("load", function () {
  setTimeout(function () {
    if (!window.gsap) document.documentElement.classList.remove("js");
  }, 800);
});

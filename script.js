// Fade-in scroll reveal for sections
function revealOnScroll() {
  ["prophecy", "system"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      el.classList.add("visible");
    }
  });
}

document.addEventListener("DOMContentLoaded", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);

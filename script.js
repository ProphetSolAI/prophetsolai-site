// ----- Scroll reveals (optional, future sections can hook) -----
function revealOnScroll() {
  ["prophecy", "system", "framework"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      el.classList.add("visible"); // if you later add .visible transitions
    }
  });
}
document.addEventListener("DOMContentLoaded", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);

// ----- THE FRAMEWORK — Connected Network Animation -----
const fwCanvas = document.getElementById("framework-network");
if (fwCanvas) {
  const ctx = fwCanvas.getContext("2d");
  let nodes = [];
  const COUNT = 70;
  const MAX_DIST = 150;

  function resize() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = document.getElementById("framework").offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < COUNT; i++) {
    nodes.push({
      x: Math.random() * fwCanvas.width,
      y: Math.random() * fwCanvas.height,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6
    });
  }

  function draw() {
    ctx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

    // draw nodes + connections
    for (let i = 0; i < COUNT; i++) {
      const a = nodes[i];
      a.x += a.dx; a.y += a.dy;
      if (a.x < 0 || a.x > fwCanvas.width) a.dx *= -1;
      if (a.y < 0 || a.y > fwCanvas.height) a.dy *= -1;

      ctx.fillStyle = "#00ffff";
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < COUNT; j++) {
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.strokeStyle = `rgba(0,255,255,${alpha * 0.4})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

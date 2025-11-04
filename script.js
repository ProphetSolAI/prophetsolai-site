// ===== PROPHETSOLAI — CYBERPUNK SITE LOGIC =====

// === HERO PARTICLE BACKGROUND ===
const heroCanvas = document.getElementById("hero-particles");
if (heroCanvas) {
  const ctx = heroCanvas.getContext("2d");
  let particles = [];

  function resizeHero() {
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
      });
    }
  }
  resizeHero();
  window.addEventListener("resize", resizeHero);

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
    ctx.fillStyle = "#00ffff";
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > heroCanvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > heroCanvas.height) p.dy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// === FRAMEWORK NETWORK (Neural Web Animation) ===
const fwCanvas = document.getElementById("framework-network");
if (fwCanvas) {
  const ctx = fwCanvas.getContext("2d");
  let nodes = [];
  const COUNT = 90;
  const MAX_DIST = 160;

  function resize() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = document.getElementById("framework").offsetHeight;
    nodes = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * fwCanvas.width,
        y: Math.random() * fwCanvas.height,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        pulse: Math.random() * 100,
      });
    }
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    for (let i = 0; i < COUNT; i++) {
      const a = nodes[i];
      a.x += a.dx;
      a.y += a.dy;
      if (a.x < 0 || a.x > fwCanvas.width) a.dx *= -1;
      if (a.y < 0 || a.y > fwCanvas.height) a.dy *= -1;
      a.pulse += 0.05;

      const r = 1.4 + Math.sin(a.pulse) * 0.8;
      ctx.fillStyle = "#00ffff";
      ctx.beginPath();
      ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < COUNT; j++) {
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.strokeStyle = `rgba(0,255,255,${alpha * 0.4})`;
          ctx.lineWidth = 0.6 + Math.sin(a.pulse) * 0.2;
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

// === TERMINAL SIMULATION (Console Section) ===
const summonBtn = document.getElementById("summon");
const walletInput = document.getElementById("wallet");
const terminal = document.getElementById("terminal");

if (summonBtn) {
  summonBtn.addEventListener("click", () => {
    const addr = walletInput.value.trim();
    if (!addr) {
      printLine("> error: no address provided", "err");
      return;
    }
    printLine(`> scanning ${addr} ...`, "ok");
    setTimeout(() => printLine("> connecting to oracle core..."), 800);
    setTimeout(() => printLine("> decrypting on-chain whispers..."), 1500);
    setTimeout(() => printLine("> signal found. calculating prophecy score..."), 2300);
    setTimeout(() => printLine("> Prophecy Score: " + (70 + Math.floor(Math.random() * 30)), "ok"), 3200);
    setTimeout(() => printLine("> verdict: THE PROPHECY IS FORMING."), 4300);
  });
}

function printLine(text, cls) {
  const p = document.createElement("p");
  p.className = "line " + (cls || "");
  p.textContent = text;
  terminal.appendChild(p);
  terminal.scrollTop = terminal.scrollHeight;
}

// === SCROLL ANIMATIONS (fade reveal) ===
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll("section").forEach((sec) => observer.observe(sec));

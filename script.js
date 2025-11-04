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
// Interactive node info display
const nodes = document.querySelectorAll('.node');
const infoTitle = document.getElementById('info-title');
const infoText = document.getElementById('info-text');

nodes.forEach(node => {
  node.addEventListener('mouseenter', () => {
    infoTitle.textContent = node.getAttribute('data-title');
    infoText.textContent = node.getAttribute('data-text');
  });
  node.addEventListener('mouseleave', () => {
    infoTitle.textContent = '';
    infoText.textContent = '';
  });
});

// Animated network background
const canvas = document.getElementById('framework-network');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const nodes = Array(60).fill().map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      ctx.beginPath();
      ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
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
// === BINARY RAIN EFFECT ===
const binaryCanvas = document.getElementById('binary-rain');
if (binaryCanvas) {
  const ctx = binaryCanvas.getContext('2d');
  binaryCanvas.width = window.innerWidth;
  binaryCanvas.height = window.innerHeight;

  const letters = '01';
  const fontSize = 16;
  const columns = binaryCanvas.width / fontSize;
  const drops = Array.from({ length: columns }).map(() => Math.random() * binaryCanvas.height);

  function drawRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, binaryCanvas.width, binaryCanvas.height);
    ctx.fillStyle = '#00ffe1';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > binaryCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawRain, 35);

  window.addEventListener('resize', () => {
    binaryCanvas.width = window.innerWidth;
    binaryCanvas.height = window.innerHeight;
  });
}

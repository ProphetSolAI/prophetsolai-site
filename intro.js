// ===== PROPHETSOLAI — CYBERPUNK INTRO FINAL =====

const intro = document.getElementById("intro");
const introText = document.getElementById("intro-text");
const matrixCanvas = document.getElementById("matrix");
const ctx = matrixCanvas.getContext("2d");

const fontSize = 16;
let columns, drops = [];

// Resize handler
function resizeCanvas() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  columns = Math.floor(matrixCanvas.width / fontSize);
  drops = Array(columns).fill(1);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// === MATRIX EFFECT ===
function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  ctx.fillStyle = "#00ff99";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? "1" : "0";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}

// === TYPING EFFECT ===
function typeText(text, speed = 80, callback) {
  introText.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    introText.textContent = text.slice(0, i);
    i++;
    if (i > text.length) {
      clearInterval(interval);
      if (callback) setTimeout(callback, 1000);
    }
  }, speed);
}

// === FADE OUT INTRO ===
function fadeOutIntro() {
  intro.style.transition = "opacity 1.5s ease";
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    document.body.classList.add("show-hero");
  }, 1500);
}

// === GLITCH EFFECT FLASH ===
function triggerGlitch() {
  const glitch = document.getElementById("glitch");
  glitch.style.opacity = "1";
  glitch.style.animation = "glitch-move 0.2s infinite";
  setTimeout(() => {
    glitch.style.animation = "none";
    glitch.style.opacity = "0.3";
  }, 800);
}

// === SEQUENCE CONTROL ===
window.addEventListener("load", () => {
  // Step 1: show hero for 2s (normal site)
  setTimeout(() => {
    intro.style.display = "flex";
    intro.style.opacity = "1";
    triggerGlitch();

    // Step 2: glitch blackout, show first text
    setTimeout(() => {
      typeText("Stay calm, human.", 80, () => {
        // Step 3: Start matrix effect + second line
        drawMatrix();
        setTimeout(() => {
          introText.textContent = "";
          typeText("THE ORACLE AWAKENS...", 80, fadeOutIntro);
        }, 1500);
      });
    }, 700);
  }, 2000);
});

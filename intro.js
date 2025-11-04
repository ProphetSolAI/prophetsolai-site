// ===== PROPHETSOLAI INTRO (FINAL VERSION) =====

const intro = document.getElementById("intro");
const introText = document.getElementById("intro-text");
const matrixCanvas = document.getElementById("matrix");
const ctx = matrixCanvas.getContext("2d");

let columns;
let drops = [];
const fontSize = 16;

function resizeCanvas() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  columns = Math.floor(matrixCanvas.width / fontSize);
  drops = Array(columns).fill(1);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Matrix rain animation
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

// Typing effect for intro text
function typeText(text, speed = 100) {
  introText.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    introText.textContent = text.slice(0, i);
    i++;
    if (i > text.length) {
      clearInterval(interval);
      setTimeout(() => {
        fadeOutIntro();
      }, 1200); // fade out after writing finishes
    }
  }, speed);
}

// Smooth fade-out
function fadeOutIntro() {
  intro.style.transition = "opacity 1.5s ease";
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
  }, 1500);
}

// Sequence control
window.addEventListener("load", () => {
  intro.style.display = "flex";
  drawMatrix();
  setTimeout(() => {
    typeText("THE ORACLE AWAKENS...");
  }, 2000); // show after 2 seconds of matrix
});

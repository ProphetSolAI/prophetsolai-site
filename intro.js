// ===== PROPHETSOLAI INTRO (FINAL) =====
const intro = document.getElementById("intro");
const introText = document.getElementById("intro-text");
const matrixCanvas = document.getElementById("matrix");
const mtx = matrixCanvas.getContext("2d");

const fontSize = 16;
let columns = 0;
let drops = [];

function resizeMatrix() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  columns = Math.floor(matrixCanvas.width / fontSize);
  drops = Array(columns).fill(1);
}
window.addEventListener("resize", resizeMatrix);
resizeMatrix();

function drawMatrix() {
  // trail with black base
  mtx.fillStyle = "rgba(0, 0, 0, 0.07)";
  mtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  mtx.fillStyle = "#00ff99";
  mtx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() < 0.5 ? "0" : "1";
    mtx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.95) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}

function typeText(text, speed = 100) {
  introText.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    introText.textContent = text.slice(0, i);
    i++;
    if (i > text.length) {
      clearInterval(interval);
      setTimeout(() => fadeOutIntro(), 1200);
    }
  }, speed);
}

function fadeOutIntro() {
  intro.style.transition = "opacity 1.5s ease";
  intro.style.opacity = "0";
  setTimeout(() => { intro.style.display = "none"; }, 1500);
}

window.addEventListener("load", () => {
  intro.style.display = "flex";
  drawMatrix();
  // FULL TEXT — no cut off
  setTimeout(() => typeText("THE ORACLE AWAKENS..."), 2000);
});

// ProphetSolAI - Matrix + Typewriter Intro (v2)

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? '1' : '0';
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    ctx.fillText(text, x, y);
    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 33);

// Typewriter text
const introText = "The Oracle awakens.";
const textContainer = document.getElementById("intro-text");
let idx = 0;

setTimeout(() => {
  const interval = setInterval(() => {
    if (idx < introText.length) {
      textContainer.textContent += introText[idx];
      idx++;
    } else {
      clearInterval(interval);
    }
  }, 100);
}, 3300);

// Auto hide intro after 8s
setTimeout(() => {
  document.getElementById("intro").style.display = "none";
}, 8000);

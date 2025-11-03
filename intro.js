// ProphetSolAI - Matrix + Typewriter Intro

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(256).join('1').split('');
const fontSize = 14;

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';
  letters.map((y_pos, index) => {
    const text = String.fromCharCode(48 + Math.random() * 2);
    const x_pos = index * fontSize;
    ctx.fillText(text, x_pos, y_pos);
    if (y_pos > 100 + Math.random() * 10000) letters[index] = 0;
    letters[index] = y_pos + fontSize;
  });
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

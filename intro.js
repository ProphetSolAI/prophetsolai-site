// ProphetSolAI - Ultimate Hack Intro (glitch first, matrix second + fixed text + full black background)

setTimeout(() => {
  const intro = document.getElementById("intro");
  intro.style.display = "flex";
  intro.classList.add("active");
  startIntro();
}, 2000);

setTimeout(() => {
  document.getElementById("intro").classList.remove("active");
}, 8000);

function startIntro() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  const letters = "01";

  // --- 1. Glitch patlaması ---
  const glitch = document.getElementById("glitch");
  glitch.style.animation = "glitchFlash 0.15s steps(2,end) 6 alternate";
  glitch.style.opacity = "1";
  setTimeout(() => {
    glitch.style.opacity = "0";
  }, 1000);

  // --- 2. Matrix efekti ---
  setTimeout(() => {
    setInterval(drawMatrix, 33);
  }, 1000);

  function drawMatrix() {
    // TAM SİYAH ARKA PLAN (parlak yeşil kodlar)
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // --- 3. Typewriter metni ---
  const introText = "The Oracle awakens.";
  const textContainer = document.getElementById("intro-text");
  let idx = 0;
  setTimeout(() => {
    textContainer.style.opacity = "1";
    const interval = setInterval(() => {
      if (idx < introText.length) {
        textContainer.textContent += introText[idx];
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }, 2500);

  // --- 4. Intro bitiş ---
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
  }, 8000);
}

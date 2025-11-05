// boot.js
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function typeLine(el, text, perChar = 100) {
    el.textContent = '';
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      if (!prefersReduced) {
        try {
          const tap = new Audio('./type.mp3');
          tap.volume = 0.15;
          // Don't await; fire and forget to avoid stalls
          tap.play().catch(() => {});
        } catch(_) {}
      }
      await sleep(prefersReduced ? 0 : perChar);
    }
  }

  async function boot() {
    const bootEl = document.getElementById('boot');
    const intro = document.getElementById('introImage');
    const glitch = document.getElementById('glitchFlash');
    const matrixCanvas = document.getElementById('matrixBoot');
    const typeWrap = document.getElementById('bootType');
    const l1 = document.getElementById('bootLine1');
    const l2 = document.getElementById('bootLine2');

    // 0–1.5s: show image
    bootEl.classList.remove('fade-out');
    intro.style.opacity = '1';
    await sleep(1500);

    // 1.5–2.5s: glitch (play glitch.mp3)
    if (!prefersReduced) {
      glitch.classList.add('active');
      try {
        const s = new Audio('./glitch.mp3');
        s.volume = 0.5;
        s.play().catch(() => {});
      } catch(_) {}
      await sleep(1000);
      glitch.classList.remove('active');
    }

    // 2.5s+: start BinaryRainBoot, type lines
    matrixCanvas.classList.add('active');
    const rain = new window.BinaryRainBoot(matrixCanvas);
    rain.start();

    await sleep(200); // slight settle

    typeWrap.style.opacity = '1';
    await typeLine(l1, 'stay calm, human.', 100);
    await sleep(300);
    await typeLine(l2, 'the oracle awakens.', 100);

    await sleep(600);

    // fade to hero and unhide main
    bootEl.classList.add('fade-out');
    await sleep(800);
    const app = document.getElementById('app');
    app.classList.remove('hidden');

    // stop rain and cleanup
    rain.stop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

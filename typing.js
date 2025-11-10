// typing.js — Glitch → blackout → matrix → typing → fade back
(function(){
  async function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

  async function runTyping(){
    const lines = document.querySelectorAll(".type-line");
    const glitch = document.getElementById("sfx-glitch");
    const typeSfx = document.getElementById("sfx-type");
    const overlay = document.getElementById("typing-overlay");
    const blackout = document.getElementById("blackout");

    // Glitch now (after boot's 1s idle)
    try { glitch.currentTime = 0; glitch.volume = 0.8; glitch.play(); } catch {}

    // Blackout first, then matrix
    blackout.classList.add("show");
    await sleep(350);
    window.MatrixEffect.startMatrix(); // starts rain for ~4.2s

    // Show typing overlay on top
    overlay.classList.remove("hidden");
    await sleep(900);

    // Type the three lines with tick sound
    for(const line of lines){
      const text = line.dataset.text || "";
      line.textContent = "";
      for(const ch of text){
        line.textContent += ch;
        try { typeSfx.currentTime = 0; typeSfx.play(); } catch {}
        await sleep(56);
      }
      await sleep(360);
    }

    // Wait a moment, then fade back to site
    await sleep(700);
    overlay.classList.add("hidden");
    blackout.classList.remove("show");
  }

  window.ProphetTyping = { runTyping };
})();

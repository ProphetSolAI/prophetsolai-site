// ==========================================================
// ProphetSolAI — typing.js
// Controls intro typing text (Stay Calm, Human...)
// ==========================================================
(function(){
  async function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

  async function runTyping(){
    const lines = document.querySelectorAll(".type-line");
    const glitch = document.getElementById("sfx-glitch");
    const typeSfx = document.getElementById("sfx-type");

    try { glitch.currentTime = 0; glitch.play(); } catch {}

    await sleep(1000); // wait a bit before matrix rain
    window.MatrixEffect.startMatrix();

    const overlay = document.getElementById("typing-overlay");
    overlay.classList.remove("hidden");
    const blackout = document.getElementById("blackout");
    blackout.classList.add("show");

    await sleep(1500);

    for(const line of lines){
      const text = line.dataset.text;
      line.textContent = "";
      for(const ch of text){
        line.textContent += ch;
        try { typeSfx.currentTime = 0; typeSfx.play(); } catch {}
        await sleep(60 + Math.random()*20);
      }
      await sleep(400);
    }

    await sleep(1200);
    overlay.classList.add("hidden");
    blackout.classList.remove("show");
  }

  window.ProphetTyping = { runTyping };
})();

// ==========================================================
// ProphetSolAI — boot.js
// Entry logic: glitch → matrix → typing → site reveal
// ==========================================================
(function(){
  const glitch = document.getElementById("sfx-glitch");
  const enterBtn = document.getElementById("cta-enter");

  async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

  async function startIntro(){
    try { glitch.currentTime = 0; glitch.volume = 0.6; glitch.play(); } catch {}
    await sleep(600);
    await window.ProphetTyping.runTyping();
  }

  enterBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    startIntro();
  });

  // === Scroll reveal logic ===
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("visible"); }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r=>io.observe(r));

  // === Framework list animation ===
  const fxItems = document.querySelectorAll(".fx-item");
  const ioFx = new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        fxItems.forEach((item,j)=>setTimeout(()=>item.classList.add("show"), j*180));
        ioFx.disconnect();
      }
    });
  }, { threshold: 0.2 });
  fxItems.forEach(f=>ioFx.observe(f));

  // === Prophecy button ===
  const btn = document.getElementById("proph-btn");
  const input = document.getElementById("coin-input");
  btn.addEventListener("click", ()=> window.ProphetOracle.prophesy(input.value));
})();

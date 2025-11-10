// boot.js — Auto intro: 1s idle → glitch+blackout → matrix+typing (no click needed)
(function(){
  function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

  async function autoIntro(){
    // 1) show normal page for ~1s
    await sleep(1000);

    // 2) start the typing intro (this plays glitch, triggers blackout, matrix, then types)
    await window.ProphetTyping.runTyping();
    // (runTyping already hides layers at the end and reveals the site)
  }

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.15 });
  reveals.forEach(r=>io.observe(r));

  // Framework list cascade
  const fxItems = document.querySelectorAll(".fx-item");
  const ioFx = new IntersectionObserver(entries=>{
    if(entries.some(e=>e.isIntersecting)){
      fxItems.forEach((el,i)=> setTimeout(()=> el.classList.add("show"), i*180));
      ioFx.disconnect();
    }
  }, { threshold: 0.2 });
  fxItems.forEach(el=>ioFx.observe(el));

  // Prophecy button
  const btn = document.getElementById("proph-btn");
  const input = document.getElementById("coin-input");
  btn.addEventListener("click", ()=> window.ProphetOracle.prophesy(input.value || "$BONK"));

  // Start automatically on load
  window.addEventListener("load", autoIntro);
})();

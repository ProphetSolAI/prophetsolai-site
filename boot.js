// boot.js
(function(){
  const glitch = document.getElementById('sfx-glitch');
  const btnEnter = document.getElementById('cta-enter');
  const app = document.getElementById('app');

  async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

  async function intro(){
    try{ glitch.currentTime = 0; glitch.volume = 0.5; await glitch.play(); }catch{}
    await window.ProphetTyping.runTyping();
  }

  function revealApp(){
    app.classList.remove('hidden');
    app.classList.add('active');
    app.setAttribute('aria-hidden','false');
    document.getElementById('coin-input')?.focus();
  }

  btnEnter?.addEventListener('click', revealApp);

  window.addEventListener('load', async ()=>{
    await sleep(200);
    intro();
  });
})();

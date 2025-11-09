// boot.js — 1s sonra glitch+ses → blackout (full siyah) → matrix → typing → hepsi kapanır → normal site
(function(){
  const glitch = document.getElementById('sfx-glitch');
  const blackout = document.getElementById('blackout');
  const matrix = document.getElementById('matrix-canvas');
  const typing = document.getElementById('typing-overlay');
  const wrap = document.getElementById('typing-wrap');

  const input = document.getElementById('coin-input');
  const btn = document.getElementById('proph-btn');

  function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

  async function intro(){
    await sleep(1000); // 1s normal ekran

    // glitch + full black
    try{ glitch.currentTime=0; glitch.volume=.9; await glitch.play(); }catch(_){}
    blackout.classList.remove('hidden');
    requestAnimationFrame(()=> blackout.classList.add('show')); // fade to black
    await sleep(350);

    // matrix over black
    matrix.classList.remove('hidden');
    await sleep(500);

    // typing over matrix
    typing.classList.remove('hidden');
    await window.ProphetTyping.run(wrap);

    // close layers in order
    await sleep(500);
    typing.classList.add('hidden');
    await sleep(150);
    matrix.classList.add('hidden');
    blackout.classList.remove('show');
    await sleep(320);
    blackout.classList.add('hidden');
  }

  function scrollFx(){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          if(e.target.matches('#framework')){
            [...e.target.querySelectorAll('.fx-item')].forEach((li,i)=>{
              setTimeout(()=>li.classList.add('show'),150*i);
            });
          }
        }
      });
    },{threshold:.2});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }

  function wireTerminal(){
    async function summon(){
      if(input.value.trim().length===0) input.value='$BONK';
      await window.ProphetOracle.prophesy(input.value);
    }
    btn.addEventListener('click',summon);
    input.addEventListener('keydown',(e)=>{if(e.key==='Enter'){e.preventDefault();summon();}});
  }

  window.addEventListener('load',async()=>{
    scrollFx();
    wireTerminal();
    await intro();
  });
})();

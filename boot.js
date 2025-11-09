// boot.js — HACK açılışı: 1sn sonra glitch + blackout → matrix → typing → geri dönüş
(function(){
  const glitch = document.getElementById('sfx-glitch');
  const blackout = document.getElementById('blackout');
  const matrix = document.getElementById('matrix');
  const typing = document.getElementById('typing-overlay');
  const wrap = document.getElementById('typing-wrap');

  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

  async function intro(){
    // 1) 1 saniye normal sayfa
    await sleep(1000);

    // 2) Glitch sesi + blackout görünür (tam siyah)
    try{ glitch.currentTime=0; glitch.volume=.85; await glitch.play(); }catch(_){}
    blackout.classList.remove('hidden');
    // bir frame sonra opacity animasyon
    requestAnimationFrame(()=> blackout.classList.add('show'));
    await sleep(320);

    // 3) Matrix'i SİM SİYAH ekranın üstünde aç
    matrix.classList.remove('hidden');

    // 4) Typing overlay (matrix üstü)
    await sleep(500);
    typing.classList.remove('hidden');
    await window.TypeWriter.run(wrap);

    // 5) Kapat: typing → matrix → blackout
    await sleep(500);
    typing.classList.add('hidden');
    await sleep(150);
    matrix.classList.add('hidden');
    blackout.classList.remove('show');  // fade-out of black screen
    await sleep(300);
    blackout.classList.add('hidden');
  }

  // Scroll efektlerini tetikle
  function scrollFx(){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          // framework list maddelerini sırayla göster
          if(e.target.matches('#framework')){
            [...e.target.querySelectorAll('.fx-item')].forEach((li,i)=>{
              setTimeout(()=>li.classList.add('show'), 150*i);
            });
          }
        }
      });
    },{threshold:.2});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }

  window.addEventListener('load', async ()=>{
    scrollFx();
    await intro();
  });
})();

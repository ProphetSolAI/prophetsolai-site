(function(){
  const opening    = document.getElementById('opening');
  const openingCLI = document.getElementById('opening-cli');
  const glitchSeq  = document.getElementById('glitch-seq');
  const bootRain   = document.getElementById('boot-matrix');
  const intro      = document.getElementById('intro');
  const heroOverlay= document.getElementById('hero-overlay');
  const main       = document.getElementById('main');
  const bootBox    = document.getElementById('boot-typing');
  const line1      = document.getElementById('boot-line-1');
  const line2      = document.getElementById('boot-line-2');
  const line3      = document.getElementById('boot-line-3');

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function type(el, text, speed=34, cb){
    let i=0; el.textContent='';
    (function step(){
      if(i<text.length){ el.textContent += text.charAt(i++); setTimeout(step, speed); }
      else if(cb) cb();
    })();
  }

  function show(el){ el.classList.add('show'); el.classList.remove('hide'); }
  function hide(el){ el.classList.add('hide'); el.classList.remove('show'); }

  function hackGlitchBlast(){
    glitchSeq.classList.add('on','distort');
    opening.classList.add('shake');
    setTimeout(()=> opening.classList.remove('shake'), 900);
    setTimeout(()=> glitchSeq.classList.add('invert'), 250);
    setTimeout(()=> glitchSeq.classList.remove('invert'), 900);
    setTimeout(()=> glitchSeq.classList.remove('on','distort'), 1500);
  }

  function runTimeline(){
    if(prefersReduce){
      opening.style.display='none'; heroOverlay.classList.add('show'); show(main); return;
    }

    // 0s
    setTimeout(()=> openingCLI.textContent = '> initializing ProphetSolAI...', 200);

    // 1.6s – trigger brutal glitch
    setTimeout(()=>{
      openingCLI.textContent='> protocol breach detected...';
      hackGlitchBlast();
    },1600);

    setTimeout(()=> openingCLI.textContent='> entropy spike: 89%', 1900);
    setTimeout(()=> openingCLI.textContent='> rebooting system...', 2400);

    // 3.2s – hide opening, start matrix
    setTimeout(()=>{
      opening.style.display='none';
      if(window.BinaryRainBoot){ BinaryRainBoot.start(bootRain, {mode:'vertical'}); bootRain.classList.add('on'); }
      bootBox.classList.add('show');
      type(line1, "Don't be scared, human...", 40, ()=>{
        setTimeout(()=> type(line2, "Connecting to Solana neural grid...", 36, ()=>{
          setTimeout(()=> type(line3, "The Oracle is online.", 36), 400);
        }), 600);
      });
    },3200);

    // 6.4s – fade boot rain out
    setTimeout(()=>{
      bootBox.classList.remove('show');
      if(window.BinaryRainBoot){ BinaryRainBoot.stop(); bootRain.classList.remove('on'); }
    },6400);

    // 6.8s – show hero + main
    setTimeout(()=>{ heroOverlay.classList.add('show'); show(main); },6800);
  }

  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',runTimeline); }
  else{ runTimeline(); }
})();

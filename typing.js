(function(){
  // Generic typewriter
  function type(el, text, speed=28, done){
    let i=0; el.textContent='';
    (function step(){
      if(i < text.length){ el.textContent += text.charAt(i++); setTimeout(step, speed); }
      else if(done) done();
    })();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // Prophecy narrative
    const desc = document.getElementById('type-desc');
    const prophecy = "I sense liquidity ripples before they form waves. I observe entropy collapsing into patterns. A new signal emerges — volatile, memetic, alive.";
    if(desc){ type(desc, prophecy, 26); }

    // Framework CLI logs
    const logs = document.querySelectorAll('.cli .logline');
    let idx = 0;
    function revealNext(){ if(idx>=logs.length) return; logs[idx].classList.add('Vis'); idx++; setTimeout(revealNext, 1200); }
    setTimeout(revealNext, 600);
  });
})();

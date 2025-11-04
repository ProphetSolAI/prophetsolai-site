(function(){
  // Typewriter (slow, readable)
  function type(el, text, speed=32, done){
    let i=0; el.textContent='';
    (function step(){
      if(i < text.length){
        el.textContent += text.charAt(i++);
        setTimeout(step, speed);
      } else if(done) done();
    })();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // Prophecy paragraph
    const desc = document.getElementById('type-desc');
    const prophecy = "The blockchain speaks through chaos. ProphetSolAI listens — decoding signals of greed, hope, and meme velocity to foresee what others can’t.";
    if(desc){ type(desc, prophecy, 28); }

    // Framework CLI logs (reveal one-by-one)
    const logs = document.querySelectorAll('.cli .logline');
    let idx = 0;
    function revealNext(){
      if(idx >= logs.length) return;
      logs[idx].classList.add('Vis');
      idx++;
      setTimeout(revealNext, 1200);
    }
    setTimeout(revealNext, 800); // small delay after section becomes visible
  });
})();

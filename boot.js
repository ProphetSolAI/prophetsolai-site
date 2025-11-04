(function(){
  const intro = document.getElementById('intro');
  const glitch = intro.querySelector('.glitch');
  const matrixCanvas = document.getElementById('matrix');
  const boot = intro.querySelector('.boot');
  const line1 = document.getElementById('boot-line-1');
  const line2 = document.getElementById('boot-line-2');
  const heroOverlay = document.getElementById('hero-overlay');
  const main = document.getElementById('main');

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(el){ el.classList.add('show'); el.classList.remove('hide'); }
  function hide(el){ el.classList.add('hide'); el.classList.remove('show'); }

  function matrixOn(){ if(window.MatrixRain) MatrixRain.start(matrixCanvas); matrixCanvas.classList.add('on'); }
  function matrixOff(){ if(window.MatrixRain) MatrixRain.stop(); matrixCanvas.classList.remove('on'); }

  function typeBoot(el, text, speed=34, cb){
    let i=0; el.textContent='';
    (function step(){
      if(i<text.length){ el.textContent += text.charAt(i++); setTimeout(step, speed); }
      else if(cb) cb();
    })();
  }

  function run(){
    if(prefersReduce){
      heroOverlay.classList.add('show'); show(main);
      return;
    }
    // 0.8–1.6s: glitch
    setTimeout(()=> glitch.classList.add('on'), 800);
    setTimeout(()=> glitch.classList.remove('on'), 1600);

    // 1.6s: matrix + boot
    setTimeout(()=>{
      matrixOn(); show(boot);
      typeBoot(line1, "Don't be scared, human...", 40, ()=>{
        setTimeout(()=> typeBoot(line2, "The Oracle is online.", 36), 800);
      });
    }, 1600);

    // 4.6s: fade out boot + matrix
    setTimeout(()=>{ hide(boot); matrixOff(); }, 4600);

    // 5.0s: reveal hero + main
    setTimeout(()=>{ heroOverlay.classList.add('show'); show(main); }, 5000);
  }

  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', run); }
  else { run(); }
})();

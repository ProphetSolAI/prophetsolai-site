(function(){
  const intro = document.getElementById('intro');
  const glitch = intro.querySelector('.glitch');
  const matrixCanvas = document.getElementById('matrix');
  const boot = intro.querySelector('.boot');
  const line1 = document.getElementById('boot-line-1');
  const line2 = document.getElementById('boot-line-2');
  const heroOverlay = document.getElementById('hero-overlay');
  const main = document.getElementById('main');

  function show(el){ el.classList.add('show'); el.classList.remove('hide'); }
  function hide(el){ el.classList.add('hide'); el.classList.remove('show'); }

  function matrixOn(){ if(window.MatrixRain) MatrixRain.start(matrixCanvas); matrixCanvas.classList.add('on'); }
  function matrixOff(){ if(window.MatrixRain) MatrixRain.stop(); matrixCanvas.classList.remove('on'); }

  function typeBoot(el, text, speed=28, cb){
    let i=0; el.textContent='';
    const step=()=>{ if(i<text.length){ el.textContent+=text[i++]; setTimeout(step,speed);} else if(cb) cb(); };
    step();
  }

  function run(){
    setTimeout(()=>{ glitch.classList.add('on'); }, 1500);
    setTimeout(()=>{
      glitch.classList.remove('on');
      matrixOn();
      show(boot);
      typeBoot(line1, "Don't be scared, human...", 22, ()=>{
        setTimeout(()=> typeBoot(line2, "The Oracle awakens...", 26), 200);
      });
    }, 2100);
    setTimeout(()=>{ hide(boot); matrixOff(); }, 4200);
    setTimeout(()=>{ heroOverlay.classList.add('show'); show(main); }, 4400);
  }

  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', run); }
  else { run(); }
})();

(function(){
  const opening = document.getElementById('opening');
  const img = document.querySelector('.opening-img');
  const cli = document.getElementById('opening-cli');
  const bootRain = document.getElementById('boot-matrix');
  const hero = document.getElementById('intro');
  const main = document.getElementById('main');
  const glitchSound = document.getElementById('glitch-sound');
  const typeSound = document.getElementById('type-sound');

  function type(el, text, speed=60, done){
    let i=0; el.textContent='';
    (function step(){
      if(i<text.length){
        el.textContent += text.charAt(i++);
        typeSound.currentTime=0; typeSound.play();
        setTimeout(step, speed);
      }else if(done) done();
    })();
  }

  function runTimeline(){
    // 0–1.5s image visible
    setTimeout(()=>{
      // glitch
      opening.classList.add('glitch');
      glitchSound.currentTime=0; glitchSound.play();
      cli.textContent='> signal corrupted...';
    },1500);

    setTimeout(()=>{
      cli.textContent='> rebooting system...';
    },2000);

    // 2.8s → black + matrix rain
    setTimeout(()=>{
      opening.classList.remove('glitch');
      img.style.display='none';
      cli.textContent='';
      bootRain.classList.add('show');
      if(window.BinaryRainBoot) BinaryRainBoot.start(bootRain,{mode:'vertical'});
      setTimeout(()=> type(cli, '> stay calm, human.', 100, ()=>{
        setTimeout(()=>{
          bootRain.classList.remove('show');
          opening.style.display='none';
          hero.classList.remove('hide'); hero.classList.add('show');
          main.classList.remove('hide'); main.classList.add('show');
        },2000);
      }),800);
    },2800);
  }

  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',runTimeline);}
  else{runTimeline();}
})();

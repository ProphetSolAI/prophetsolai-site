// boot.js
(function(){
  const glitch=document.getElementById('sfx-glitch');
  const typingOverlay=document.getElementById('typing-intro');
  const matrix=document.getElementById('matrix');

  function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

  async function intro(){
    await sleep(1000); // wait 1s
    // glitch on
    try{glitch.currentTime=0;glitch.play();}catch{}
    document.body.style.transition="background .3s ease";
    document.body.style.background="#000";
    await sleep(400);
    matrix.classList.remove('hidden');
    await sleep(1200);
    typingOverlay.classList.remove('hidden');
    await window.TypeWriter.run(typingOverlay.querySelector('.typing-wrap'));
    await sleep(600);
    typingOverlay.classList.add('hidden');
    matrix.classList.add('hidden');
  }

  function scrollAnimations(){
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting)e.target.classList.add('visible');
      });
    },{threshold:0.2});
    document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));
  }

  window.addEventListener('load',async()=>{
    scrollAnimations();
    await intro();
  });
})();

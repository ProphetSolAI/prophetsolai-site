(function(){
  function type(el, text, speed=22){
    let i=0; el.textContent='';
    (function step(){
      if(i < text.length){
        el.textContent += text.charAt(i++);
        setTimeout(step, speed);
      }
    })();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const desc = document.getElementById('type-desc');
    if(desc){
      type(desc, 'An AI oracle decoding on-chain signals, memetic velocity, and community trust to forecast viral momentum.', 18);
    }
  });
})();

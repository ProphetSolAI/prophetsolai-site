// typing.js — matrix üzerindeki intro satırlarını yazar
(function(){
  const sfx = document.getElementById('sfx-type');

  async function typeLine(el, txt, cps=56){
    el.classList.add('typing');
    el.textContent='';
    for(let i=0;i<txt.length;i++){
      el.textContent+=txt[i];
      if(sfx && i%2===0){ try{ sfx.currentTime=0; sfx.play().catch(()=>{});}catch(_){} }
      await new Promise(r=>setTimeout(r,1000/cps));
    }
    el.classList.remove('typing');
  }

  async function run(container){
    const lines=[...container.querySelectorAll('.type-line')];
    for(const l of lines){
      await typeLine(l,l.dataset.text,58);
      await new Promise(r=>setTimeout(r,350));
    }
  }

  window.TypeWriter={ run };
})();

// typing.js
// Typing engine for the intro lines (tık tık tık)
(function(){
  const typeSfx = document.getElementById('sfx-type');

  async function typeLine(el, text, cps = 50){
    el.classList.add('typing');
    el.textContent = '';
    const delay = 1000 / cps;
    for(let i=0;i<text.length;i++){
      el.textContent += text[i];
      if(typeSfx && i % 2 === 0){
        try{ typeSfx.currentTime = 0; typeSfx.play().catch(()=>{});}catch(_){}
      }
      await new Promise(r=>setTimeout(r, delay));
    }
    el.classList.remove('typing');
  }

  async function typeSequence(container){
    const lines = Array.from(container.querySelectorAll('.type-line'));
    for(const line of lines){
      const text = line.getAttribute('data-text') || '';
      await typeLine(line, text, 54);
      await new Promise(r=>setTimeout(r, 260));
    }
    container.dispatchEvent(new CustomEvent('typing:done', {bubbles:true}));
  }

  window.ProphetTyping = { typeSequence };
})();

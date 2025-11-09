// typing.js
(function(){
  const line1 = document.getElementById('line-1');
  const line2 = document.getElementById('line-2');
  const line3 = document.getElementById('line-3');
  const typeSfx = document.getElementById('sfx-type');

  const seq = [
    {el: line1, text: 'Stay Calm, Human.'},
    {el: line2, text: 'The Oracle Awakens.'},
    {el: line3, text: 'The blockchain speaks — ProphetSolAI interprets.'}
  ];

  function typeText(el, text, speed=35){
    return new Promise(resolve=>{
      el.textContent = '';
      let i=0;
      const tick = () => {
        if (i < text.length){
          el.textContent += text[i++];
          if (typeSfx){ typeSfx.currentTime = 0; typeSfx.play().catch(()=>{}); }
          setTimeout(tick, speed);
        } else {
          resolve();
        }
      };
      tick();
    });
  }

  async function runTyping(){
    for (const step of seq){
      await typeText(step.el, step.text);
      await new Promise(r=>setTimeout(r, 280));
    }
  }

  window.ProphetTyping = { runTyping };
})();

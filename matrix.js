// matrix.js
// Neon 0/1 rain used during the intro sequence
(function(){
  const canvas = document.getElementById('matrix-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, cols, drops, fontSize = 16;
  const glyphs = '01010101010101010101010101010101';

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.floor(w / fontSize);
    drops = new Array(cols).fill(0).map(()=> Math.random()*h/fontSize);
  }
  window.addEventListener('resize', resize, {passive:true});
  resize();

  let last = 0;
  function draw(ts){
    const dt = ts - last;
    if(dt < 28){ requestAnimationFrame(draw); return; }
    last = ts;

    ctx.fillStyle = 'rgba(0,1,13,0.22)';
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = 'rgba(0,255,247,0.88)'; // neon cyan
    ctx.font = `${fontSize}px monospace`;

    for(let i=0;i<drops.length;i++){
      const char = glyphs[Math.floor(Math.random()*glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(char, x, y);

      if(y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 1;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

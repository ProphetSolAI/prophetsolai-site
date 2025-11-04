// Matrix rain on canvas - lightweight, responsive
(function(){
  const canvas = document.getElementById('matrix');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, columns, drops;

  function setup(){
    resize();
    const fontSize = 16;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
    ctx.font = fontSize + 'px monospace';
  }

  function resize(){
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => {
    resize();
    setup();
  });

  const letters = '01✓≡∑ψ₪▲▼←→★✦✶✹✽'.split('');
  function draw(){
    // translucent background for trail
    ctx.fillStyle = 'rgba(1,6,12,0.18)';
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = 'rgba(43,231,255,0.9)'; // cyan
    for(let i=0;i<columns;i++){
      const text = letters[Math.floor(Math.random()*letters.length)];
      const x = i * 16;
      const y = drops[i] * 16;
      ctx.fillText(text, x, y);
      if(y > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }

  setup();
  draw();
})();

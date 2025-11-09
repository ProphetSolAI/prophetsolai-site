// matrix.js
(function(){
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  const glyphs = 'アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺ01ΣΞΨΦΩ¥$#@*+<>/\\|';
  let w, h, cols, drops;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.floor(w / 14);
    drops = Array(cols).fill(0).map(()=>Math.random()*h);
  }

  function draw(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.09)';
    ctx.fillRect(0,0,w,h);

    ctx.font = '16px Share Tech Mono';
    for(let i=0;i<cols;i++){
      const char = glyphs[Math.floor(Math.random()*glyphs.length)];
      const x = i*14;
      const y = drops[i]*1.05;

      ctx.fillStyle = 'rgba(0,255,144,0.9)';
      ctx.fillText(char, x, y);

      if (y > h && Math.random() > 0.975) drops[i] = 0;
      else drops[i] = y;
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

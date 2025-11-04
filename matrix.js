window.MatrixRain = (function(){
  let raf=0, active=false, ctx, w, h, cols=0, drops=[], font=18, chars;

  function init(canvas){
    ctx = canvas.getContext('2d');
    resize(canvas);
    chars = '01'.split('');
    drops = Array(cols).fill(1 + Math.random()*h/font);
  }

  function resize(canvas){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.floor(w / font);
    ctx.font = font + 'px Share Tech Mono, monospace';
  }

  function draw(){
    if(!active) return;
    ctx.fillStyle = 'rgba(7,5,18,0.18)';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle = 'rgba(0,255,160,1)';
    for(let i=0;i<cols;i++){
      const ch = chars[Math.random()*chars.length|0];
      const x = i*font;
      const y = drops[i]*font;
      ctx.fillText(ch, x, y);
      if(y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.85; // daha yavaş
    }
    raf = requestAnimationFrame(draw);
  }

  function start(canvas){
    if(active) return;
    if(!ctx) init(canvas);
    active = true;
    window.addEventListener('resize', ()=>resize(canvas));
    raf = requestAnimationFrame(draw);
  }
  function stop(){
    active = false;
    cancelAnimationFrame(raf);
  }

  return { start, stop };
})();

// BinaryRainBoot: vertical 0/1 rain for boot timeline
window.BinaryRainBoot = (function(){
  let raf=0, active=false, ctx, w, h, cols=0, drops=[], font=18, chars;
  function init(canvas){
    ctx = canvas.getContext('2d'); resize(canvas);
    chars = '01'.split(''); drops = Array(cols).fill(1 + Math.random()*h/font);
  }
  function resize(canvas){
    w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
    cols = Math.floor(w / font); ctx.font = font + 'px Share Tech Mono, monospace';
  }
  function draw(){
    if(!active) return;
    ctx.fillStyle = 'rgba(0,1,13,0.2)'; ctx.fillRect(0,0,w,h);
    ctx.fillStyle = 'rgba(0,255,160,1)';
    for(let i=0;i<cols;i++){
      const ch = chars[(Math.random()*chars.length)|0];
      const x = i*font; const y = drops[i]*font;
      ctx.fillText(ch,x,y);
      if(y>h && Math.random()>.975) drops[i]=0;
      drops[i]+=0.9;
    }
    raf = requestAnimationFrame(draw);
  }
  function start(canvas){ if(active) return; if(!ctx) init(canvas); active=true; window.addEventListener('resize', ()=>resize(canvas)); raf=requestAnimationFrame(draw); }
  function stop(){ active=false; cancelAnimationFrame(raf); }
  return { start, stop };
})();

// BinaryDriftProphecy: horizontal 0/1 drift for The Prophecy
(function(){
  const cvs = document.getElementById('prophecy-binary');
  if(!cvs) return;
  const ctx = cvs.getContext('2d');
  let w,h, font=16, rows=0, stream=[];
  function resize(){
    w = cvs.width = cvs.clientWidth; h = cvs.height = cvs.clientHeight;
    rows = Math.floor(h / (font+4)); ctx.font = font + 'px Share Tech Mono, monospace';
    stream = []; for(let r=0;r<rows;r++){ stream.push({x: Math.random()*w, y:r*(font+4), v: 0.4+Math.random()*0.8, txt: Math.random()>0.5?'0':'1'}); }
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='rgba(0,255,160,.22)';
    stream.forEach(s=>{
      ctx.fillText(s.txt, s.x, s.y);
      s.x += s.v;
      if(s.x > w + 20){ s.x = -20; s.v = 0.4+Math.random()*0.8; s.txt = Math.random()>0.5?'0':'1'; }
    });
    requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize', resize);
})();

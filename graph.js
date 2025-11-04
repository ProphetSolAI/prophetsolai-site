(function(){
  const cvs = document.getElementById('graph');
  if(!cvs) return;
  const ctx = cvs.getContext('2d');
  let w,h,cx,cy,nodes=[], hue=190;

  function resize(){
    w = cvs.width = cvs.clientWidth;
    h = cvs.height = cvs.clientHeight;
    cx = w/2; cy = h/2;
    build();
  }

  function build(){
    nodes = [];
    const count = Math.max(28, Math.floor(w/36));
    for(let i=0;i<count;i++){
      const a = (Math.PI*2)*(i/count);
      const r = 80 + Math.random()*Math.min(w,h)/3.2;
      nodes.push({
        x: cx + Math.cos(a)*r,
        y: cy + Math.sin(a)*r,
        vx:(Math.random()-.5)*.35,
        vy:(Math.random()-.5)*.35,
        s: 0.7 + Math.random()*2.0
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    const grd = ctx.createRadialGradient(cx,cy,20,cx,cy,Math.max(w,h)/1.2);
    grd.addColorStop(0,'rgba(0,234,255,.14)'); grd.addColorStop(1,'rgba(7,5,18,0)');
    ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);

    ctx.beginPath(); ctx.arc(cx,cy,5,0,Math.PI*2);
    ctx.fillStyle='rgba(0,234,255,.9)'; ctx.fill();

    hue += 0.25; const lineColor = `hsla(${hue}, 90%, 60%, .18)`;

    nodes.forEach(n=>{
      n.x += n.vx; n.y += n.vy;
      if(Math.random()>.985){ n.vx*=-1; n.vy*=-1; }
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(n.x,n.y);
      ctx.strokeStyle=lineColor; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath(); ctx.arc(n.x,n.y,n.s,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,.35)'; ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); draw();
  window.addEventListener('resize', resize);
})();

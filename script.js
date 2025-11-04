// frame canvas (nodes radiating) + small interactions
(function(){
  /* FRAMEWORK canvas */
  const fc = document.getElementById('frame-canvas');
  if(fc){
    const ctx = fc.getContext('2d');
    let w,h, cx, cy, nodes=[];
    function resizeF(){ w=fc.width=window.innerWidth; h=fc.height=400; cx=w/2; cy=200; generateNodes(); }
    window.addEventListener('resize', resizeF);

    function generateNodes(){
      nodes = [];
      const count = Math.floor(Math.max(12, Math.min(40, w/60)));
      for(let i=0;i<count;i++){
        const angle = (Math.PI*2)*(i/count);
        const dist = 80 + Math.random()*220;
        nodes.push({
          x: cx + Math.cos(angle)*dist,
          y: cy + Math.sin(angle)*dist,
          size: 1 + Math.random()*3,
          alpha: 0.2 + Math.random()*0.8,
          vx: (Math.random()-0.5)*0.2,
          vy: (Math.random()-0.5)*0.2
        });
      }
    }

    function drawFrame(){
      ctx.clearRect(0,0,w,400);
      // central node
      ctx.beginPath();
      ctx.arc(cx,cy,6,0,Math.PI*2);
      ctx.fillStyle='rgba(201,162,39,0.95)';
      ctx.fill();

      nodes.forEach(n=>{
        // subtle movement
        n.x += n.vx; n.y += n.vy;
        // line
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(n.x,n.y);
        ctx.strokeStyle = 'rgba(43,231,255,'+ (0.06 + n.alpha*0.2) +')';
        ctx.lineWidth = 1;
        ctx.stroke();
        // node
        ctx.beginPath();
        ctx.arc(n.x,n.y,n.size,0,Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,'+(0.15 + n.alpha*0.7)+')';
        ctx.fill();
      });

      requestAnimationFrame(drawFrame);
    }

    resizeF();
    drawFrame();
  }

  /* SYSTEM moving bg micro-parallax */
  const sysBg = document.querySelector('.system-bg');
  if(sysBg){
    // create layered moving background using CSS + small JS
    sysBg.style.position='absolute';
    sysBg.style.inset='0';
    sysBg.style.zIndex='0';
    sysBg.style.background='linear-gradient(120deg, rgba(2,6,12,0.9), rgba(3,8,22,0.95))';
    sysBg.style.opacity='0.95';
    sysBg.style.transformOrigin='center';
    let t=0;
    function animateSys(){
      t += 0.0025;
      const sx = Math.sin(t)*6;
      const sy = Math.cos(t*0.8)*8;
      sysBg.style.backgroundPosition = `${sx}% ${sy}%`;
      requestAnimationFrame(animateSys);
    }
    animateSys();
  }
})();

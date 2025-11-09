// matrix.js
(function(){
  const canvas=document.getElementById('matrix');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let w,h,cols,drops;
  const fontSize=16;
  const chars='01';
  function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
    cols=Math.floor(w/fontSize);
    drops=new Array(cols).fill(0);
  }
  resize();
  window.addEventListener('resize',resize);
  function draw(){
    ctx.fillStyle='rgba(0,0,0,0.2)';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle='#00FF90';
    ctx.font=fontSize+'px monospace';
    for(let i=0;i<cols;i++){
      const char=chars[Math.floor(Math.random()*chars.length)];
      const x=i*fontSize;
      const y=drops[i]*fontSize;
      ctx.fillText(char,x,y);
      if(y>h&&Math.random()>0.975)drops[i]=0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

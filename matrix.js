// matrix.js — TAM SİYAH ekran üstünde 0/1 yağmuru (hack vibe)
(function(){
  const canvas=document.getElementById('matrix-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');

  let w,h,cols,drops;
  const fontSize=16;
  const chars='01';

  function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
    cols=Math.floor(w/fontSize);
    drops=new Array(cols).fill(0).map(()=> Math.random()*h/fontSize);
  }
  window.addEventListener('resize',resize,{passive:true});
  resize();

  let last=0;
  function draw(ts){
    const dt=ts-last;
    if(dt<28){ requestAnimationFrame(draw); return; }
    last=ts;

    // iz bırakma
    ctx.fillStyle='rgba(0,0,0,0.22)';
    ctx.fillRect(0,0,w,h);

    // neon 0/1
    ctx.fillStyle='rgba(0,255,144,0.95)';
    ctx.font=`${fontSize}px monospace`;

    for(let i=0;i<cols;i++){
      const char=chars[(Math.random()*2)|0];
      const x=i*fontSize;
      const y=drops[i]*fontSize;
      ctx.fillText(char,x,y);

      if(y>h && Math.random()>0.975) drops[i]=0;
      drops[i]+=1;
    }

    // nadiren mor parıltı
    if(Math.random()>0.985){
      ctx.fillStyle='rgba(143,0,255,0.06)';
      ctx.fillRect(0,0,w,h);
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

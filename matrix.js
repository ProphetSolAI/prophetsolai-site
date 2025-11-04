window.BinaryRainBoot = (function(){
  let ctx,w,h,cols,drops,font=18,chars,raf,active=false;
  function init(canvas){
    ctx=canvas.getContext('2d');
    resize(canvas);
    chars='01'.split('');
    drops=Array(cols).fill(1+Math.random()*h/font);
  }
  function resize(canvas){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
    cols=Math.floor(w/font);
    ctx.font=font+'px Share Tech Mono, monospace';
  }
  function draw(){
    if(!active) return;
    ctx.fillStyle='rgba(0,0,0,0.2)';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle='rgba(0,255,160,1)';
    for(let i=0;i<cols;i++){
      const ch=chars[(Math.random()*chars.length)|0];
      const x=i*font, y=drops[i]*font;
      ctx.fillText(ch,x,y);
      if(y>h && Math.random()>.975) drops[i]=0;
      drops[i]+=1.2;
    }
    raf=requestAnimationFrame(draw);
  }
  function start(canvas){if(active)return;if(!ctx)init(canvas);active=true;raf=requestAnimationFrame(draw);}
  function stop(){active=false;cancelAnimationFrame(raf);}
  return{start,stop};
})();

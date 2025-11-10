// ==========================================================
// ProphetSolAI — matrix.js
// Matrix rain + glitch intro sequencing
// ==========================================================
(function(){
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let columns = Math.floor(width / 20);
  let drops = Array(columns).fill(1);
  const chars = "01";

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / 20);
    drops = Array(columns).fill(1);
  });

  function draw(){
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "#00FF90";
    ctx.font = "16px Share Tech Mono";
    for(let i=0;i<drops.length;i++){
      const text = chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(text,i*20,drops[i]*20);
      if(drops[i]*20 > height && Math.random() > 0.975){ drops[i]=0; }
      drops[i]++;
    }
  }

  function startMatrix(){
    canvas.classList.remove("hidden");
    const id = setInterval(draw, 33);
    setTimeout(()=>{ clearInterval(id); canvas.classList.add("hidden"); }, 4200);
  }

  window.MatrixEffect = { startMatrix };
})();

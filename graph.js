// graph.js
(function(){
  class OrbitGraph {
    constructor(canvas){
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.nodes = [];
      this.links = [];
      this.t = 0;
      this.running = false;
      this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.resize = this.resize.bind(this);
      window.addEventListener('resize', this.resize);
      this.resize();
      this.init();
    }
    resize(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.floor(this.canvas.clientWidth * dpr);
      this.canvas.height = Math.floor(this.canvas.clientHeight * dpr);
      this.ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    init(){
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      const cx = w/2, cy = h/2;

      // center hub
      this.nodes = [{ id:0, x:cx, y:cy, r:6, hue:180 }];

      // orbiting nodes
      const count = 28;
      for (let i=1;i<=count;i++){
        const angle = (i / count) * Math.PI*2;
        const radius = 70 + (i%3)*40 + Math.random()*30;
        this.nodes.push({
          id:i, angle, baseR:radius,
          speed:(this.prefersReduced?0.001:0.003)+Math.random()*0.003,
          r: 2 + Math.random()*2,
          hue: 190 + (i%2?60:0)
        });
        this.links.push([0,i]);
      }
    }
    start(){
      if (this.running) return;
      this.running = true;
      const loop = () => {
        if (!this.running) return;
        this.draw();
        this.raf = requestAnimationFrame(loop);
      };
      loop();
    }
    stop(){
      this.running = false;
      cancelAnimationFrame(this.raf);
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    draw(){
      const {ctx, canvas} = this;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0,0,canvas.width,canvas.height);

      // soft grid glow
      ctx.fillStyle = 'rgba(0,255,247,0.04)';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      // update node positions
      const center = this.nodes[0];
      for (let i=1;i<this.nodes.length;i++){
        const n = this.nodes[i];
        n.angle += n.speed;
        n.x = (w/2) + Math.cos(n.angle) * n.baseR;
        n.y = (h/2) + Math.sin(n.angle) * n.baseR * 0.7;
      }

      // draw links
      ctx.lineWidth = 1;
      for (const [a,b] of this.links){
        const na = this.nodes[a], nb = this.nodes[b];
        const grad = ctx.createLinearGradient(na.x,na.y, nb.x,nb.y);
        grad.addColorStop(0,'rgba(0,255,247,.35)');
        grad.addColorStop(1,'rgba(143,0,255,.25)');
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      }

      // draw nodes
      for (const n of this.nodes){
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r*4);
        g.addColorStop(0, `hsla(${n.hue}, 100%, 70%, .9)`);
        g.addColorStop(1, `hsla(${n.hue}, 100%, 50%, .0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r*3, 0, Math.PI*2);
        ctx.fill();

        ctx.fillStyle = `hsla(${n.hue}, 100%, 70%, 1)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fill();
      }
    }
  }

  function init(){
    const canvas = document.getElementById('prophecyGraph');
    const graph = new OrbitGraph(canvas);

    // Start when visible
    const section = canvas.closest('section');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) graph.start();
      });
    }, {threshold:0.2});
    io.observe(section);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

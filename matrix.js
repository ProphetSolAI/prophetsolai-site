// matrix.js
(function(){
  class BinaryRainBoot {
    constructor(canvas){
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.running = false;
      this.chars = '01';
      this.resize = this.resize.bind(this);
      window.addEventListener('resize', this.resize);
      this.resize();
      this.columns = Math.floor(this.canvas.width / this.fontSize);
      this.drops = Array(this.columns).fill(0);
      this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    resize(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.floor(this.canvas.clientWidth * dpr);
      this.canvas.height = Math.floor(this.canvas.clientHeight * dpr);
      this.ctx.setTransform(dpr,0,0,dpr,0,0);
      this.fontSize = 16;
      this.ctx.font = `${this.fontSize}px "Share Tech Mono", monospace`;
    }
    start(){
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
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#00FF90';
      ctx.shadowColor = 'rgba(0,255,144,0.35)';
      ctx.shadowBlur = 8;

      const colWidth = this.fontSize;
      const columns = Math.floor(canvas.width / colWidth);
      if (this.drops.length !== columns) this.drops = Array(columns).fill(0);

      for (let i = 0; i < columns; i++){
        const text = this.chars[Math.random() * this.chars.length | 0];
        const x = i * colWidth;
        const y = this.drops[i] * this.fontSize;

        ctx.fillText(text, x, y);

        const speed = this.prefersReduced ? 1 : (1 + Math.random() * 2);
        if (y > canvas.height && Math.random() > 0.975) {
          this.drops[i] = 0;
        } else {
          this.drops[i] += speed;
        }
      }
      ctx.shadowBlur = 0;
    }
  }

  class BinaryDriftProphecy {
    constructor(canvas){
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.running = false;
      this.bits = [];
      this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.resize = this.resize.bind(this);
      window.addEventListener('resize', this.resize);
      this.resize();
      this.spawnBits();
    }
    resize(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.floor(this.canvas.clientWidth * dpr);
      this.canvas.height = Math.floor(this.canvas.clientHeight * dpr);
      this.ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    spawnBits(){
      const count = Math.floor((this.canvas.clientWidth * this.canvas.clientHeight) / 14000);
      this.bits = new Array(Math.max(60, count)).fill(0).map(() => ({
        x: Math.random() * this.canvas.clientWidth,
        y: Math.random() * this.canvas.clientHeight,
        s: (Math.random() * 0.6 + 0.4) * (this.prefersReduced ? 0.5 : 1),
        v: Math.random() < 0.5 ? '0' : '1',
        a: Math.random() * Math.PI * 2
      }));
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
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.globalAlpha = .6;
      ctx.fillStyle = 'rgba(0,255,247,0.15)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.globalAlpha = 1;

      ctx.fillStyle = 'rgba(198,255,247,.85)';
      ctx.shadowColor = 'rgba(143,0,255,.25)';
      ctx.shadowBlur = 6;

      for (const b of this.bits){
        b.x += Math.cos(b.a) * b.s;
        b.y += Math.sin(b.a) * b.s;

        // wrap
        if (b.x < -20) b.x = canvas.clientWidth + 20;
        if (b.x > canvas.clientWidth + 20) b.x = -20;
        if (b.y < -20) b.y = canvas.clientHeight + 20;
        if (b.y > canvas.clientHeight + 20) b.y = -20;

        this.ctx.font = '14px "Share Tech Mono", monospace';
        ctx.fillText(b.v, b.x, b.y);
      }
      ctx.shadowBlur = 0;
    }
  }

  // expose
  window.BinaryRainBoot = BinaryRainBoot;
  window.BinaryDriftProphecy = BinaryDriftProphecy;
})();

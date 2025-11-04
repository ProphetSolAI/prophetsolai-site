// --- Animated Holographic Network (Enhanced) ---
const canvas = document.getElementById("framework-network");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let nodes = [];
  const NODE_COUNT = 55;
  const MAX_DIST = 130;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById("framework").offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ffff";
    for (let n of nodes) {
      n.x += n.dx;
      n.y += n.dy;
      if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.dy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.strokeStyle = `rgba(0,255,255,${alpha * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

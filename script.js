// === PROPHECY NETWORK BACKGROUND ===
const prophecyCanvas = document.getElementById('prophecy-network');
if (prophecyCanvas) {
  const ctx = prophecyCanvas.getContext('2d');
  prophecyCanvas.width = window.innerWidth;
  prophecyCanvas.height = window.innerHeight;

  let nodes = [];
  const nodeCount = 90;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * prophecyCanvas.width,
      y: Math.random() * prophecyCanvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8
    });
  }

  function animateProphecy() {
    ctx.clearRect(0, 0, prophecyCanvas.width, prophecyCanvas.height);
    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > prophecyCanvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > prophecyCanvas.height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ffff';
      ctx.fill();
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const opacity = 1 - distance / 120;
          ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateProphecy);
  }
  animateProphecy();
  window.addEventListener('resize', () => {
    prophecyCanvas.width = window.innerWidth;
    prophecyCanvas.height = window.innerHeight;
  });
}

// === BINARY RAIN EFFECT ===
const binaryCanvas = document.getElementById('binary-rain');
if (binaryCanvas) {
  const ctx = binaryCanvas.getContext('2d');
  binaryCanvas.width = window.innerWidth;
  binaryCanvas.height = window.innerHeight;

  const letters = '01';
  const fontSize = 16;
  const columns = binaryCanvas.width / fontSize;
  const drops = Array.from({ length: columns }).map(() => Math.random() * binaryCanvas.height);

  function drawRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, binaryCanvas.width, binaryCanvas.height);
    ctx.fillStyle = '#00ffe1';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > binaryCanvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(drawRain, 35);
  window.addEventListener('resize', () => {
    binaryCanvas.width = window.innerWidth;
    binaryCanvas.height = window.innerHeight;
  });
}

// === FRAMEWORK NODE HOVER INFO ===
const nodes = document.querySelectorAll('.node');
const infoBox = document.getElementById('framework-info');
const titleBox = document.getElementById('info-title');
const textBox = document.getElementById('info-text');

nodes.forEach(node => {
  node.addEventListener('mouseenter', () => {
    titleBox.textContent = node.getAttribute('data-title');
    textBox.textContent = node.getAttribute('data-text');
    infoBox.classList.add('active');
  });
  node.addEventListener('mouseleave', () => {
    infoBox.classList.remove('active');
  });
});

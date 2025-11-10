// ==========================================================
// ProphetSolAI — prophecy.js
// AI oracle logic + stable 10min caching
// ==========================================================
(function(){
  const phrases = [
    "market gravity aligning", "liquidity fractures forming",
    "memes becoming myth", "fear calcifies then shatters",
    "on-chain resonance detected", "cultural vectors converging",
    "degenerate alignment improving", "trust network pulsing",
    "signal clarity increasing", "whale telemetry stable"
  ];

  const cache = {};

  function norm(token){
    if(!token) return "$TOKEN";
    token = token.trim().toUpperCase();
    if(!token.startsWith("$")) token = "$" + token;
    return token;
  }

  function hashCoin(str){
    let h = 0;
    for(let i=0;i<str.length;i++){
      h = Math.imul(31,h) + str.charCodeAt(i) | 0;
    }
    return Math.abs(h);
  }

  function rand(seed, min, max){
    return min + ((seed * 9301 + 49297) % 233280) / 233280 * (max - min);
  }

  function build(token){
    const seed = hashCoin(token);
    const trust = Math.round(rand(seed, 60, 95));
    const velocity = Math.round(rand(seed+2, 20, 99));
    const purity = Math.round(rand(seed+5, 25, 90));

    const lines = [
      `${token} resonates through data streams... ${phrases[seed % phrases.length]}.`,
      `Trust Level: ${trust}%  |  Meme Velocity: ${velocity}  |  Signal Purity: ${purity}%`
    ];

    return { token, trust, velocity, purity, lines, time: Date.now() };
  }

  async function typeInto(el, text, cps=55){
    el.textContent = "";
    const sfx = document.getElementById("sfx-type");
    for(const ch of text){
      el.textContent += ch;
      try { sfx.currentTime = 0; sfx.play(); } catch {}
      await new Promise(r=>setTimeout(r,1000/cps));
    }
  }

  async function prophesy(raw){
    const coin = norm(raw);
    const now = Date.now();
    const tenMin = 10 * 60 * 1000;
    let d = cache[coin];

    if(!d || (now - d.time) > tenMin){
      d = build(coin);
      cache[coin] = d;
    }

    const out = document.getElementById("prophecy-text");
    const metrics = document.getElementById("metrics");
    const cascade = document.getElementById("cascade");

    const text = d.lines.join("\n");
    await typeInto(out, text, 50);

    metrics.innerHTML = `
      <div class="metric"><b>Trust:</b> ${d.trust}%</div>
      <div class="metric"><b>Meme Velocity:</b> ${d.velocity}</div>
      <div class="metric"><b>Signal Purity:</b> ${d.purity}%</div>
    `;

    cascade.innerHTML = "";
    for(let i=0;i<50;i++){
      const div = document.createElement("div");
      div.className = "diagonal-item";
      div.textContent = "> " + phrases[(d.trust+i) % phrases.length];
      div.style.setProperty("--shift", `${i*6}px`);
      cascade.appendChild(div);
    }
  }

  window.ProphetOracle = { prophesy };
})();

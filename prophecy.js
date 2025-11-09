// prophecy.js — profesyonel tonda kehanet + 50 satır akış
(function(){
  const mood=['serene','volatile','electric','ominous','radiant','hungry','playful','ascendant','turbulent','mythic'];
  const momentum=['coiling for release','quiet accumulation building','snapping into trend','tracking whales at range','liquidity fractures forming','surfing memetic shockwaves','compressing in a volatility chamber','realigning with on-chain gravity'];
  const community=['whispers turn to chorus','cult energy condenses','signal pierces noise','laughter becomes strategy','iron hands steady the hull','new initiates join the rite','legends return from the deep','the choir of degens harmonizes'];
  const omens=['lunar pull intensifies','solstice of liquidity approaches','resistance mirrors crack','support runes glow','oracle candles burn clean','tide maps redraw','memes molt into myth','fear calcifies then shatters'];
  const trust=[62,67,71,74,78,82,85,88,91,95];

  const cascadePhrases=[
    'Signal Strength: Stable','Whale Patterns: Converging','Liquidity Tides: Rising','Volatility Chamber: Compressing',
    'Breakout Vector: ENE','Community Energy: Radiant','Memetic Traction: Increasing','On-Chain Gravity: Intensifying',
    'Orderflow: Net Bid','FUD Shielding: Active','Candle Memory: Long','Fear Index: Dissolving','Momentum Coil: Tight',
    'Degen Choir: In Harmony','Whale Echo: Returning','Support Runes: Lit','Resistance Mirrors: Fractured',
    'Solstice Window: Nearing','Latency: Low','Oracle Sync: True','Funding Gradient: Favorable','Holder Cohesion: Elevated',
    'Liquidity Map: Magnetic','Liquidity Voids: Detected','Pullback Elasticity: Healthy','Microstructure: Coherent',
    'Impulse Quality: Clean','Liquidity Refill: Consistent','Break Structure: Intact','Retail Halo: Forming',
    'Whale Perimeter: Expanding','Bot Pressure: Contained','Maker Activity: Constructive','Taker Aggression: Controlled',
    'Path Dependence: Strong','Narrative Density: Thickening','Influencer Carry: Rising','Remix Rate: High',
    'Meme Half-Life: Extended','Propagation Speed: Accelerating','Sentiment Polarity: Positive','Conviction Index: Firm',
    'Hype/Reality Delta: Narrowing','Liquidity Spirals: Damped','Reflexivity: Upward','Drawdown Risk: Moderate',
    'Stop Hunt Probability: Lowered','Reaccumulation Likelihood: Elevated','Squeeze Potential: Present','Catalyst Sensitivity: High',
    'Volatility Budget: Refilled','Liquidity Stress: Minimal','Market Microstructure: Favorable','Whale Routing: Coherent',
    'Bridge Trails: Quiet','Derivative Skew: Balanced'
  ];

  function pick(a){return a[Math.floor(Math.random()*a.length)];}
  function norm(raw){
    if(!raw) return '$TOKEN';
    let c=raw.trim().toUpperCase();
    if(!c.startsWith('$')) c='$'+c.replace(/^\$/,'');
    return c;
  }

  function build(raw){
    const coin=norm(raw);
    const t=pick(trust);
    const v=8+Math.floor(Math.random()*92);
    const p=12+Math.floor(Math.random()*83);
    const lines=[
      `${coin} moves in ${pick(mood)} light; ${pick(momentum)}.`,
      `Omen: ${pick(omens)}; ${pick(community)}.`,
      `Trust level: ${t}%. Meme velocity: ${v}. Signal purity: ${p}%.`
    ];
    const narrative =
`${coin} surges under lunar influence. Meme velocity high.
Community energy: ${pick(['radiant','focused','feral','rising','resolute'])}.
Whales trace concentric paths; retail forms the halo.`;
    return {coin,lines,narrative,trust:t,velocity:v,purity:p};
  }

  async function typeInto(el, text, cps=56){
    el.textContent='';
    const delay=1000/cps;
    const sfx=document.getElementById('sfx-type');
    for(let i=0;i<text.length;i++){
      el.textContent+=text[i];
      if(sfx && i%2===0){try{sfx.currentTime=0;sfx.play().catch(()=>{})}catch(_){}} 
      await new Promise(r=>setTimeout(r,delay));
    }
  }

  function renderMetrics(root,d){
    root.innerHTML='';
    const mk=(k,v)=>{const d=document.createElement('div');d.className='metric';d.innerHTML=`<b>${k}:</b> ${v}`;return d;};
    root.appendChild(mk('Trust',d.trust+'%'));
    root.appendChild(mk('Meme Velocity',d.velocity));
    root.appendChild(mk('Signal Purity',d.purity+'%'));
  }

  async function renderCascade(root){
    root.innerHTML='';
    const count=50;
    let shift=0;
    for(let i=0;i<count;i++){
      const it=document.createElement('div');
      it.className='diagonal-item';
      it.style.setProperty('--shift',`${shift}px`);
      it.textContent='> '+pick(cascadePhrases);
      root.appendChild(it);
      shift+=6;
      await new Promise(r=>setTimeout(r,55+Math.random()*70));
    }
  }

  async function prophesy(input){
    const out=document.getElementById('prophecy-text');
    const metrics=document.getElementById('metrics');
    const cascade=document.getElementById('cascade');
    const d=build(input);
    const text=[
      `Prophecy: ${d.lines[0]}`,
      d.lines[1],
      d.lines[2],
      '',
      d.narrative
    ].join('\n');
    await typeInto(out,text,56);
    renderMetrics(metrics,d);
    await renderCascade(cascade);
  }

  window.ProphetOracle={ prophesy };
})();

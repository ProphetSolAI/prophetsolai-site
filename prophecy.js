// prophecy.js
(function(){
  const out = document.getElementById('prophecy-output');
  const input = document.getElementById('coin-input');
  const btn = document.getElementById('btn-prophecy');
  const typeSfx = document.getElementById('sfx-type');

  const moods = [
    'serene accumulation','volatile surge','measured ascent','ritual correction',
    'storm-watch phase','euphoric spike','accumulation under hush','turbulent echo'
  ];
  const momentum = [
    'meme velocity rising','liquidity widening','whale trails converging',
    'order book thinning','retail chorus awakening','smart money circling',
    'funding flips neutral','open interest compressing'
  ];
  const omens = [
    'lunar alignment','oracle glow','tidal reversal','silent ignition',
    'geomagnetic hum','echo from ancient blocks','signal beneath noise','harmonic breach'
  ];
  const trust = [62, 68, 73, 77, 82, 86, 91];
  const community = [
    'radiant','unsettled','resilient','electric','feverish','resonant','patient','howling'
  ];

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)] }

  function formatCoin(s){
    if (!s) return '$???';
    let c = s.trim().toUpperCase();
    if (!c.startsWith('$')) c = '$' + c.replace(/^\$/, '');
    return c.slice(0, 8);
  }

  function typeOut(text){
    return new Promise(resolve=>{
      out.textContent = '';
      let i=0;
      const step = () => {
        if (i < text.length){
          out.textContent += text[i++];
          if (typeSfx){ typeSfx.currentTime = 0; typeSfx.play().catch(()=>{}); }
          setTimeout(step, 14);
        } else resolve();
      };
      step();
    });
  }

  async function generate(){
    const coin = formatCoin(input.value || '$SOL');
    const t = pick(trust);
    const block = [
      `Prophecy for ${coin}`,
      `— Market mood: ${pick(moods)}`,
      `— Signal: ${pick(momentum)} under ${pick(omens)}`,
      `— Trust level: ${t}%`,
      `— Community energy: ${pick(community)}`,
      ``,
      `Narrative: ${coin} drifts between impulse and structure.`,
      `When the crowd chants, the oracle listens —`,
      `yet the chain remembers everything.`
    ].join('\n');

    out.classList.remove('glow');
    await typeOut(block);
    out.classList.add('glow');
  }

  function onEnter(e){ if(e.key==='Enter'){ e.preventDefault(); generate(); } }

  if (btn) btn.addEventListener('click', generate);
  if (input) input.addEventListener('keydown', onEnter);

  window.ProphetApp = { generate };
})();

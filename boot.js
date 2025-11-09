// boot.js
// Orchestrates the full intro: normal → glitch (with sound) → blackout → matrix + typing → fade → normal.
// Also wires the Prophecy terminal.
(function(){
  const glitch = document.getElementById('sfx-glitch');
  const btnEnter = document.getElementById('cta-enter');

  const canvas = document.getElementById('matrix-canvas');
  const glitchLayer = document.getElementById('glitch-overlay');
  const blackout = document.getElementById('blackout');
  const typingOverlay = document.getElementById('typing-overlay');
  const typingWrap = document.getElementById('typing-wrap');

  const input = document.getElementById('coin-input');
  const btnProph = document.getElementById('proph-btn');

  function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

  async function glitchPulse(){
    glitchLayer.classList.remove('hidden');
    glitchLayer.classList.add('glitch-on');
    try{ glitch.currentTime = 0; glitch.volume = 0.8; await glitch.play(); }catch(_){}
    await sleep(620);
    glitchLayer.classList.remove('glitch-on');
    glitchLayer.classList.add('hidden');
  }

  async function introSequence(){
    // 1) Normal home is visible first
    await sleep(1100);

    // 2) Glitch with sound
    await glitchPulse();

    // 3) Blackout
    blackout.classList.remove('hidden');
    requestAnimationFrame(()=> blackout.classList.add('show'));
    await sleep(420);

    // 4) Matrix + typing
    canvas.classList.remove('hidden');
    typingOverlay.classList.remove('hidden');
    await sleep(150);
    await window.ProphetTyping.typeSequence(typingWrap);
    await sleep(500);

    // 5) Fade all away
    typingOverlay.classList.add('hidden');

    // 6) Final short glitch and restore normal
    await glitchPulse();
    blackout.classList.remove('show');
    await sleep(320);
    blackout.classList.add('hidden');
    // Matrix keeps running subtly
  }

  function wireTerminal(){
    async function summon(){
      if(input.value.trim().length === 0) input.value = '$BONK';
      await window.ProphetOracle.prophesy(input.value);
    }
    btnProph.addEventListener('click', summon);
    input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ e.preventDefault(); summon(); }});
  }

  function wireCTA(){
    btnEnter?.addEventListener('click', async ()=>{
      // trigger a quick glitch on CTA to feel responsive (doesn't interrupt scroll)
      glitchPulse();
    });
  }

  window.addEventListener('load', async ()=>{
    wireTerminal();
    wireCTA();
    await introSequence();
  });
})();

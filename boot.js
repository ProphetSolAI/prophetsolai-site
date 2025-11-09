// boot.js
// Orchestrates: show normal → glitch → blackout → matrix + typing → glitch → back to normal.
// Wires the demo terminal (button + Enter).
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
    try{ glitch.currentTime = 0; glitch.volume = 0.7; await glitch.play(); }catch(_){}
    await sleep(600);
    glitchLayer.classList.remove('glitch-on');
    glitchLayer.classList.add('hidden');
  }

  async function introSequence(){
    // 1) Normal home is already visible for a beat
    await sleep(900);

    // 2) First glitch
    await glitchPulse();

    // 3) Blackout
    blackout.classList.remove('hidden');
    requestAnimationFrame(()=> blackout.classList.add('show'));
    await sleep(450);

    // 4) Matrix + typing overlay
    canvas.classList.remove('hidden');
    typingOverlay.classList.remove('hidden');
    await sleep(150);
    await window.ProphetTyping.typeSequence(typingWrap);
    await sleep(400);

    // 5) Second glitch
    await glitchPulse();

    // 6) Return to normal
    typingOverlay.classList.add('hidden');
    blackout.classList.remove('show');
    await sleep(320);
    blackout.classList.add('hidden');
    // Matrix stays running subtly in the background
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
    // If user clicks the CTA, also trigger sequence immediately (helps autoplay restrictions)
    btnEnter?.addEventListener('click', async (e)=>{
      // Let the link still scroll to demo; sequence runs regardless
      if(document.readyState === 'complete'){
        // run a short glitch for feedback
        glitchPulse();
      }
    });
  }

  window.addEventListener('load', async ()=>{
    wireTerminal();
    wireCTA();
    // Kick off the cinematic intro automatically
    await introSequence();
  });
})();

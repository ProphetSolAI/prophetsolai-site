// typing.js
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const prophecyParagraph =
`We listen to the undercurrents: where wallets whisper and memetics collide.
Not numbers alone, but patterns in the dark — liquidity that breathes,
clusters that conspire, narratives that decide. We do not predict; we interpret.`;

  const cliLines = [
    '> parsing transaction clusters_',
    '> analyzing whale topology_',
    '> decoding memetic networks_',
    '> backtesting anomaly signals_',
    '> prophecy score generated: 92.4/100_'
  ];

  function typeInto(el, text, perChar = 26){
    return new Promise(async resolve => {
      el.textContent = '';
      if (prefersReduced){ el.textContent = text; return resolve(); }
      for (let i=0;i<text.length;i++){
        el.textContent += text[i];
        await new Promise(r => setTimeout(r, perChar));
      }
      resolve();
    });
  }

  function revealCLI(listEl, lines, delay = 400){
    if (prefersReduced){
      listEl.innerHTML = lines.map(l => `<li>${l}</li>`).join('');
      return;
    }
    let i=0;
    const tick = () => {
      if (i >= lines.length) return;
      const li = document.createElement('li');
      li.textContent = lines[i++];
      listEl.appendChild(li);
      setTimeout(tick, delay);
    };
    tick();
  }

  function onVisible(el, cb, options={threshold:0.25}){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting){
          cb();
          io.disconnect();
        }
      });
    }, options);
    io.observe(el);
  }

  function initProphecy(){
    const sec = document.getElementById('the-prophecy');
    const txt = document.getElementById('prophecyText');
    const cli = document.getElementById('cli');
    const driftCanvas = document.getElementById('binaryDrift');
    const drift = new window.BinaryDriftProphecy(driftCanvas);

    onVisible(sec, async () => {
      drift.start();
      await typeInto(txt, prophecyParagraph, 22);
      revealCLI(cli, cliLines, 420);
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initProphecy);
  } else {
    initProphecy();
  }
})();

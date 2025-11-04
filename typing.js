// Small typing utility used in two places
function typeText(el, text, speed=28, cb){
  let i=0;
  el.textContent = '';
  function step(){
    if(i < text.length){
      el.textContent += text.charAt(i++);
      setTimeout(step, speed);
    } else if(cb){ cb(); }
  }
  step();
}

// hero short phrase
document.addEventListener('DOMContentLoaded', ()=>{
  const target = document.getElementById('typed');
  if(target) typeText(target, 'half prophet, half analyst — reading memetic storms...', 30);

  // prophecy description
  const desc = document.getElementById('type-desc');
  if(desc) typeText(desc, 'An AI oracle that converts signals into narrative-driven scores — Prophecy Score, Deep Scan results, and community radar.', 22);
});

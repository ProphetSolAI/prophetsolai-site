// intro.js
(function(){
  // Helper: isMobile-ish
  const isMobile = () => /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Elements
  const intro = document.getElementById('intro');
  const video = document.getElementById('intro-bg');
  const typedEl = document.getElementById('typed');
  const typeDescEl = document.getElementById('type-desc');
  const cta = document.querySelector('.cta');
  const matrixCanvas = document.getElementById('matrix');
  const frameCanvas = document.getElementById('frame-canvas');

  // --- Video fallback & mobile behavior ---
  function manageVideoFallback(){
    if(!video) return;
    // If mobile, optionally replace video with poster/image to save bandwidth
    if(isMobile()){
      try{
        // If there is a poster attribute or assets/hero.webp available, swap
        const poster = video.getAttribute('data-poster') || 'hero.webp';
        // Create image node under intro and remove/hide video
        const img = document.createElement('img');
        img.src = poster;
        img.alt = 'Intro Poster';
        img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:contrast(1.05) saturate(1.05) brightness(0.9);';
        video.parentNode.insertBefore(img, video);
        video.style.display = 'none';
      }catch(e){
        console.warn('poster fallback failed', e);
      }
      return;
    }

    // Desktop: ensure muted for autoplay
    video.muted = true;
    video.playsInline = true;
    // try to play and catch autoplay block
    const p = video.play();
    if(p && p.catch){
      p.catch(err => {
        console.warn('Video autoplay blocked — muting and retrying', err);
        video.muted = true;
        setTimeout(()=>video.play().catch(()=>{}), 300);
      });
    }
  }

  // --- Smooth scroll for CTA ---
  function attachCTAScroll(){
    if(!cta) return;
    cta.addEventListener('click', (e)=>{
      e.preventDefault();
      const href = cta.getAttribute('href') || '#the-prophecy';
      const target = document.querySelector(href);
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  }

  // --- Pause/Resume animations when not visible (performance) ---
  function observeVisibility(){
    if(!intro) return;

    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const visible = entry.isIntersecting;
        // matrix canvas: we call a global function to pause/resume drawing if exists
        if(window.__matrixController && typeof window.__matrixController.setActive === 'function'){
          window.__matrixController.setActive(visible);
        } else {
          // fallback: hide canvas when not visible to reduce paint
          if(matrixCanvas) matrixCanvas.style.display = visible ? 'block' : 'none';
        }
        // frame canvas similar
        if(window.__frameController && typeof window.__frameController.setActive === 'function'){
          window.__frameController.setActive(visible);
        } else {
          if(frameCanvas) frameCanvas.style.display = visible ? 'block' : 'none';
        }

        // Pause video when not visible
        if(video){
          try{
            if(!visible && !video.paused) video.pause();
            if(visible && video.paused) video.play().catch(()=>{});
          }catch(e){}
        }
      });
    }, {threshold: 0.1});

    observer.observe(intro);
  }

  // --- Fade-in / reveal animations for intro overlay ---
  function revealIntro(){
    const overlay = document.querySelector('.intro-overlay');
    if(!overlay) return;
    overlay.style.opacity = 0;
    overlay.style.transform = 'translateY(8px)';
    overlay.style.transition = 'opacity .9s ease, transform .9s cubic-bezier(.2,.9,.3,1)';
    // trigger after small delay so that video/video poster loads
    setTimeout(()=>{
      overlay.style.opacity = 1;
      overlay.style.transform = 'translateY(0)';
    }, 180);
  }

  // --- Expose lightweight controllers for matrix/frame from other scripts ---
  // (matrix.js & script.js can set these to more advanced control)
  window.__introControllers = window.__introControllers || {};
  window.__introControllers.getVideo = () => video;

  // --- Resize handling for canvases ---
  function resizeCanvases(){
    if(matrixCanvas){
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
    }
    if(frameCanvas){
      // frame canvas set to fixed height in script.js; keep width synced
      frameCanvas.width = window.innerWidth;
      // if script.js expects a specific height, it will overwrite; keep default safe
      if(!frameCanvas.height) frameCanvas.height = 400;
    }
  }

  // --- Init sequence ---
  function init(){
    manageVideoFallback();
    attachCTAScroll();
    observeVisibility();
    revealIntro();
    resizeCanvases();

    // If typing.js is loaded later, it will handle typed texts — but seed a small call if present
    if(window.typeText && typedEl){
      try{ window.typeText(typedEl, 'half prophet, half analyst — reading memetic storms...', 30); }catch(e){}
    }

    // make sure canvases resize on window resize
    window.addEventListener('resize', resizeCanvases);
  }

  // DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

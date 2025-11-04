(function(){
  const cvs = document.getElementById('graph');
  if(!cvs) return;
  const ctx = cvs.getContext('2d');
  let w,h,cx,cy,nodes=[];

  function resize(){
    w = cvs.width = cvs.clientWidth;
    h = cvs.height = cvs.clientHeight;
    cx = w/2; cy = h/2;
    build();
  }

  function build(){
    nodes = [];
    const count = Math.max(24, Math.floor(w/40));
    for(let i=0;i<count;i++){
      const a = (Math.PI*2)*(i/count);
      const r = 80 + Math.random()*Math.min(w,h)/3;
      nodes.push({
        x: cx + Math

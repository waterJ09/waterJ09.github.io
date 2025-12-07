// 控制 SVG feTurbulence 动画与鼠标交互
document.addEventListener('DOMContentLoaded', ()=>{
  const turb = document.querySelector('feTurbulence');
  if(!turb) return;

  let t = 0;
  const base = {x:0.01,y:0.02};
  let amp = 0.003;

  function frame(){
    t += 0.012;
    const b1 = base.x + Math.sin(t) * amp;
    const b2 = base.y + Math.cos(t * 1.17) * (amp * 1.8);
    turb.setAttribute('baseFrequency', `${b1} ${b2}`);
    requestAnimationFrame(frame);
  }

  frame();

  // 鼠标交互：移动时略微提升振幅
  let pointerTimer = null;
  document.addEventListener('mousemove', (e)=>{
    amp = 0.01; // 增加强度
    clearTimeout(pointerTimer);
    pointerTimer = setTimeout(()=>{ amp = 0.003; }, 400);
  });

  // 点击卡片时加载内嵌预览 iframe（如果 data-src 可用）
  const preview = document.getElementById('preview');
  const iframe = document.getElementById('previewIframe');
  const closeBtn = document.getElementById('closePreview');

  function openPreview(src){
    if(!src) return;
    iframe.src = src;
    preview.setAttribute('aria-hidden','false');
    preview.style.opacity = '1';
  }
  function closePreview(){
    preview.setAttribute('aria-hidden','true');
    preview.style.opacity = '0';
    // 为了避免立即释放资源，短延迟后清空 src
    setTimeout(()=>{ iframe.src = ''; }, 300);
  }

  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click',(ev)=>{
      const src = card.getAttribute('data-src') || card.href;
      if(src && src.indexOf('个人作品')!==-1){
        ev.preventDefault();
        openPreview(src);
      }
    });
  });

  closeBtn && closeBtn.addEventListener('click', closePreview);
  // 点击遮罩空白处关闭
  preview && preview.addEventListener('click',(e)=>{ if(e.target===preview) closePreview(); });
});

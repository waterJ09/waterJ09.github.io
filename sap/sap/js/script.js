// Build a simple lightbox for figures
(function(){
    const figures = Array.from(document.querySelectorAll('.gallery figure'));

    // create lightbox elements
    const lb = document.createElement('div'); lb.className='lightbox'; lb.setAttribute('aria-hidden','true');
    const inner = document.createElement('div'); inner.className='lightbox-inner';
    const imgWrap = document.createElement('div'); imgWrap.className='lightbox-img';
    const aside = document.createElement('div'); aside.className='lightbox-aside';
    const close = document.createElement('button'); close.className='close-btn'; close.innerHTML='✕'; close.setAttribute('aria-label','关闭');
    const bigImg = document.createElement('img'); bigImg.alt = '';
    const caption = document.createElement('div'); caption.className='caption'; caption.style.marginTop='8px';

    imgWrap.appendChild(bigImg);
    aside.appendChild(caption);
    inner.appendChild(imgWrap); inner.appendChild(aside); lb.appendChild(inner); lb.appendChild(close);
    document.body.appendChild(lb);

    let currentIndex = 0;

    function openAt(i){
        const fig = figures[i];
        if(!fig) return;
        const img = fig.querySelector('img');
        const cap = fig.querySelector('figcaption')?.textContent || '';
        bigImg.src = img.src;
        bigImg.alt = img.alt || cap;
        caption.textContent = cap;
        lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
        currentIndex = i;
    }

    function closeLB(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); bigImg.src=''; }

    // attach click handlers
    figures.forEach((f, i)=>{
        f.tabIndex = 0;
        f.addEventListener('click', ()=> openAt(i));
        f.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); openAt(i); }});
    });

    // navigation via arrow keys
    document.addEventListener('keydown', (e)=>{
        if(lb.classList.contains('open')){
            if(e.key==='Escape') closeLB();
            if(e.key==='ArrowRight') openAt((currentIndex+1)%figures.length);
            if(e.key==='ArrowLeft') openAt((currentIndex-1+figures.length)%figures.length);
        }
    });

    // close on overlay click or button
    lb.addEventListener('click', (e)=>{ if(e.target===lb) closeLB(); });
    close.addEventListener('click', closeLB);
})();
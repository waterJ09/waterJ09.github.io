// 从 index.html 拆分的 JS
(function(){
    const el = document.getElementById('typed');
    const name = "婺畔";
    const base = "Hello, I'm ";
    const chars = Array.from(base + name);
    let i = 0;
    function step(){
        i++;
        el.textContent = chars.slice(0,i).join('');
        if(i < chars.length) setTimeout(step, 80);
        else { el.classList.remove('typing'); }
    }
    setTimeout(step, 300);
})();
(function(){
    const fields=['visual stories','poetic imagery','immersive narratives'];
    const ph=['Weaving emotions into visual stories','Echoing silence and color'];
    let fi=0; setInterval(()=>{document.getElementById('field').textContent=fields[fi%fields.length];document.getElementById('philosophy').textContent=ph[fi%ph.length]||'intimate narratives';fi++;},4200);
})();
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalEmbed = document.getElementById('modal-embed');
const mTitle = document.getElementById('m-title');
const mYear = document.getElementById('m-year');
const mMedia = document.getElementById('m-media');
const mDesc = document.getElementById('m-desc');
const closeBtn = document.getElementById('closeBtn');
function attachModalHandler(elem){
    elem.addEventListener('click', (e)=>{
        const a = elem.querySelector('a');
        if(a){
            const href = a.getAttribute('href')||'';
            if(/\.pdf$/i.test(href)){
                e.preventDefault();
                mTitle.textContent = elem.dataset.title || '';
                mYear.textContent = elem.dataset.year || '';
                mMedia.textContent = elem.dataset.media || '';
                mDesc.textContent = elem.dataset.desc || '';
                if(modalImg) modalImg.style.display = 'none';
                if(modalEmbed){ modalEmbed.src = href; modalEmbed.style.display = 'block'; }
                modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
                return;
            }
            if(/\.(jpe?g|png|gif|webp)$/i.test(href)){
                e.preventDefault();
                mTitle.textContent = elem.dataset.title || '';
                mYear.textContent = elem.dataset.year || '';
                mMedia.textContent = elem.dataset.media || '';
                mDesc.textContent = elem.dataset.desc || '';
                if(modalEmbed){ modalEmbed.src=''; modalEmbed.style.display='none'; }
                if(modalImg){ modalImg.style.display='block'; modalImg.src = href; }
                modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
                return;
            }
        }
        const imgDiv = elem.querySelector('.img');
        let bgUrl = '';
        if(imgDiv){
            const bg = getComputedStyle(imgDiv).backgroundImage || '';
            const m = bg.match(/url\(["']?(.*?)["']?\)/);
            if(m && m[1]) bgUrl = m[1];
        }
        if(bgUrl){
            mTitle.textContent = elem.dataset.title || '';
            mYear.textContent = elem.dataset.year || '';
            mMedia.textContent = elem.dataset.media || '';
            mDesc.textContent = elem.dataset.desc || '';
            if(modalEmbed){ modalEmbed.src=''; modalEmbed.style.display='none'; }
            if(modalImg){ modalImg.style.display='block'; modalImg.src = bgUrl; }
            modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
            return;
        }
        const title = elem.dataset.title || '';
        const year = elem.dataset.year || '';
        const media = elem.dataset.media || '';
        const desc = elem.dataset.desc || '';
        mTitle.textContent = title; mYear.textContent = year; mMedia.textContent = media; mDesc.textContent = desc;
        modalImg.src = 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#111"/><text x="50%" y="50%" fill="#aaa" font-size="28" text-anchor="middle">'+title+' ('+year+')</text></svg>');
        modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    });
}
const originalCards = document.querySelectorAll('.portfolio-grid .card');
originalCards.forEach(c=>attachModalHandler(c));
originalCards.forEach(c=>{
    const imgDiv = c.querySelector('.img');
    if(!imgDiv) return;
    const bg = getComputedStyle(imgDiv).backgroundImage || '';
    const a = c.querySelector('a');
    let src = '';
    if(a){
        const href = a.getAttribute('href')||'';
        if(/\.pdf$/i.test(href)){
            let thumb = '';
            if(href.startsWith('个人作品/rino/')){
                const base = href.replace(/\.pdf$/i,'');
                thumb = base + '_page-0001.jpg';
            }
            if(thumb && [
                '个人作品/rino/01_page-0001.jpg',
                '个人作品/rino/S2_page-0001.jpg',
                '个人作品/rino/模块练习_page-0001.jpg'
            ].includes(thumb)){
                src = thumb;
            }
        } else if(/\.(jpe?g|png|gif|webp)$/i.test(href)){
            src = href;
        }
    }
    if(src){
        imgDiv.style.backgroundImage = `url('${src}')`;
    } else {
        if(/bg\.jpg|gradient|none|linear-gradient/i.test(bg) || bg.trim()===''){
            const seed = encodeURIComponent((c.dataset.title||Math.random()).slice(0,20));
            imgDiv.style.backgroundImage = `url('https://picsum.photos/seed/${seed}/800/600')`;
        }
    }
});
function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    if(modalEmbed){ modalEmbed.src = ''; modalEmbed.style.display = 'none'; }
    if(modalImg){ modalImg.src = ''; modalImg.style.display = 'block'; }
}
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click',(e)=>{if(e.target===modal) { closeModal(); }});
const bookBtn = document.getElementById('bookBtn');
const form = document.getElementById('contactForm');
const envIcon = document.getElementById('envIcon');
bookBtn.addEventListener('click',()=>{form.classList.toggle('active');if(form.classList.contains('active')){document.getElementById('name').focus();}});
document.querySelector('.email').addEventListener('mouseenter',()=>{envIcon.style.transform='translateY(-6px)';});
document.querySelector('.email').addEventListener('mouseleave',()=>{envIcon.style.transform='translateY(0)';});
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;} resizeCanvas(); window.addEventListener('resize',resizeCanvas);
function emitParticles(x,y){
    const particles = [];
    for(let i=0;i<60;i++){particles.push({x,y, vx:(Math.random()-0.5)*6, vy:(Math.random()-1.8)*6, life:Math.random()*60+30, r:Math.random()*2+1});}
    let t=0; const id = setInterval(()=>{ctx.clearRect(0,0,canvas.width,canvas.height); for(let p of particles){p.x+=p.vx; p.y+=p.vy; p.vy+=0.12; p.life--; ctx.beginPath(); ctx.fillStyle='rgba(212,175,55,'+Math.max(p.life/80,0)+')'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();} t++; if(particles.every(p=>p.life<=0)){clearInterval(id);ctx.clearRect(0,0,canvas.width,canvas.height);} },16);
}
form.addEventListener('submit',function(e){e.preventDefault();
    const rect = bookBtn.getBoundingClientRect(); emitParticles(rect.left+rect.width/2, rect.top+10);
    form.reset(); form.classList.remove('active');
    const old = bookBtn.textContent; bookBtn.textContent='已发送 ✓'; setTimeout(()=>bookBtn.textContent=old,2200);
});
(function(){
    const buttons = document.querySelectorAll('.skill-btn');
    const gallery = document.getElementById('skills-gallery');
    const sourceCards = Array.from(gallery.querySelectorAll('.card'));
    const noteEl = document.getElementById('skill-note');
    function clearPlaceholders(){ const ph = gallery.querySelectorAll('.card.empty'); ph.forEach(p=>p.remove()); }
    function showAll(){ clearPlaceholders(); sourceCards.forEach(c=>c.style.display='block'); noteEl.textContent = '显示全部技能作品（不会改变项目经历）'; }
    function showForSkill(skill){
        clearPlaceholders();
        const matched = sourceCards.filter(c=>{
            const s = (c.dataset.skill || c.dataset.skills || '');
            return s.split(',').map(x=>x.trim()).includes(skill);
        });
        sourceCards.forEach(c=>c.style.display='none');
        if(matched.length===0){
            for(let i=0;i<2;i++){
                const empty = document.createElement('div'); empty.className='card empty';
                empty.innerHTML = '<div class="img" style="background-image:url(\'bg.jpg\')"></div><div class="overlay"><div class="meta">空照片</div></div>';
                gallery.appendChild(empty);
            }
            noteEl.textContent = '未找到对应作品，显示占位。';
            return;
        }
        matched.forEach(c=>c.style.display='block');
        noteEl.textContent = `正在显示使用 ${skill} 的作品`;
    }
    buttons.forEach(b=>{
        b.addEventListener('click',()=>{
            buttons.forEach(x=>x.classList.remove('active'));
            b.classList.add('active');
            const skill = b.dataset.skill;
            if(skill==='All') showAll(); else showForSkill(skill);
        });
    });
    const allBtn = document.querySelector('.skill-btn[data-skill="All"]'); if(allBtn) allBtn.classList.add('active');
    showAll();
})();
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); } });

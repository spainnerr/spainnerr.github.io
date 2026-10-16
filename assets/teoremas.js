(() => {
 const cards=[...document.querySelectorAll('.theorem')];
 const search=document.getElementById('search'),area=document.getElementById('area'),technique=document.getElementById('technique');
 const norm=s=>s.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const texts=cards.map(c=>norm(c.textContent));
 function filter(){let n=0;const terms=norm(search.value).trim().split(/\s+/).filter(Boolean);cards.forEach((c,i)=>{const show=(!area.value||c.dataset.area===area.value)&&(!technique.value||c.dataset.technique===technique.value)&&terms.every(t=>texts[i].includes(t));c.hidden=!show;if(show)n++;});document.getElementById('count').textContent=n+' de '+cards.length+' teoremas';document.getElementById('empty').hidden=n!==0;}
 search.addEventListener('input',filter);area.addEventListener('change',filter);technique.addEventListener('change',filter);
 function clear(){search.value='';area.value='';technique.value='';filter();}
 document.getElementById('clear').addEventListener('click',()=>{clear();search.focus();});
 function openHash(){const id=location.hash.slice(1);const card=cards.find(c=>c.id===id);if(card){clear();card.querySelector('details').open=true;requestAnimationFrame(()=>card.scrollIntoView());}}
 window.addEventListener('hashchange',openHash);
 const theme=document.getElementById('theme');let dark=matchMedia('(prefers-color-scheme: dark)').matches;try{const saved=localStorage.getItem('spainner-theme');if(saved)dark=saved==='dark';}catch{}
 function apply(){document.body.classList.toggle('dark',dark);theme.setAttribute('aria-pressed',String(dark));theme.setAttribute('aria-label',dark?'Ativar modo claro':'Ativar modo escuro');}apply();theme.addEventListener('click',()=>{dark=!dark;apply();try{localStorage.setItem('spainner-theme',dark?'dark':'light');}catch{}});
 if(typeof renderMathInElement==='function'){renderMathInElement(document.querySelector('.theorems'),{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});}
 else {const note=document.createElement('p');note.textContent='A formatação das fórmulas não carregou. O conteúdo continua disponível em LaTeX; recarregue a página para tentar novamente.';document.getElementById('count').after(note);}
 openHash();
})();

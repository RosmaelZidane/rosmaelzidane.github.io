document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); }));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); } });
  }
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.pub-entry');
  const search = document.getElementById('pub-search');
  const count = document.getElementById('filtered-count');
  if(cards.length) {
    let active = 'all';
    const apply = () => {
      const query=(search?.value || '').trim().toLowerCase();
      let visible=0;
      cards.forEach(card => { const show=(active==='all' || card.dataset.kind===active) && card.textContent.toLowerCase().includes(query); card.hidden=!show; if(show) visible++; });
      if(count)count.textContent=`Showing ${visible} of ${cards.length} peer-reviewed papers`;
    };
    filterButtons.forEach(button => button.addEventListener('click',()=>{active=button.dataset.filter;filterButtons.forEach(b=>{const selected=b===button; b.classList.toggle('active',selected); b.setAttribute('aria-pressed',String(selected));});apply();}));
    search?.addEventListener('input',apply);
    apply();
  }
});

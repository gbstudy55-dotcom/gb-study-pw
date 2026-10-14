const grid = document.getElementById('courseGrid');
const search = document.getElementById('courseSearch');
const count = document.getElementById('courseCount');
let courses = [];
let activeFilter = 'All';

function safeUrl(value) {
  try { const u = new URL(value, location.origin); return ['http:', 'https:'].includes(u.protocol) ? u.href : '#'; }
  catch { return '#'; }
}
function renderCourses() {
  const term = search.value.trim().toLowerCase();
  const shown = courses.filter(c => (activeFilter === 'All' || c.category === activeFilter) &&
    [c.title, c.subtitle, c.category, c.description].join(' ').toLowerCase().includes(term));
  count.textContent = String(shown.length).padStart(2, '0');
  if (!shown.length) { grid.innerHTML = '<div class="empty-state">No matching learning areas. Try another search.</div>'; return; }
  grid.innerHTML = shown.map(c => {
    const url = safeUrl(c.url || '#');
    const isPlaceholder = url === '#' || url === location.href + '#';
    return `<article class="course-card accent-${escapeText(c.accent || 'violet')}">
      <div class="card-top"><div class="course-icon" aria-hidden="true">${escapeText(c.icon || '📘')}</div><span class="category-tag">${escapeText(c.category || 'Learning')}</span></div>
      <h3>${escapeText(c.title)}</h3><p class="subtitle">${escapeText(c.subtitle || '')}</p><p class="description">${escapeText(c.description || '')}</p>
      <a class="card-link" href="${url}" ${isPlaceholder ? 'data-placeholder="true"' : 'target="_blank" rel="noopener"'}><span>${isPlaceholder ? 'Add your course link' : 'Open learning area'}</span><span>↗</span></a></article>`;
  }).join('');
  grid.querySelectorAll('[data-placeholder="true"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); alert('Edit courses.json and add your own course URL to activate this card.'); }));
}
function escapeText(value) { return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
fetch('/courses.json').then(r => { if (!r.ok) throw new Error('Could not load courses'); return r.json(); }).then(data => { courses = Array.isArray(data) ? data : []; renderCourses(); }).catch(() => { grid.innerHTML = '<div class="empty-state">Courses could not be loaded. Please check courses.json.</div>'; });
search.addEventListener('input', renderCourses);
document.getElementById('filterPills').addEventListener('click', e => { const btn = e.target.closest('[data-filter]'); if (!btn) return; activeFilter = btn.dataset.filter; document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn)); renderCourses(); });
document.getElementById('menuToggle').addEventListener('click', () => document.getElementById('mobileNav').classList.toggle('open'));
document.getElementById('mobileNav').querySelectorAll('a').forEach(a => a.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();
const overlay = document.getElementById('tgOverlay');
function closeModal() { overlay.hidden = true; try { sessionStorage.setItem('gbstudy_tg_dismissed', '1'); } catch {} }
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalLater').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) closeModal(); });
let alreadyDismissed = false; try { alreadyDismissed = sessionStorage.getItem('gbstudy_tg_dismissed') === '1'; } catch {}
if (!alreadyDismissed) setTimeout(() => { overlay.hidden = false; }, 900);

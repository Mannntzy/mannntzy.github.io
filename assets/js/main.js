/* =========================================================
   main.js: interaksi & animasi portfolio
   ========================================================= */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));

  /* ---------------- THEME ---------------- */
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  }
  $('#theme-toggle').addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    // grafik SVG memakai warna eksplisit, jadi harus digambar ulang saat tema berubah
    document.dispatchEvent(new CustomEvent('themechange'));
  });

  /* ---------------- NAVBAR ---------------- */
  const navbar = $('#navbar');
  const navInner = $('#nav-inner');
  function onScrollNav() {
    const scrolled = window.scrollY > 24;
    navbar.classList.toggle('bg-white/85', scrolled);
    navbar.classList.toggle('dark:bg-ink-950/80', scrolled);
    navbar.classList.toggle('backdrop-blur-xl', scrolled);
    navbar.classList.toggle('shadow-sm', scrolled);
    navbar.classList.toggle('border-b', scrolled);
    navbar.classList.toggle('border-ink-100', scrolled);
    navbar.classList.toggle('dark:border-ink-800', scrolled);
    navInner.classList.toggle('h-14', scrolled);
    navInner.classList.toggle('md:h-16', scrolled);
  }
  onScrollNav();

  /* ---------------- MOBILE MENU ---------------- */
  const menu = $('#mobile-menu');
  const overlay = $('#mobile-overlay');
  const menuToggle = $('#menu-toggle');
  function openMenu() {
    menu.classList.remove('translate-x-full');
    menu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.add('translate-x-full');
    menu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }
  menuToggle.addEventListener('click', openMenu);
  $('#menu-close').addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  $$('.mobile-link').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------------- TYPED EFFECT ---------------- */
  const typedEl = $('#typed');
  const roles = ['Data Analyst', 'Data Scientist (NLP)', 'UI/UX Designer'];
  if (window.Typed && !reduceMotion) {
    new window.Typed('#typed', {
      strings: roles,
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1800,
      startDelay: 500,
      loop: true,
      smartBackspace: true
    });
  } else {
    typedEl.textContent = roles[0];
  }

  /* ---------------- SKILLS ---------------- */
  // Ikon & warna aksen per kategori, tiap chip jadi punya identitas visual
  // bukan centang seragam.
  const CAT = {
    data:       { c: 'text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50',            i: '<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path stroke-linecap="round" d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6"/>' },
    ml:         { c: 'text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/50', i: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.5 4a2.5 2.5 0 00-2.5 2.5A2.5 2.5 0 004.5 9v1.5A2.5 2.5 0 006 12.8V15a3 3 0 003 3h.5V4h-.5zM14.5 4a2.5 2.5 0 012.5 2.5A2.5 2.5 0 0119.5 9v1.5a2.5 2.5 0 01-1.5 2.3V15a3 3 0 01-3 3H14V4h.5z"/>' },
    design:     { c: 'text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50',        i: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3l2.2 4.9 5.3.6-4 3.6 1.1 5.3L12 14.8 7.4 17.4l1.1-5.3-4-3.6 5.3-.6z"/>' },
    web:        { c: 'text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60',    i: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.5 8L4.5 12l4 4M15.5 8l4 4-4 4M13.5 5l-3 14"/>' },
    enterprise: { c: 'text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50',    i: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 21V6l7-3v18M11 21h9V10h-9M14.5 13.5h2M14.5 17h2M7 8.5h1M7 12h1M7 15.5h1"/>' },
    devops:     { c: 'text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50', i: '<circle cx="6.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="12" r="2.5"/><path stroke-linecap="round" d="M6.5 9v6M9 6.5h3.5a2.5 2.5 0 012.5 2.5v.5M9 17.5h3.5a2.5 2.5 0 002.5-2.5v-.5"/>' },
    soft:       { c: 'text-ink-600 dark:text-ink-300 bg-ink-100 dark:bg-ink-800',              i: '<circle cx="9" cy="8" r="3"/><path stroke-linecap="round" d="M3.5 19a5.5 5.5 0 0111 0M16 6.5a3 3 0 010 5.5M17.5 19a5 5 0 00-2-4"/>' }
  };

  const skillGrid = $('#skill-grid');

  function renderSkills(filter) {
    const list = filter === 'all' ? SKILLS : SKILLS.filter(s => s.cat === filter);
    skillGrid.innerHTML = list.map(s => {
      const cat = CAT[s.cat] || CAT.soft;
      return `
      <div class="group surface spotlight flex items-center gap-3 px-3.5 py-3 rounded-2xl border border-ink-100 dark:border-ink-800/80 hover:border-brand-300 dark:hover:border-brand-700 opacity-0 translate-y-2 transition-all duration-500" title="${s.name}">
        <span class="chip-icon grid place-items-center w-9 h-9 shrink-0 rounded-xl ${cat.c}">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true">${cat.i}</svg>
        </span>
        <span class="text-[13px] font-semibold leading-tight text-ink-700 dark:text-ink-200">${s.name}</span>
      </div>`;
    }).join('');

    $$('#skill-grid > div').forEach((el, i) => {
      const delay = reduceMotion ? 0 : Math.min(i * 35, 550);
      setTimeout(() => el.classList.remove('opacity-0', 'translate-y-2'), delay + 20);
    });
    bindSpotlight(skillGrid);
  }

  function setTabState(tabs, active) {
    tabs.forEach(t => {
      const on = t.dataset.filter === active;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.classList.toggle('bg-brand-600', on);
      t.classList.toggle('text-white', on);
      t.classList.toggle('border-brand-600', on);
      t.classList.toggle('shadow-lg', on);
      t.classList.toggle('shadow-brand-600/25', on);
      t.classList.toggle('border-ink-200', !on);
      t.classList.toggle('dark:border-ink-700', !on);
      t.classList.toggle('text-ink-600', !on);
      t.classList.toggle('dark:text-ink-300', !on);
      t.classList.toggle('hover:border-brand-400', !on);
      t.classList.toggle('hover:text-brand-700', !on);
    });
  }

  const skillTabs = $$('.skill-tab');
  skillTabs.forEach(tab => tab.addEventListener('click', () => {
    setTabState(skillTabs, tab.dataset.filter);
    renderSkills(tab.dataset.filter);
  }));
  setTabState(skillTabs, 'all');
  renderSkills('all');

  /* ---------------- EXPERIENCE TIMELINE ---------------- */
  const typeColor = {
    'Internship':  'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 ring-brand-200/70 dark:ring-brand-800',
    'Riset':       'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 ring-violet-200/70 dark:ring-violet-800',
    'Organisasi':  'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 ring-amber-200/70 dark:ring-amber-800',
    'Profesional': 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 ring-sky-200/70 dark:ring-sky-800'
  };

  const tlList = $('#timeline ol');
  tlList.innerHTML = EXPERIENCES.map((e, i) => {
    const right = i % 2 === 1;
    const aos = reduceMotion ? 'fade-up' : (right ? 'fade-left' : 'fade-right');
    return `
    <li class="relative pl-11 md:pl-0 md:grid md:grid-cols-2 md:gap-10" data-aos="${aos}">
      <span class="tl-dot absolute left-[15px] md:left-1/2 top-6 w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-white dark:bg-ink-950 ring-4 ring-ink-200 dark:ring-ink-800 transition-all duration-500" aria-hidden="true"></span>
      <div class="${right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}">
        <article class="surface spotlight p-6 rounded-3xl border border-ink-100 dark:border-ink-800/80 hover:border-brand-300 dark:hover:border-brand-700 ${e.todo ? 'border-dashed' : ''}">
          <div class="flex flex-wrap items-center gap-2 ${right ? '' : 'md:justify-end'}">
            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ring-1 ${typeColor[e.type] || typeColor['Profesional']}">${e.type}</span>
            ${e.todo ? '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400">Detail menyusul</span>' : ''}
          </div>
          <h3 class="mt-3 text-lg font-bold leading-snug text-ink-950 dark:text-white">${e.role}</h3>
          <p class="mt-0.5 font-medium text-brand-700 dark:text-brand-300">${e.org}</p>
          <p class="mt-1 text-sm font-mono text-ink-500 dark:text-ink-400">${e.period}</p>
          ${e.note ? `<p class="mt-1 text-xs italic text-ink-400">${e.note}</p>` : ''}
          <ul class="mt-4 space-y-2 text-sm text-ink-600 dark:text-ink-300 text-left">
            ${e.points.map(p => `<li class="flex gap-2"><span class="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-400"></span><span>${p}</span></li>`).join('')}
          </ul>
        </article>
      </div>
    </li>`;
  }).join('');

  /* ---------------- PROJECTS ---------------- */
  const ICONS = {
    brain:  '<path stroke-linecap="round" stroke-linejoin="round" d="M9.5 4a2.5 2.5 0 00-2.5 2.5A2.5 2.5 0 004.5 9v1.5A2.5 2.5 0 006 12.8V15a3 3 0 003 3h.5V4h-.5zM14.5 4a2.5 2.5 0 012.5 2.5A2.5 2.5 0 0119.5 9v1.5a2.5 2.5 0 01-1.5 2.3V15a3 3 0 01-3 3H14V4h.5z"/>',
    chart:  '<path stroke-linecap="round" stroke-linejoin="round" d="M4 20V10m5 10V4m5 16v-7m5 7V8"/>',
    design: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 16l6-6 4 4 6-8M4 20h16"/><circle cx="10" cy="10" r="1.6"/>',
    system: '<rect x="3" y="4" width="18" height="12" rx="2"/><path stroke-linecap="round" d="M8 20h8M12 16v4"/>'
  };

  const grid = $('#project-grid');
  function projectCard(p, idx, wide) {
    return `
    <article class="project-card ${wide ? 'sm:col-span-2' : ''} group cursor-pointer surface spotlight overflow-hidden rounded-3xl border ${p.todo ? 'border-dashed' : ''} border-ink-100 dark:border-ink-800/80 hover:border-brand-300 dark:hover:border-brand-700 opacity-0 translate-y-3 transition-all duration-500"
      data-project="${idx}" tabindex="0" role="button" aria-label="Lihat detail ${p.title}">
      <div class="relative ${wide ? 'h-52' : 'h-40'} overflow-hidden grain bg-gradient-to-br ${p.gradient}">
        <div class="absolute inset-0 opacity-[.18] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:16px_16px]"></div>
        <div class="absolute -top-16 -right-10 w-44 h-44 rounded-full bg-white/20 blur-2xl"></div>
        <div class="absolute inset-0 grid place-items-center text-white/95 drop-shadow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">${ICONS[p.icon] || ICONS.chart}</svg>
        </div>
        <div class="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/35 transition-colors duration-300 grid place-items-center">
          <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-ink-900 text-sm font-semibold shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Lihat detail
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6"/></svg>
          </span>
        </div>
        ${p.todo ? '<span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-ink-600">Detail menyusul</span>' : ''}
      </div>
      <div class="p-5">
        <p class="text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">${p.tag}</p>
        <h3 class="mt-1.5 font-bold leading-snug text-ink-950 dark:text-white">${p.title}</h3>
        <p class="mt-1 text-xs text-ink-500 dark:text-ink-400">${p.meta}</p>
        <p class="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300 line-clamp-3">${p.desc}</p>
        <div class="mt-4 flex flex-wrap gap-1.5">
          ${p.tech.slice(0, 3).map(t => `<span class="px-2 py-1 rounded-md text-[11px] font-medium bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300">${t}</span>`).join('')}
          ${p.tech.length > 3 ? `<span class="px-2 py-1 rounded-md text-[11px] font-medium text-ink-400">+${p.tech.length - 3}</span>` : ''}
        </div>
      </div>
    </article>`;
  }

  function renderProjects(filter) {
    const items = PROJECTS.map((p, i) => ({ p, i })).filter(o => filter === 'all' || o.p.cat === filter);
    // kartu pertama dibuat lebih lebar supaya grid tidak terbaca datar
    grid.innerHTML = items.map((o, n) => projectCard(o.p, o.i, n === 0)).join('');
    $$('.project-card').forEach((el, i) => {
      const delay = reduceMotion ? 0 : Math.min(i * 70, 700);
      setTimeout(() => el.classList.remove('opacity-0', 'translate-y-3'), delay + 20);
      el.addEventListener('click', () => openModal(PROJECTS[+el.dataset.project]));
      el.addEventListener('keydown', ev => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openModal(PROJECTS[+el.dataset.project]); }
      });
    });
    bindSpotlight(grid);
  }

  /* ---------------- SPOTLIGHT MENGIKUTI KURSOR ---------------- */
  function bindSpotlight(scope) {
    if (reduceMotion || !window.matchMedia('(pointer:fine)').matches) return;
    $$('.spotlight', scope || document).forEach(el => {
      if (el.dataset.spot) return;
      el.dataset.spot = '1';
      el.addEventListener('pointermove', ev => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        el.style.setProperty('--my', (ev.clientY - r.top) + 'px');
      });
    });
  }

  const projectTabs = $$('.project-tab');
  projectTabs.forEach(tab => tab.addEventListener('click', () => {
    setTabState(projectTabs, tab.dataset.filter);
    renderProjects(tab.dataset.filter);
  }));
  setTabState(projectTabs, 'all');
  renderProjects('all');

  /* ---------------- SERTIFIKAT ---------------- */
  const certGrid = $('#cert-grid');
  const SEAL = '<svg class="w-9 h-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 13.8L7 21.5l5-2.6 5 2.6-1.5-7.7"/></svg>';

  if (certGrid && typeof CERTS !== 'undefined') {
    certGrid.innerHTML = CERTS.map((c, i) => `
      <article class="cert-card group surface spotlight overflow-hidden rounded-3xl border ${c.featured ? 'border-brand-300 dark:border-brand-700' : 'border-ink-100 dark:border-ink-800/80'} hover:border-brand-400 dark:hover:border-brand-600 cursor-pointer"
        data-cert="${i}" tabindex="0" role="button" aria-label="Lihat sertifikat ${c.title}" data-aos="fade-up" data-aos-delay="${i * 70}">
        <div class="relative h-40 overflow-hidden bg-ink-50 dark:bg-ink-950/60">
          ${c.type === 'image'
            ? `<img src="${c.file}" alt="Sertifikat ${c.title}" loading="lazy" decoding="async" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />`
            : `<div class="w-full h-full grid place-items-center bg-gradient-to-br from-brand-500 to-emerald-600 text-white grain">
                 <div class="text-center px-4">
                   <span class="inline-grid place-items-center">${SEAL}</span>
                   <p class="mt-2 text-[11px] font-bold uppercase tracking-[0.18em]">Dokumen PDF</p>
                 </div>
               </div>`}
          <div class="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/35 transition-colors duration-300 grid place-items-center">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 text-ink-900 text-xs font-semibold shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              ${c.type === 'pdf' ? 'Buka PDF' : 'Lihat sertifikat'}
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6"/></svg>
            </span>
          </div>
          ${c.result ? `<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-700 shadow">${c.result}</span>` : ''}
        </div>
        <div class="p-5">
          <p class="text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">${c.issuer}</p>
          <h4 class="mt-1.5 font-bold leading-snug text-ink-950 dark:text-white">${c.title}</h4>
          <p class="mt-1 text-xs text-ink-500 dark:text-ink-400">${c.date}</p>
          ${c.note ? `<p class="mt-2 text-[11px] leading-snug text-ink-400 dark:text-ink-500 italic">${c.note}</p>` : ''}
          <p class="mt-3 text-[11px] font-mono text-ink-400 break-all">${c.id}</p>
        </div>
      </article>`).join('');

    $$('.cert-card').forEach(el => {
      const open = () => openCert(CERTS[+el.dataset.cert]);
      el.addEventListener('click', open);
      el.addEventListener('keydown', ev => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); }
      });
    });
    bindSpotlight(certGrid);
  }

  const lightbox = $('#lightbox');
  const lbPanel = $('#lightbox-panel');
  const lbBackdrop = $('#lightbox-backdrop');
  let lbLastFocused = null;

  function openCert(c) {
    // PDF dibuka di tab baru; gambar tampil di lightbox
    if (c.type === 'pdf') { window.open(c.file, '_blank', 'noopener'); return; }
    lbLastFocused = document.activeElement;
    $('#lightbox-img').src = c.file;
    $('#lightbox-img').alt = 'Sertifikat ' + c.title;
    $('#lightbox-title').textContent = c.title;
    $('#lightbox-meta').textContent = `${c.issuer} · ${c.date}${c.id ? ' · ID ' + c.id : ''}`;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      lbBackdrop.classList.remove('opacity-0');
      lbPanel.classList.remove('opacity-0', 'scale-95');
    });
    $('#lightbox-close').focus();
  }

  function closeCert() {
    lbBackdrop.classList.add('opacity-0');
    lbPanel.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
      if (lbLastFocused) lbLastFocused.focus();
    }, reduceMotion ? 0 : 280);
  }

  $('#lightbox-close').addEventListener('click', closeCert);
  lbBackdrop.addEventListener('click', closeCert);

  /* ---------------- MODAL ---------------- */
  const modal = $('#modal');
  const modalPanel = $('#modal-panel');
  const modalBackdrop = $('#modal-backdrop');
  let lastFocused = null;

  function openModal(p) {
    lastFocused = document.activeElement;
    $('#modal-tag').textContent = p.tag;
    $('#modal-title').textContent = p.title;
    $('#modal-meta').textContent = p.meta;
    $('#modal-desc').textContent = p.desc;
    $('#modal-media').className = 'h-44 sm:h-56 rounded-t-3xl grid place-items-center text-white/90 bg-gradient-to-br ' + p.gradient;
    $('#modal-media').innerHTML = `<svg class="w-16 h-16" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24" aria-hidden="true">${ICONS[p.icon] || ICONS.chart}</svg>`;
    $('#modal-points').innerHTML = p.points.map(pt =>
      `<li class="flex gap-2"><span class="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-400"></span><span>${pt}</span></li>`).join('');
    $('#modal-tech').innerHTML = p.tech.map(t =>
      `<span class="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300">${t}</span>`).join('');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      modalBackdrop.classList.remove('opacity-0');
      modalPanel.classList.remove('opacity-0', 'translate-y-4', 'scale-95');
    });
    $('#modal-close').focus();
  }

  function closeModal() {
    modalBackdrop.classList.add('opacity-0');
    modalPanel.classList.add('opacity-0', 'translate-y-4', 'scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }, reduceMotion ? 0 : 280);
  }

  $('#modal-close').addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!lightbox.classList.contains('hidden')) closeCert();
      else if (!modal.classList.contains('hidden')) closeModal();
      else if (!menu.classList.contains('translate-x-full')) closeMenu();
    }
  });

  /* ---------------- COUNTER + BAR + REVEAL ---------------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    if (reduceMotion) { el.textContent = target.toFixed(dec); return; }
    const dur = 1400, start = performance.now();
    (function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(dec);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(dec);
    })(start);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.count !== undefined) animateCount(el);
      if (el.dataset.bar !== undefined) el.style.width = el.dataset.bar + '%';
      io.unobserve(el);
    });
  }, { threshold: 0.35 });

  $$('[data-count], [data-bar]').forEach(el => io.observe(el));

  // garis aksen di kiri judul section, muncul saat kepala section masuk layar
  const headIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); headIO.unobserve(e.target); } });
  }, { threshold: 0.5 });
  $$('.sec-head').forEach(el => headIO.observe(el));

  /* ---------------- SCROLLSPY + TIMELINE PROGRESS ---------------- */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav-link');
  const tlWrap = $('#timeline');
  const tlProgress = $('#timeline-progress');
  const tlDots = () => $$('.tl-dot');

  const toTop = $('#to-top');
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  const progressBar = $('#scroll-progress');
  const navPills = $('#nav-pills');
  const navIndicator = $('#nav-indicator');

  // indikator pil yang menggeser ke menu aktif
  function moveIndicator() {
    if (!navPills || !navIndicator) return;
    const active = navLinks.filter(a => a.classList.contains('active'))[0];
    // offsetWidth 0 = pil menu belum dilayout (mobile, atau CSS belum siap saat init)
    if (!active || !navPills.offsetWidth || !active.offsetWidth) {
      navIndicator.style.opacity = '0';
      return;
    }
    const p = navPills.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    navIndicator.style.width = r.width + 'px';
    navIndicator.style.height = r.height + 'px';
    navIndicator.style.transform = `translate(${r.left - p.left}px, ${r.top - p.top}px)`;
    navIndicator.style.opacity = '1';
  }

  function onScroll() {
    onScrollNav();

    // progress bar baca
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';

    if (toTop) toTop.classList.toggle('show', window.scrollY > 600);

    // scrollspy
    const pos = window.scrollY + window.innerHeight * 0.3;
    let current = sections[0] ? sections[0].id : '';
    sections.forEach(s => { if (s.offsetTop <= pos) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    moveIndicator();

    // timeline draw-in
    if (tlWrap && tlProgress) {
      const r = tlWrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height || 1)));
      tlProgress.style.height = (p * 100) + '%';

      tlDots().forEach(dot => {
        const d = dot.getBoundingClientRect();
        const active = d.top < vh * 0.72 && d.bottom > 0;
        dot.classList.toggle('ring-brand-500', active);
        dot.classList.toggle('scale-125', active);
        dot.classList.toggle('ring-ink-200', !active);
        dot.classList.toggle('dark:ring-ink-800', !active);
      });
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  // CSS dari CDN kadang baru siap setelah main.js jalan, jadi hitung ulang posisi
  // indikator saat semua aset selesai dimuat dan sekali lagi setelah font settle.
  window.addEventListener('load', onScroll);
  setTimeout(onScroll, 400);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onScroll);

  /* ---------------- PARALLAX BLOB (desktop only) ---------------- */
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const blobs = $$('[data-parallax]');
    window.addEventListener('mousemove', e => {
      const cx = e.clientX - window.innerWidth / 2;
      const cy = e.clientY - window.innerHeight / 2;
      blobs.forEach(b => {
        const f = parseFloat(b.dataset.parallax);
        b.style.translate = `${cx * f}px ${cy * f}px`;
      });
    }, { passive: true });
  }

  /* ---------------- CONTACT FORM ---------------- */
  const form = $('#contact-form');
  const btn = $('#submit-btn');
  const label = $('#btn-label');
  const spinner = $('#btn-spinner');
  const check = $('#btn-check');
  const status = $('#form-status');

  function resetBtn(text) {
    label.textContent = text;
    spinner.classList.add('hidden');
    check.classList.add('hidden');
    btn.disabled = false;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const data = new FormData(form);
    const endpoint = form.getAttribute('action');

    // Fallback: kalau endpoint Formspree belum diisi, buka email client.
    if (!endpoint || endpoint.indexOf('YOUR_FORM_ID') !== -1) {
      const subject = encodeURIComponent(data.get('subject') || ('Pesan dari ' + data.get('name')));
      const body = encodeURIComponent(`${data.get('message')}

${data.get('name')} (${data.get('email')})`);
      window.location.href = `mailto:hilman01taufiq@gmail.com?subject=${subject}&body=${body}`;
      status.textContent = 'Membuka aplikasi email kamu...';
      status.className = 'mt-3 text-sm text-center text-ink-500 dark:text-ink-400';
      return;
    }

    btn.disabled = true;
    label.textContent = 'Mengirim...';
    spinner.classList.remove('hidden');
    status.textContent = '';

    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('Gagal mengirim');
      spinner.classList.add('hidden');
      check.classList.remove('hidden');
      label.textContent = 'Terkirim!';
      status.textContent = 'Terima kasih! Pesan kamu sudah masuk, saya akan balas secepatnya.';
      status.className = 'mt-3 text-sm text-center text-brand-600 dark:text-brand-300 font-medium';
      form.reset();
      setTimeout(() => resetBtn('Kirim Pesan'), 3500);
    } catch (err) {
      resetBtn('Kirim Pesan');
      status.textContent = 'Maaf, pengiriman gagal. Silakan email langsung ke hilman01taufiq@gmail.com';
      status.className = 'mt-3 text-sm text-center text-red-600 dark:text-red-400 font-medium';
    }
  });

  /* ---------------- MISC ---------------- */
  // Tombol Download CV menunjuk ke file yang mungkin belum ada. Cek dulu;
  // kalau 404, ubah jadi tautan email supaya pengunjung tidak menemui halaman kosong.
  const cvBtn = $('a[download]');
  if (cvBtn) {
    fetch(cvBtn.getAttribute('href'), { method: 'HEAD' })
      .then(res => { if (!res.ok) throw new Error('404'); })
      .catch(() => {
        cvBtn.removeAttribute('download');
        cvBtn.setAttribute('href', 'mailto:hilman01taufiq@gmail.com?subject=' +
          encodeURIComponent('Permintaan CV - Hilman Taufiq Al Hakim'));
        const label = cvBtn.querySelector('svg') ? cvBtn.lastChild : null;
        if (label && label.nodeType === 3) label.textContent = ' Minta CV ';
        else cvBtn.innerHTML = cvBtn.innerHTML.replace('Download CV', 'Minta CV');
        cvBtn.setAttribute('title', 'File CV belum diunggah, tombol ini mengirim email permintaan');
      });
  }

  bindSpotlight(document);
  $('#year').textContent = new Date().getFullYear();

  if (window.AOS) {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60, disable: reduceMotion });
  }
})();

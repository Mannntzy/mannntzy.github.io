/* =========================================================
   charts.js: grafik SVG yang dihitung langsung dari data.js
   Palet warna sudah divalidasi (lightness band, chroma floor,
   pemisahan buta warna, kontras) untuk mode terang & gelap.
   ========================================================= */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDark = () => document.documentElement.classList.contains('dark');

  // Palet tervalidasi: light #4f46e5/#d97706/#0d9488, dark #6366f1/#d97706/#0d9488
  const PALETTE = {
    light: { seq: '#4f46e5', cat: ['#4f46e5', '#d97706', '#0d9488'], grid: '#e6e6ef', ink: '#5b5b70', inkStrong: '#24242f', surface: '#ffffff' },
    dark:  { seq: '#6366f1', cat: ['#6366f1', '#d97706', '#0d9488'], grid: '#33333f', ink: '#9c9cb0', inkStrong: '#eeeef5', surface: '#17161d' }
  };
  const P = () => (isDark() ? PALETTE.dark : PALETTE.light);

  const CAT_LABEL = {
    data: 'Data & BI', ml: 'Data Science & ML', design: 'UI/UX',
    web: 'Web & Programming', enterprise: 'Enterprise & System',
    devops: 'Dev & Infra', soft: 'Soft Skills'
  };
  const TYPE_ORDER = ['Internship', 'Profesional', 'Organisasi'];

  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- tooltip bersama ---------- */
  let tip;
  function showTip(html, x, y) {
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'pointer-events-none fixed z-[90] px-3 py-2 rounded-xl text-xs font-medium shadow-xl ring-1 opacity-0 transition-opacity duration-150';
      document.body.appendChild(tip);
    }
    tip.className = tip.className.replace(/ (bg|text|ring)-\S+/g, '') +
      ' bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-100 ring-ink-100 dark:ring-ink-700';
    tip.innerHTML = html;
    tip.style.left = Math.min(x + 14, window.innerWidth - tip.offsetWidth - 12) + 'px';
    tip.style.top = (y - 12) + 'px';
    tip.style.opacity = '1';
  }
  function hideTip() { if (tip) tip.style.opacity = '0'; }

  /* =========================================================
     GRAFIK 1: sebaran keahlian per bidang (bar horizontal)
     Satu deret = satu warna, tanpa legenda, nilai dilabeli langsung.
     ========================================================= */
  function renderSkillChart() {
    const host = $('#chart-skills');
    if (!host || typeof SKILLS === 'undefined') return;

    const counts = {};
    SKILLS.forEach(s => { counts[s.cat] = (counts[s.cat] || 0) + 1; });
    const rows = Object.keys(CAT_LABEL)
      .map(k => ({ key: k, label: CAT_LABEL[k], n: counts[k] || 0 }))
      .filter(r => r.n > 0)
      .sort((a, b) => b.n - a.n);

    const c = P();
    const W = 640, rowH = 34, padT = 8, padB = 26, labelW = 178, valueW = 34;
    const H = padT + rows.length * rowH + padB;
    const plotW = W - labelW - valueW;
    const max = Math.max.apply(null, rows.map(r => r.n));
    const scale = (v) => (v / max) * plotW;

    const ticks = [0, Math.ceil(max / 2), max];
    let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img"
      aria-label="Sebaran jumlah tools per bidang keahlian" style="display:block">`;

    // garis bantu (recessive)
    ticks.forEach(t => {
      const x = labelW + scale(t);
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="${c.grid}" stroke-width="1"/>`;
      svg += `<text x="${x}" y="${H - padB + 16}" fill="${c.ink}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${t}</text>`;
    });

    rows.forEach((r, i) => {
      const y = padT + i * rowH;
      const bh = 16;
      const by = y + (rowH - bh) / 2;
      const w = Math.max(scale(r.n), 3);
      svg += `<text x="${labelW - 12}" y="${by + 12}" fill="${c.inkStrong}" font-size="12.5" font-weight="600" text-anchor="end">${esc(r.label)}</text>`;
      svg += `<rect class="ch-bar" data-label="${esc(r.label)}" data-n="${r.n}"
        x="${labelW}" y="${by}" width="${reduceMotion ? w : 0}" height="${bh}" rx="4"
        fill="${c.seq}" style="transition:width .9s cubic-bezier(.2,.8,.2,1) ${i * 70}ms, opacity .2s"
        data-w="${w}"><title>${esc(r.label)}: ${r.n} tools</title></rect>`;
      svg += `<text x="${labelW + w + 8}" y="${by + 12}" fill="${c.ink}" font-size="12" font-weight="700"
        font-family="JetBrains Mono, monospace" opacity="${reduceMotion ? 1 : 0}" class="ch-val"
        style="transition:opacity .4s ${300 + i * 70}ms">${r.n}</text>`;
    });
    svg += '</svg>';
    host.innerHTML = svg;

    // animasi masuk saat terlihat
    const bars = host.querySelectorAll('.ch-bar');
    const vals = host.querySelectorAll('.ch-val');
    const play = () => {
      bars.forEach(b => b.setAttribute('width', b.dataset.w));
      vals.forEach(v => v.setAttribute('opacity', '1'));
    };
    if (reduceMotion) { play(); }
    else {
      const io = new IntersectionObserver((es) => {
        es.forEach(e => { if (e.isIntersecting) { play(); io.disconnect(); } });
      }, { threshold: 0.25 });
      io.observe(host);
    }

    bars.forEach(b => {
      b.addEventListener('pointerenter', ev => {
        b.style.opacity = '.75';
        showTip(`<strong>${b.dataset.label}</strong><br>${b.dataset.n} tools`, ev.clientX, ev.clientY);
      });
      b.addEventListener('pointermove', ev => showTip(`<strong>${b.dataset.label}</strong><br>${b.dataset.n} tools`, ev.clientX, ev.clientY));
      b.addEventListener('pointerleave', () => { b.style.opacity = '1'; hideTip(); });
    });
  }

  /* =========================================================
     GRAFIK 2: linimasa pengalaman (batang waktu)
     Warna = jenis peran. Arsir = periode belum dikonfirmasi.
     ========================================================= */
  const monthIndex = (ym) => {
    const [y, m] = ym.split('-').map(Number);
    return y * 12 + (m - 1);
  };
  const MONTH_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const fmt = (ym) => { const [y, m] = ym.split('-').map(Number); return MONTH_ID[m - 1] + ' ' + y; };

  function renderTimeline() {
    const host = $('#chart-timeline');
    if (!host || typeof EXPERIENCES === 'undefined') return;

    const rows = EXPERIENCES.filter(e => e.start && e.end)
      .slice().sort((a, b) => monthIndex(a.start) - monthIndex(b.start));
    if (!rows.length) return;

    const c = P();
    const minM = Math.min.apply(null, rows.map(r => monthIndex(r.start)));
    const maxM = Math.max.apply(null, rows.map(r => monthIndex(r.end) + 1));
    const span = maxM - minM;

    const W = 720, rowH = 42, padT = 30, padB = 30, labelW = 0;
    const H = padT + rows.length * rowH + padB;
    const plotW = W - 16;
    const x = (m) => 8 + ((m - minM) / span) * plotW;

    const startYear = Math.floor(minM / 12);
    const endYear = Math.floor((maxM - 1) / 12);

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img"
      aria-label="Linimasa pengalaman kerja dan organisasi" style="display:block">
      <defs>
        <pattern id="hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="${c.surface}" opacity="0"/>
          <line x1="0" y1="0" x2="0" y2="6" stroke="${c.surface}" stroke-width="3" opacity=".55"/>
        </pattern>
      </defs>`;

    // penanda tahun
    for (let y = startYear; y <= endYear + 1; y++) {
      const m = y * 12;
      if (m < minM || m > maxM) continue;
      svg += `<line x1="${x(m)}" y1="${padT - 12}" x2="${x(m)}" y2="${H - padB + 4}" stroke="${c.grid}" stroke-width="1"/>`;
      svg += `<text x="${x(m) + 6}" y="${padT - 16}" fill="${c.ink}" font-size="11" font-weight="700" font-family="JetBrains Mono, monospace">${y}</text>`;
    }

    rows.forEach((r, i) => {
      const y = padT + i * rowH;
      const bh = 18;
      const x1 = x(monthIndex(r.start));
      const x2 = x(monthIndex(r.end) + 1);
      const w = Math.max(x2 - x1 - 2, 6);
      const fill = c.cat[Math.max(0, TYPE_ORDER.indexOf(r.type))];
      const wFinal = w;
      svg += `<g class="tl-row">
        <rect class="tl-bar" x="${x1}" y="${y}" width="${reduceMotion ? wFinal : 0}" height="${bh}" rx="4" fill="${fill}"
          data-w="${wFinal}" data-role="${esc(r.role)}" data-org="${esc(r.org)}"
          data-periode="${esc(r.approx ? r.period.split('·')[0].trim() + ' (bulan belum dikonfirmasi)' : fmt(r.start) + ' – ' + fmt(r.end))}"
          data-type="${esc(r.type)}"
          style="transition:width .8s cubic-bezier(.2,.8,.2,1) ${i * 90}ms, opacity .2s"/>
        ${r.approx ? `<rect x="${x1}" y="${y}" width="${reduceMotion ? wFinal : 0}" height="${bh}" rx="4" fill="url(#hatch)" pointer-events="none"
          class="tl-hatch" data-w="${wFinal}" style="transition:width .8s cubic-bezier(.2,.8,.2,1) ${i * 90}ms"/>` : ''}
        <text x="${x1 > W * 0.55 ? x2 - 2 : x1 + 2}" y="${y + bh + 15}" text-anchor="${x1 > W * 0.55 ? 'end' : 'start'}"
          fill="${c.inkStrong}" font-size="12" font-weight="600">${esc(r.role)}</text>
      </g>`;
    });
    svg += '</svg>';
    host.innerHTML = svg;

    const bars = host.querySelectorAll('.tl-bar, .tl-hatch');
    const play = () => bars.forEach(b => b.setAttribute('width', b.dataset.w));
    if (reduceMotion) play();
    else {
      const io = new IntersectionObserver((es) => {
        es.forEach(e => { if (e.isIntersecting) { play(); io.disconnect(); } });
      }, { threshold: 0.2 });
      io.observe(host);
    }

    host.querySelectorAll('.tl-bar').forEach(b => {
      const html = () => `<strong>${b.dataset.role}</strong><br>${b.dataset.org}<br>${b.dataset.periode}`;
      b.addEventListener('pointerenter', ev => { b.style.opacity = '.75'; showTip(html(), ev.clientX, ev.clientY); });
      b.addEventListener('pointermove', ev => showTip(html(), ev.clientX, ev.clientY));
      b.addEventListener('pointerleave', () => { b.style.opacity = '1'; hideTip(); });
    });

    // legenda
    const legend = $('#chart-timeline-legend');
    if (legend) {
      legend.innerHTML = TYPE_ORDER.map((t, i) =>
        `<span class="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600 dark:text-ink-300">
           <span class="w-3 h-3 rounded" style="background:${c.cat[i]}"></span>${t}
         </span>`).join('') +
        `<span class="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 dark:text-ink-400">
           <span class="w-3 h-3 rounded" style="background:${c.cat[1]};background-image:repeating-linear-gradient(45deg,${c.surface}80 0 2px,transparent 2px 5px)"></span>
           periode belum dikonfirmasi
         </span>`;
    }
  }

  function renderAll() { renderSkillChart(); renderTimeline(); }

  document.addEventListener('themechange', renderAll);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
  else renderAll();
})();

# Portfolio Hilman Taufiq Al Hakim

One-page portfolio statis. Stack: **HTML + Tailwind CSS (CDN) + AOS.js + Typed.js**, tanpa build step.

## Struktur

```
index.html            # seluruh markup section (Hero sampai Contact) + tema & CSS kustom
serve.py              # server lokal tanpa cache (pakai ini, bukan http.server biasa)
assets/js/data.js     # SEMUA KONTEN: skills, experience, projects, sertifikat  <- edit di sini
assets/js/main.js     # interaksi: tema, navigasi, filter, timeline, modal, form
assets/js/charts.js   # dua grafik SVG, dihitung otomatis dari data.js
assets/img/           # foto profil, favicon, gambar sertifikat, og-image
assets/docs/          # PDF sertifikasi dan CV
```

Konten teks dipisah ke `data.js` supaya bisa diedit tanpa menyentuh HTML. Grafik ikut berubah sendiri mengikuti isi `data.js`.

## Menjalankan secara lokal

Jangan buka lewat `file://` karena script lokal tidak akan termuat.

```bash
python serve.py 5173
```

Lalu buka `http://localhost:5173`.

`serve.py` mengirim header `Cache-Control: no-store`. Ini penting: dengan `python -m http.server` biasa, browser menyimpan `data.js` lama dan perubahan tidak terlihat sampai hard refresh.

Di PowerShell, pemisah perintah adalah `;` bukan `&&`.

## Yang masih perlu diisi

| Item | Lokasi | Cara isi |
|---|---|---|
| **File CV PDF** | `assets/docs/CV-Hilman-Taufiq-Al-Hakim.pdf` | Selama file belum ada, tombol Hero otomatis berubah jadi "Minta CV" yang membuka email. Begitu file ditaruh dengan nama persis itu, tombolnya kembali jadi tombol unduh. |
| Link GitHub | `index.html`, ikon sosial di Hero | ada komentar penanda di sana |
| Endpoint form kontak | `index.html`, atribut `action` pada `#contact-form` | lihat bagian Form kontak di bawah |

Sudah lengkap: foto profil, 4 sertifikat, 7 project, 3 pengalaman, favicon, dan og-image.

## Form kontak

Saat ini form membuka aplikasi email (`mailto:`) karena endpoint belum diisi. Untuk mengirim langsung:

1. Daftar di [formspree.io](https://formspree.io), buat form baru.
2. Salin endpoint-nya (`https://formspree.io/f/xxxxxxx`).
3. Ganti `action` pada `<form id="contact-form">` di `index.html`.

Fallback `mailto:` otomatis nonaktif begitu endpoint asli terpasang.

## Deploy

**Netlify / Vercel:** drag-and-drop folder ini, atau connect repo. Tanpa konfigurasi build. `serve.py` hanya untuk lokal dan diabaikan saat deploy.

**GitHub Pages:** push ke repo, lalu Settings > Pages > Branch `main` / root.

## Catatan teknis

- **Tema warna** ada di `tailwind.config` dalam `index.html` (skala `brand` indigo, `accent` amber, `ink` netral). Warna grafik terpisah di `charts.js` dan sudah divalidasi untuk keterbacaan penyandang buta warna di mode terang maupun gelap.
- **Tipografi**: Fraunces untuk judul, Inter Tight untuk isi, JetBrains Mono untuk angka.
- **Tiap section** punya tinggi minimal satu layar (`min-h-[100svh]`) dengan isi dipusatkan, supaya saat dilompati dari menu tidak ada section tetangga yang menyembul.
- Dark/light mode tersimpan di `localStorage`, default mengikuti setelan sistem.
- Semua animasi otomatis mati bila pengunjung mengaktifkan `prefers-reduced-motion`.
- Alamat lengkap sengaja tidak ditampilkan, hanya "Bandung, Indonesia".
- Tailwind dipakai lewat CDN. Untuk versi produksi yang lebih ringan, compile dengan Tailwind CLI jadi satu file CSS.

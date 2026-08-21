/* =========================================================
   DATA PORTFOLIO: Hilman Taufiq Al Hakim
   Semua konten teks ada di file ini supaya gampang diedit.
   Cari tanda [TODO] untuk bagian yang masih menunggu data.
   ========================================================= */

/* ---------- SKILLS ----------
   cat: data | ml | design | web | enterprise | devops | soft   */
const SKILLS = [
  // Data Analysis & BI
  { name: 'BigQuery',            cat: 'data' },
  { name: 'Looker Studio',       cat: 'data' },
  { name: 'Microsoft Excel',     cat: 'data' },
  { name: 'MySQL Workbench',     cat: 'data' },
  { name: 'PostgreSQL',          cat: 'data' },
  { name: 'Oracle',              cat: 'data' },
  { name: 'Pentaho',             cat: 'data' },
  { name: 'Google Colab',        cat: 'data' },

  // Data Science, ML & NLP
  { name: 'Python',              cat: 'ml' },
  { name: 'Random Forest',       cat: 'ml' },
  { name: 'Logistic Regression', cat: 'ml' },
  { name: 'SVM',                 cat: 'ml' },
  { name: 'Optuna',              cat: 'ml' },
  { name: 'Back-Translation Augmentation', cat: 'ml' },
  { name: 'TF-IDF',              cat: 'ml' },
  { name: 'Sentiment Analysis',  cat: 'ml' },

  // UI/UX & Design
  { name: 'Figma',               cat: 'design' },
  { name: 'Prototyping',         cat: 'design' },
  { name: 'User Flow Design',    cat: 'design' },

  // Web & Programming
  { name: 'HTML',                cat: 'web' },
  { name: 'CSS',                 cat: 'web' },
  { name: 'PHP',                 cat: 'web' },
  { name: 'Laravel',             cat: 'web' },
  { name: 'Streamlit',           cat: 'web' },

  // Enterprise & System Tools
  { name: 'SAP ERP Systems',     cat: 'enterprise' },
  { name: 'Cisco Packet Tracer', cat: 'enterprise' },
  { name: 'Visual Paradigm',     cat: 'enterprise' },
  { name: 'Bizagi',              cat: 'enterprise' },
  { name: 'ManageEngine ServiceDesk', cat: 'enterprise' },

  // Dev & Infra Tools
  { name: 'GitHub',              cat: 'devops' },
  { name: 'Visual Studio Code',  cat: 'devops' },
  { name: 'VirtualBox',          cat: 'devops' },
  { name: 'VMware Workstation Pro', cat: 'devops' },

  // Soft Skills
  { name: 'Communication',       cat: 'soft' },
  { name: 'Creativity',          cat: 'soft' },
  { name: 'Critical Thinking',   cat: 'soft' },
  { name: 'Interpersonal Skills', cat: 'soft' },
  { name: 'Problem Solving',     cat: 'soft' },
  { name: 'Team Work & Collaboration', cat: 'soft' },
  { name: 'Time Management',     cat: 'soft' }
];

/* ---------- EXPERIENCE (urut terbaru ke terlama) ---------- */
const EXPERIENCES = [
  {
    role: 'Data Analyst',
    org: 'PT. Sinar Harsa Garsia',
    period: 'Jun 2025 – Aug 2025',
    start: '2025-06', end: '2025-08',
    type: 'Internship',
    points: [
      'Mengidentifikasi & mengumpulkan data relevan dari website internal dan file Excel sesuai kebutuhan reporting',
      'Membersihkan struktur data (anomali & duplikasi) menggunakan Google Colab',
      'Menganalisis kebutuhan reporting untuk DAPENMA dan memproses dataset menggunakan BigQuery',
      'Merancang dashboard interaktif & visual report menggunakan Looker Studio'
    ]
  },
  {
    role: 'UI/UX Designer & Technical Documentation',
    org: 'PT. Sinar Harsa Garsia',
    period: 'Oct 2024 – Apr 2025',
    start: '2024-10', end: '2025-04',
    type: 'Internship',
    points: [
      'Merancang antarmuka untuk aplikasi web IoT real-time smart cattle farming, fokus pada user flow intuitif untuk monitoring & operasional',
      'Membuat prototipe responsif dan mockup interaktif menggunakan Figma',
      'Menyusun dokumentasi teknis & user documentation lengkap untuk website Smartbizz (struktur database, workflow sistem, API endpoints)',
      'Menyusun user guide untuk mendukung onboarding pengguna non-teknis'
    ]
  },
  {
    role: 'Member',
    org: 'Community of Information Systems Sports Union',
    period: 'Sep 2024 – Dec 2024',
    start: '2024-09', end: '2024-12',
    type: 'Organisasi',
    points: [
      'Memimpin sesi latihan & menyusun program latihan untuk mahasiswa-atlet',
      'Memberikan mentorship & feedback performa',
      'Mengoordinasikan persiapan pertandingan & strategi tim',
      'Berkolaborasi dengan departemen lain untuk kompetisi antar-fakultas'
    ]
  }
];

/* ---------- PROJECTS ----------
   cat: ds | da | uiux | ba                                   */
const PROJECTS = [
  {
    title: 'Analisis Sentimen Adopsi Aplikasi Kesehatan Maternal',
    cat: 'ds',
    tag: 'Data Science / NLP',
    meta: 'Riset mandiri · 2025–2026',
    gradient: 'from-brand-500 to-violet-600',
    icon: 'brain',
    desc: 'Meneliti sentimen publik terhadap faktor sosial dan pemerintah dalam adopsi aplikasi kesehatan ibu hamil di Indonesia, lalu membangun model klasifikasi tiga kelas untuk mengukurnya.',
    points: [
      'Data dikumpulkan lewat wawancara mendalam dengan 60 ibu hamil pengguna aplikasi kesehatan: 622 kalimat, ditambah 120 data augmentasi back-translation pada kelas minoritas menjadi 742',
      'Klasifikasi tiga kelas (positif, negatif, netral) memakai TF-IDF dan Random Forest, dituning dengan Optuna 30 trial per algoritma, dibandingkan terhadap Logistic Regression dan SVM',
      'Random Forest terpilih sebagai model final: Accuracy 0,832 · F1-Weighted 0,8287 · F1-Macro 0,7041 · ROC-AUC 0,8717, di atas baseline tebak-mayoritas 75,2%',
      'Temuan: kata negasi "tidak" dan "belum" jadi fitur paling berpengaruh, dukungan sosial paling konsisten positif, sementara kearifan lokal jadi konstruk terlemah (F1-Weighted 0,619)'
    ],
    tech: ['Python', 'TF-IDF', 'Random Forest', 'Optuna', 'Back-Translation']
  },
  {
    title: 'Dashboard Reporting DAPENMA',
    cat: 'da',
    tag: 'Data Analyst',
    meta: 'Internship Project · PT. Sinar Harsa Garsia · 2025',
    gradient: 'from-sky-500 to-brand-600',
    icon: 'chart',
    desc: 'Dashboard interaktif untuk kebutuhan reporting internal menggunakan data yang dikumpulkan dan dibersihkan dari berbagai sumber.',
    points: [
      'Pengumpulan data dari website internal & file Excel',
      'Pembersihan anomali dan duplikasi data di Google Colab',
      'Pemrosesan dataset di BigQuery dan visualisasi di Looker Studio'
    ],
    tech: ['BigQuery', 'Looker Studio', 'Google Colab', 'Excel']
  },
  {
    title: 'Analisis Sentimen Coretax (TikTok Comments)',
    cat: 'ds',
    tag: 'Data Science / NLP',
    meta: 'Project akademik · Advanced Data Mining',
    gradient: 'from-violet-500 to-brand-600',
    icon: 'brain',
    desc: 'Klasifikasi sentimen komentar TikTok terkait Coretax menggunakan XGBoost.',
    points: [
      'Scraping & preprocessing komentar berbahasa Indonesia',
      'Model XGBoost dengan akurasi sekitar 86%'
    ],
    tech: ['Python', 'XGBoost', 'NLP']
  },
  {
    title: 'Segmentasi Anggota Gym & Prediksi BMI',
    cat: 'ds',
    tag: 'Data Science / ML',
    meta: 'Project akademik · Penambangan Data · 2024',
    gradient: 'from-indigo-500 to-brand-600',
    icon: 'brain',
    desc: 'Analisis data keanggotaan gym untuk dua tujuan sekaligus: memprediksi BMI anggota dan mengelompokkan mereka agar program latihan bisa dipersonalisasi.',
    points: [
      'Dataset Gym Members Exercise dari Kaggle: 973 baris, 15 kolom, mencakup data fisik, pola latihan, dan indikator kesehatan',
      'Linear Regression untuk prediksi BMI, K-Means untuk segmentasi anggota dengan Elbow method dan visualisasi PCA',
      'Menghasilkan dua segmen yang bisa ditindaklanjuti: high performance dan member development, masing-masing dengan karakteristik latihan yang terukur',
      'Model dibungkus jadi aplikasi Streamlit agar bisa dipakai langsung tanpa membuka notebook'
    ],
    tech: ['Python', 'K-Means', 'Linear Regression', 'PCA', 'Streamlit']
  },
  {
    title: 'Dashboard Analisis Data Demografi',
    cat: 'da',
    tag: 'Data Analyst',
    meta: 'Project akademik · Streamlit App',
    gradient: 'from-amber-500 to-brand-600',
    icon: 'chart',
    desc: 'Multi-page web app dengan modul data loader untuk eksplorasi dataset demografis secara interaktif.',
    points: [
      'Struktur multi-page dengan modul loader data terpisah',
      'Filter dan visualisasi interaktif untuk eksplorasi dataset'
    ],
    tech: ['Python', 'Streamlit', 'Pandas']
  },
  {
    title: 'UI/UX Design: Smart Cattle Farming IoT App',
    cat: 'uiux',
    tag: 'UI/UX Design',
    meta: 'Internship Project · PT. Sinar Harsa Garsia · 2024–2025',
    gradient: 'from-emerald-500 to-teal-600',
    icon: 'design',
    desc: 'Desain antarmuka untuk aplikasi monitoring peternakan berbasis IoT real-time, fokus pada simplifikasi task monitoring yang kompleks.',
    points: [
      'Mockup dan prototipe interaktif responsif di Figma',
      'User flow untuk monitoring & operasional harian peternakan',
      'Dokumentasi teknis dan user guide untuk pengguna non-teknis'
    ],
    tech: ['Figma', 'Prototyping', 'User Flow']
  },
  {
    title: 'GaragePro: Aplikasi Pencari Bengkel Otomotif',
    cat: 'uiux',
    tag: 'UI/UX Design',
    meta: 'Project akademik · Usability Testing',
    gradient: 'from-rose-500 to-brand-600',
    icon: 'design',
    desc: 'Aplikasi untuk membantu pemilik kendaraan menemukan bengkel terdekat lengkap dengan layanan, harga, jam operasional, dan ulasan. Saya ikut merancang alur serta menguji kemudahan pakainya lewat usability testing.',
    points: [
      'Menyusun skenario dan tugas usability testing, lalu menjalankannya bersama 5 partisipan sebagai moderator dan observer',
      'Mengumpulkan data lewat Maze.co dan observasi langsung, lalu memetakan temuan per halaman menjadi rekomendasi perbaikan',
      'Rekomendasi yang dihasilkan: menonjolkan tombol Temukan, memindahkan Bookmark & History jadi sub-menu profil, dan mengubah rekomendasi beranda menjadi bengkel terdekat'
    ],
    tech: ['Usability Testing', 'Maze.co', 'User Flow', 'Prototyping']
  }
];

/* ---------- CERTIFICATES ---------- */
const CERTS = [
  {
    title: 'Associate Data Scientist (Ilmuwan Data Madya)',
    issuer: 'LSP Informatika (skema BNSP)',
    date: 'Asesmen 3 Nov 2025',
    result: 'KOMPETEN',
    id: 'No. 03030/SKHA/LSP-INF/11/2025',
    // Dokumen resminya berupa Surat Keterangan Hasil Asesmen; sertifikat BNSP
    // masih dalam proses terbit. Ganti catatan ini kalau sertifikatnya sudah keluar.
    note: 'Surat Keterangan Hasil Asesmen, sertifikat BNSP masih dalam proses terbit',
    file: 'assets/docs/Sertifikasi-BNSP-ADS-Hilman-Taufiq-Al-Hakim.pdf',
    type: 'pdf',
    featured: true
  },
  {
    title: 'SQL (Advanced)',
    issuer: 'HackerRank',
    date: '27 Agu 2025',
    id: 'FC0659F23CE3',
    file: 'assets/img/cert-sql-advanced.png',
    type: 'image'
  },
  {
    title: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    date: '27 Agu 2025',
    id: 'FF7E7F607CC3',
    file: 'assets/img/cert-sql-intermediate.png',
    type: 'image'
  },
  {
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: '27 Agu 2025',
    id: '320E31117C3E',
    file: 'assets/img/cert-sql-basic.png',
    type: 'image'
  }
];

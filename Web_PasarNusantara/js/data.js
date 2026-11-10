/* =========================================================
   PasarNusantara - data.js
   Data produk (array of object) yang dipakai semua halaman
   ========================================================= */
var alif_data_produk = [
  { id: 1,  nama: "Payung Geulis Tasikmalaya", kategori: "Kerajinan", harga: 185000, diskon: 15, ikon: "🌂", warna: ["#f7d6e0", "#e68aa8"], asal: "Tasikmalaya, Jawa Barat", rating: 4.9, terjual: 320, stok: 25,
    deskripsi: "Payung kertas lukis tangan khas Tasikmalaya dengan motif bunga yang dikerjakan perajin lokal. Cocok untuk dekorasi rumah, suvenir, maupun properti acara adat." },
  { id: 2,  nama: "Kelom Geulis Lukis", kategori: "Fashion", harga: 120000, diskon: 0, ikon: "👡", warna: ["#fde9c4", "#e9a950"], asal: "Tasikmalaya, Jawa Barat", rating: 4.7, terjual: 210, stok: 40,
    deskripsi: "Sandal kayu mahoni dengan lukisan bunga tangan. Ringan, kokoh, dan menjadi ikon kerajinan Tasikmalaya sejak puluhan tahun." },
  { id: 3,  nama: "Batik Tulis Pekalongan", kategori: "Fashion", harga: 450000, diskon: 10, ikon: "👘", warna: ["#cfe0f7", "#4f7cc4"], asal: "Pekalongan, Jawa Tengah", rating: 4.8, terjual: 145, stok: 12,
    deskripsi: "Kain batik tulis motif pesisir dengan pewarna alami. Setiap lembar dikerjakan manual selama berminggu-minggu oleh pembatik berpengalaman." },
  { id: 4,  nama: "Kopi Gayo Arabika 250 gr", kategori: "Minuman", harga: 95000, diskon: 0, ikon: "☕", warna: ["#e8d5c4", "#8a5a3c"], asal: "Aceh Tengah, Aceh", rating: 4.9, terjual: 560, stok: 80,
    deskripsi: "Biji kopi arabika single origin dataran tinggi Gayo dengan aroma cokelat dan rasa asam seimbang. Sangrai medium, siap seduh." },
  { id: 5,  nama: "Tenun Ikat Sumba", kategori: "Fashion", harga: 750000, diskon: 20, ikon: "🧣", warna: ["#f3d9c9", "#b4553a"], asal: "Sumba, NTT", rating: 4.8, terjual: 64, stok: 8,
    deskripsi: "Kain tenun ikat bermotif kuda dan kerabat adat Sumba, dibuat dari benang katun dengan pewarna alam. Karya bernilai seni dan budaya tinggi." },
  { id: 6,  nama: "Keripik Tempe Sagu", kategori: "Kuliner", harga: 28000, diskon: 0, ikon: "🍘", warna: ["#fbeaa6", "#e0b030"], asal: "Malang, Jawa Timur", rating: 4.6, terjual: 890, stok: 150,
    deskripsi: "Keripik tempe renyah berbumbu bawang dan ketumbar. Tanpa pengawet, gurih, dan cocok sebagai camilan keluarga." },
  { id: 7,  nama: "Madu Hutan Sumbawa 500 ml", kategori: "Kuliner", harga: 135000, diskon: 5, ikon: "🍯", warna: ["#fff1b8", "#e8a317"], asal: "Sumbawa, NTB", rating: 4.9, terjual: 410, stok: 60,
    deskripsi: "Madu murni dari lebah hutan liar Sumbawa tanpa campuran gula. Dipanen secara lestari oleh kelompok petani madu." },
  { id: 8,  nama: "Tas Anyaman Mendong", kategori: "Kerajinan", harga: 160000, diskon: 0, ikon: "👜", warna: ["#e4ecd2", "#7b9a4a"], asal: "Tasikmalaya, Jawa Barat", rating: 4.7, terjual: 175, stok: 30,
    deskripsi: "Tas tangan dari anyaman tanaman mendong yang kuat dan ramah lingkungan. Desain modern dengan lapisan dalam kain katun." },
  { id: 9,  nama: "Sambal Roa Manado", kategori: "Kuliner", harga: 45000, diskon: 0, ikon: "🌶️", warna: ["#fbd0c9", "#d6432e"], asal: "Manado, Sulawesi Utara", rating: 4.8, terjual: 730, stok: 100,
    deskripsi: "Sambal ikan roa asap dengan cabai rawit pilihan. Pedas gurih, cocok untuk nasi hangat, mi, dan lauk." },
  { id: 10, nama: "Gula Aren Cetak 500 gr", kategori: "Kuliner", harga: 36000, diskon: 0, ikon: "🟤", warna: ["#eadacb", "#9a6a43"], asal: "Garut, Jawa Barat", rating: 4.5, terjual: 480, stok: 120,
    deskripsi: "Gula aren asli dari nira pohon aren, dicetak tradisional. Rasa manis legit untuk kopi, kolak, dan kue." },
  { id: 11, nama: "Teh Hijau Walini 100 gr", kategori: "Minuman", harga: 52000, diskon: 10, ikon: "🍵", warna: ["#dcefd2", "#5fa046"], asal: "Bandung Barat, Jawa Barat", rating: 4.6, terjual: 260, stok: 70,
    deskripsi: "Teh hijau daun pilihan dari perkebunan Walini. Seduhan segar dengan aroma lembut dan kaya antioksidan." },
  { id: 12, nama: "Songket Palembang Mini", kategori: "Kerajinan", harga: 390000, diskon: 0, ikon: "🎎", warna: ["#f0dcf5", "#9b59b6"], asal: "Palembang, Sumatera Selatan", rating: 4.7, terjual: 52, stok: 10,
    deskripsi: "Hiasan songket Palembang dengan benang emas pada bingkai kayu. Cocok sebagai souvenir pernikahan atau pajangan." }
];

var alif_data_kategori = [
  { nama: "Kuliner", ikon: "🍜" },
  { nama: "Fashion", ikon: "👘" },
  { nama: "Kerajinan", ikon: "🏺" },
  { nama: "Minuman", ikon: "☕" }
];

var alif_data_testimoni = [
  { isi: "Payung geulisnya cantik sekali dan packing-nya aman. Pengiriman cepat, penjualnya ramah!", nama: "Siti Nurhaliza - Bandung" },
  { isi: "Kopi Gayo-nya segar, aromanya luar biasa. Sudah beberapa kali repeat order di PasarNusantara.", nama: "Budi Santoso - Jakarta" },
  { isi: "Senang bisa membeli batik langsung dari perajin. Kualitas sesuai deskripsi dan harga adil.", nama: "Rina Wijaya - Surabaya" }
];

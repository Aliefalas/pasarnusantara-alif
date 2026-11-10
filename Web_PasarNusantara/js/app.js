/* =========================================================
   PasarNusantara - app.js
   Logika interaktif: keranjang, katalog, detail, promo,
   kontak, animasi. Semua id/class berawalan "alif_".
   ========================================================= */
"use strict";

/* ---------- Fungsi bantu ---------- */
function alif_rupiah(angka) {
  return "Rp" + Number(angka).toLocaleString("id-ID");
}
function alif_ambil(id) {
  return document.getElementById(id);
}
function alif_hargaAkhir(p) {
  return Math.round(p.harga * (100 - p.diskon) / 100);
}
function alif_cariProduk(id) {
  return alif_data_produk.find(function (p) { return p.id === Number(id); });
}
function alif_toast(pesan) {
  var el = alif_ambil("alif_toast");
  if (!el) return;
  el.textContent = pesan;
  el.classList.add("alif_tampil");
  clearTimeout(alif_toast._t);
  alif_toast._t = setTimeout(function () { el.classList.remove("alif_tampil"); }, 2200);
}

/* ---------- Penyimpanan keranjang (localStorage) ---------- */
function alif_bacaKeranjang() {
  try {
    var data = JSON.parse(localStorage.getItem("alif_keranjang"));
    return Array.isArray(data) ? data : [];
  } catch (e) { return []; }
}
function alif_simpanKeranjang(data) {
  try { localStorage.setItem("alif_keranjang", JSON.stringify(data)); } catch (e) {}
  alif_perbaruiBadge();
}
function alif_tambahKeranjang(id, jumlah) {
  var k = alif_bacaKeranjang();
  var ada = k.find(function (i) { return i.id === Number(id); });
  if (ada) ada.jumlah += jumlah; else k.push({ id: Number(id), jumlah: jumlah });
  alif_simpanKeranjang(k);
  var p = alif_cariProduk(id);
  alif_toast("✔ " + p.nama + " ditambahkan ke keranjang");
}
function alif_perbaruiBadge() {
  var total = alif_bacaKeranjang().reduce(function (a, i) { return a + i.jumlah; }, 0);
  var b = alif_ambil("alif_badge_keranjang");
  if (b) b.textContent = total;
}

/* ---------- Kartu produk ---------- */
function alif_kartuProduk(p) {
  var akhir = alif_hargaAkhir(p);
  var coret = p.diskon ? '<span class="alif_harga_coret">' + alif_rupiah(p.harga) + "</span>" : "";
  var label = p.diskon ? '<span class="alif_label_diskon">-' + p.diskon + "%</span>" : "";
  return '<article class="alif_card_produk alif_muncul">' +
    '<div class="alif_gambar_produk" style="background:linear-gradient(135deg,' + p.warna[0] + "," + p.warna[1] + ')">' + label + p.ikon + "</div>" +
    '<div class="alif_info_produk">' +
      '<span class="alif_kategori_produk">' + p.kategori + "</span>" +
      '<a class="alif_nama_produk" href="detail.html?id=' + p.id + '">' + p.nama + "</a>" +
      '<span class="alif_rating"><b>★</b> ' + p.rating + " · " + p.terjual + " terjual</span>" +
      '<div class="alif_harga">' + alif_rupiah(akhir) + coret + "</div>" +
      '<div class="alif_aksi_produk">' +
        '<a class="alif_tombol alif_tombol_kecil alif_tombol_emas" href="detail.html?id=' + p.id + '">Detail</a>' +
        '<button class="alif_tombol alif_tombol_kecil" data-beli="' + p.id + '" type="button">+ Keranjang</button>' +
      "</div></div></article>";
}
function alif_gambarKartu(daftar, idWadah) {
  var w = alif_ambil(idWadah);
  if (!w) return;
  w.innerHTML = daftar.length ? daftar.map(alif_kartuProduk).join("") : '<div class="alif_kosong">😕 Produk tidak ditemukan. Coba kata kunci lain.</div>';
  alif_aktifkanMuncul();
}
// event delegation untuk semua tombol "+ Keranjang"
document.addEventListener("click", function (e) {
  var t = e.target.closest("[data-beli]");
  if (t) alif_tambahKeranjang(t.getAttribute("data-beli"), 1);
});

/* ---------- Navigasi umum ---------- */
function alif_inisialisasiNavigasi() {
  var burger = alif_ambil("alif_burger"), menu = alif_ambil("alif_menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var buka = menu.classList.toggle("alif_buka");
      burger.setAttribute("aria-expanded", buka);
    });
  }
  var halaman = document.body.getAttribute("data-halaman");
  document.querySelectorAll(".alif_menu_link").forEach(function (a) {
    if (a.getAttribute("data-nav") === halaman) a.classList.add("alif_aktif");
  });
  var naik = alif_ambil("alif_naik");
  if (naik) {
    window.addEventListener("scroll", function () {
      naik.classList.toggle("alif_tampil", window.scrollY > 400);
    });
    naik.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }
  var tahun = alif_ambil("alif_tahun");
  if (tahun) tahun.textContent = new Date().getFullYear();
  alif_perbaruiBadge();
}
function alif_aktifkanMuncul() {
  var els = document.querySelectorAll(".alif_muncul:not(.alif_terlihat)");
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("alif_terlihat"); }); return; }
  var io = new IntersectionObserver(function (items) {
    items.forEach(function (it) { if (it.isIntersecting) { it.target.classList.add("alif_terlihat"); io.unobserve(it.target); } });
  }, { threshold: 0.1 });
  els.forEach(function (e) { io.observe(e); });
}

/* ---------- Beranda ---------- */
function alif_halamanBeranda() {
  // kategori
  var gk = alif_ambil("alif_grid_kategori");
  gk.innerHTML = alif_data_kategori.map(function (k) {
    var jml = alif_data_produk.filter(function (p) { return p.kategori === k.nama; }).length;
    return '<a class="alif_kartu_kategori alif_muncul" href="produk.html?kategori=' + k.nama + '"><b>' + k.ikon + "</b><strong>" + k.nama + "</strong><small>" + jml + " produk</small></a>";
  }).join("");
  // produk terlaris
  var terlaris = alif_data_produk.slice().sort(function (a, b) { return b.terjual - a.terjual; }).slice(0, 4);
  alif_gambarKartu(terlaris, "alif_produk_unggulan");
  // testimoni slider
  var idx = 0, kotak = alif_ambil("alif_testimoni"), titik = alif_ambil("alif_titik_slide");
  titik.innerHTML = alif_data_testimoni.map(function (_, i) { return '<button type="button" aria-label="Testimoni ' + (i + 1) + '" data-i="' + i + '"></button>'; }).join("");
  function tampil(i) {
    idx = i;
    var t = alif_data_testimoni[i];
    kotak.innerHTML = "<p>“" + t.isi + "”</p><b>" + t.nama + "</b>";
    titik.querySelectorAll("button").forEach(function (b, n) { b.classList.toggle("alif_aktif", n === i); });
  }
  titik.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) tampil(Number(b.getAttribute("data-i"))); });
  tampil(0);
  setInterval(function () { tampil((idx + 1) % alif_data_testimoni.length); }, 4500);
}

/* ---------- Katalog produk ---------- */
function alif_halamanProduk() {
  var kategoriAktif = "Semua";
  var param = new URLSearchParams(location.search).get("kategori");
  if (param && alif_data_kategori.some(function (k) { return k.nama === param; })) kategoriAktif = param;
  var cari = alif_ambil("alif_cari"), urut = alif_ambil("alif_urut"), filter = alif_ambil("alif_filter");
  var daftar = ["Semua"].concat(alif_data_kategori.map(function (k) { return k.nama; }));
  filter.innerHTML = daftar.map(function (n) { return '<button type="button" class="alif_chip" data-kat="' + n + '">' + n + "</button>"; }).join("");

  function terapkan() {
    var kata = cari.value.trim().toLowerCase();
    var hasil = alif_data_produk.filter(function (p) {
      return (kategoriAktif === "Semua" || p.kategori === kategoriAktif) &&
        (p.nama.toLowerCase().indexOf(kata) > -1 || p.asal.toLowerCase().indexOf(kata) > -1);
    });
    var u = urut.value;
    if (u === "murah") hasil.sort(function (a, b) { return alif_hargaAkhir(a) - alif_hargaAkhir(b); });
    else if (u === "mahal") hasil.sort(function (a, b) { return alif_hargaAkhir(b) - alif_hargaAkhir(a); });
    else if (u === "laris") hasil.sort(function (a, b) { return b.terjual - a.terjual; });
    else if (u === "rating") hasil.sort(function (a, b) { return b.rating - a.rating; });
    filter.querySelectorAll(".alif_chip").forEach(function (c) { c.classList.toggle("alif_aktif", c.getAttribute("data-kat") === kategoriAktif); });
    alif_ambil("alif_info_hasil").textContent = "Menampilkan " + hasil.length + " produk" + (kategoriAktif !== "Semua" ? " kategori " + kategoriAktif : "");
    alif_gambarKartu(hasil, "alif_daftar_produk");
  }
  filter.addEventListener("click", function (e) { var c = e.target.closest(".alif_chip"); if (c) { kategoriAktif = c.getAttribute("data-kat"); terapkan(); } });
  cari.addEventListener("input", terapkan);
  urut.addEventListener("change", terapkan);
  terapkan();
}

/* ---------- Detail produk ---------- */
function alif_halamanDetail() {
  var id = new URLSearchParams(location.search).get("id") || "1";
  var p = alif_cariProduk(id), wadah = alif_ambil("alif_detail_wadah");
  if (!p) {
    wadah.innerHTML = '<div class="alif_kosong">Produk tidak ditemukan. <a class="alif_menu_link" style="color:var(--warna_aksen)" href="produk.html">Kembali ke katalog</a></div>';
    return;
  }
  document.title = p.nama + " | PasarNusantara";
  var coret = p.diskon ? '<span class="alif_harga_coret">' + alif_rupiah(p.harga) + "</span>" : "";
  wadah.innerHTML =
    '<div class="alif_detail_gambar" style="background:linear-gradient(135deg,' + p.warna[0] + "," + p.warna[1] + ')">' + p.ikon + "</div>" +
    '<div class="alif_detail_info">' +
      '<span class="alif_kategori_produk">' + p.kategori + "</span><h1>" + p.nama + "</h1>" +
      '<p class="alif_rating"><b>★</b> ' + p.rating + " · " + p.terjual + " terjual</p>" +
      '<div class="alif_detail_harga">' + alif_rupiah(alif_hargaAkhir(p)) + coret + "</div>" +
      "<p>" + p.deskripsi + "</p>" +
      '<div class="alif_spesifikasi"><div><span>Asal</span>' + p.asal + "</div><div><span>Kategori</span>" + p.kategori + "</div><div><span>Stok</span>" + p.stok + " tersedia</div></div>" +
      '<div class="alif_baris_beli"><div class="alif_qty"><button type="button" id="alif_kurang" aria-label="Kurangi">−</button><span id="alif_jumlah">1</span><button type="button" id="alif_tambah" aria-label="Tambah">+</button></div>' +
      '<button type="button" class="alif_tombol" id="alif_beli">🛒 Tambah ke Keranjang</button>' +
      '<a class="alif_tombol alif_tombol_emas" href="keranjang.html" id="alif_beli_sekarang">Beli Sekarang</a></div></div>';
  var jumlah = 1, tampil = alif_ambil("alif_jumlah");
  alif_ambil("alif_kurang").addEventListener("click", function () { if (jumlah > 1) tampil.textContent = --jumlah; });
  alif_ambil("alif_tambah").addEventListener("click", function () { if (jumlah < p.stok) tampil.textContent = ++jumlah; });
  alif_ambil("alif_beli").addEventListener("click", function () { alif_tambahKeranjang(p.id, jumlah); });
  alif_ambil("alif_beli_sekarang").addEventListener("click", function () { alif_tambahKeranjang(p.id, jumlah); });
  var serupa = alif_data_produk.filter(function (x) { return x.kategori === p.kategori && x.id !== p.id; }).slice(0, 4);
  alif_gambarKartu(serupa, "alif_produk_serupa");
}

/* ---------- Promo ---------- */
function alif_halamanPromo() {
  var promo = alif_data_produk.filter(function (p) { return p.diskon > 0; }).sort(function (a, b) { return b.diskon - a.diskon; });
  alif_gambarKartu(promo, "alif_daftar_promo");
  function hitung() {
    var sekarang = new Date(), akhir = new Date(sekarang);
    akhir.setHours(23, 59, 59, 999);
    var s = Math.floor((akhir - sekarang) / 1000);
    var j = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), d = s % 60;
    [["alif_jam", j], ["alif_menit", m], ["alif_detik", d]].forEach(function (x) { alif_ambil(x[0]).textContent = String(x[1]).padStart(2, "0"); });
  }
  hitung(); setInterval(hitung, 1000);
  alif_ambil("alif_salin_kupon").addEventListener("click", function () {
    try { navigator.clipboard.writeText("NUSANTARA10"); } catch (e) {}
    alif_toast("Kode NUSANTARA10 disalin!");
  });
}

/* ---------- Keranjang & checkout ---------- */
var alif_kuponAktif = false;
function alif_halamanKeranjang() {
  var daftar = alif_ambil("alif_daftar_keranjang"), ringkas = alif_ambil("alif_ringkasan_isi");
  function gambar() {
    var k = alif_bacaKeranjang();
    if (!k.length) {
      daftar.innerHTML = '<div class="alif_kosong">🛒 Keranjang masih kosong.<br><br><a class="alif_tombol" href="produk.html">Mulai Belanja</a></div>';
      ringkas.innerHTML = ""; alif_ambil("alif_form_checkout").style.display = "none"; return;
    }
    alif_ambil("alif_form_checkout").style.display = "";
    var subtotal = 0;
    daftar.innerHTML = k.map(function (i) {
      var p = alif_cariProduk(i.id); var h = alif_hargaAkhir(p); subtotal += h * i.jumlah;
      return '<div class="alif_item_keranjang"><div class="alif_item_gambar" style="background:linear-gradient(135deg,' + p.warna[0] + "," + p.warna[1] + ')">' + p.ikon + "</div>" +
        '<div><a class="alif_item_nama" href="detail.html?id=' + p.id + '">' + p.nama + '</a><div class="alif_item_harga">' + alif_rupiah(h) + "</div></div>" +
        '<div class="alif_item_kanan"><div class="alif_qty"><button type="button" data-kurang="' + p.id + '">−</button><span>' + i.jumlah + '</span><button type="button" data-tambah="' + p.id + '">+</button></div>' +
        '<br><button type="button" class="alif_hapus" data-hapus="' + p.id + '">🗑 Hapus</button></div></div>';
    }).join("");
    var diskon = alif_kuponAktif ? Math.round(subtotal * 0.1) : 0;
    var ongkir = (subtotal - diskon) >= 500000 ? 0 : 15000;
    var total = subtotal - diskon + ongkir;
    ringkas.innerHTML =
      '<div class="alif_baris_total"><span>Subtotal</span><span>' + alif_rupiah(subtotal) + "</span></div>" +
      '<div class="alif_baris_total"><span>Diskon kupon</span><span>-' + alif_rupiah(diskon) + "</span></div>" +
      '<div class="alif_baris_total"><span>Ongkos kirim</span><span>' + (ongkir ? alif_rupiah(ongkir) : "GRATIS") + "</span></div>" +
      '<div class="alif_baris_total alif_besar"><span>Total</span><span id="alif_total_bayar">' + alif_rupiah(total) + "</span></div>";
  }
  daftar.addEventListener("click", function (e) {
    var k = alif_bacaKeranjang(), t;
    if ((t = e.target.closest("[data-tambah]"))) { k.forEach(function (i) { if (i.id === +t.dataset.tambah) i.jumlah++; }); }
    else if ((t = e.target.closest("[data-kurang]"))) { k.forEach(function (i) { if (i.id === +t.dataset.kurang && i.jumlah > 1) i.jumlah--; }); }
    else if ((t = e.target.closest("[data-hapus]"))) { k = k.filter(function (i) { return i.id !== +t.dataset.hapus; }); }
    else return;
    alif_simpanKeranjang(k); gambar();
  });
  alif_ambil("alif_pakai_kupon").addEventListener("click", function () {
    var kode = alif_ambil("alif_kode_kupon").value.trim().toUpperCase();
    if (kode === "NUSANTARA10") { alif_kuponAktif = true; alif_toast("Kupon berhasil dipakai: diskon 10%"); gambar(); }
    else alif_toast("Kode kupon tidak valid");
  });
  alif_ambil("alif_form_checkout").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, ok = true;
    function cek(id, salah, pesan) { var el = alif_ambil(id); alif_ambil(id + "_err").textContent = salah(el.value.trim()) ? pesan : ""; if (salah(el.value.trim())) ok = false; }
    cek("alif_nama_penerima", function (v) { return v.length < 3; }, "Nama minimal 3 karakter.");
    cek("alif_telp", function (v) { return !/^(\+62|62|0)8[0-9]{8,11}$/.test(v); }, "Nomor HP tidak valid (contoh 081234567890).");
    cek("alif_alamat", function (v) { return v.length < 10; }, "Alamat minimal 10 karakter.");
    if (!ok) return;
    var noPesanan = "PN-" + Date.now().toString().slice(-8);
    var total = alif_ambil("alif_total_bayar").textContent;
    var metode = alif_ambil("alif_metode").value;
    alif_simpanKeranjang([]); alif_kuponAktif = false;
    var latar = document.createElement("div");
    latar.className = "alif_modal_latar";
    latar.innerHTML = '<div class="alif_modal" role="dialog" aria-modal="true"><div style="font-size:3rem">🎉</div><h3>Pesanan Berhasil!</h3><p>Nomor pesanan <b>' + noPesanan + "</b><br>Total " + total + " via " + metode + '.</p><br><a class="alif_tombol" href="produk.html">Belanja Lagi</a></div>';
    document.body.appendChild(latar);
    f.reset(); gambar();
  });
  gambar();
}

/* ---------- Tentang ---------- */
function alif_halamanTentang() {
  var angka = document.querySelectorAll("[data-target]");
  var io = new IntersectionObserver(function (items) {
    items.forEach(function (it) {
      if (!it.isIntersecting) return;
      var el = it.target, tujuan = Number(el.dataset.target), n = 0, langkah = Math.max(1, Math.round(tujuan / 60));
      var t = setInterval(function () { n = Math.min(tujuan, n + langkah); el.textContent = n.toLocaleString("id-ID") + (el.dataset.akhir || ""); if (n >= tujuan) clearInterval(t); }, 25);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  angka.forEach(function (a) { io.observe(a); });
}

/* ---------- Blog ---------- */
function alif_halamanBlog() {
  alif_ambil("alif_grid_blog").addEventListener("click", function (e) {
    var b = e.target.closest("[data-baca]");
    if (!b) return;
    var kartu = b.closest(".alif_kartu_blog"), buka = kartu.classList.toggle("alif_buka");
    b.textContent = buka ? "Tutup ▲" : "Baca selengkapnya ▼";
  });
}

/* ---------- Kontak ---------- */
function alif_halamanKontak() {
  var form = alif_ambil("alif_form_kontak");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    function cek(id, salah, pesan) { var v = alif_ambil(id).value.trim(); var s = salah(v); alif_ambil(id + "_err").textContent = s ? pesan : ""; if (s) ok = false; }
    cek("alif_nama", function (v) { return v.length < 3; }, "Nama minimal 3 karakter.");
    cek("alif_email", function (v) { return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, "Format email tidak valid.");
    cek("alif_subjek", function (v) { return v.length < 3; }, "Subjek wajib diisi.");
    cek("alif_pesan", function (v) { return v.length < 10; }, "Pesan minimal 10 karakter.");
    if (!ok) return;
    try {
      var inbox = JSON.parse(localStorage.getItem("alif_pesan_masuk") || "[]");
      inbox.push({ nama: alif_ambil("alif_nama").value, email: alif_ambil("alif_email").value, subjek: alif_ambil("alif_subjek").value, pesan: alif_ambil("alif_pesan").value, waktu: new Date().toISOString() });
      localStorage.setItem("alif_pesan_masuk", JSON.stringify(inbox));
    } catch (err) {}
    var notif = alif_ambil("alif_notif_kontak");
    notif.style.display = "block";
    notif.textContent = "✔ Terima kasih, " + alif_ambil("alif_nama").value + "! Pesan Anda sudah terkirim ke pemilik PasarNusantara.";
    form.reset();
  });
  alif_ambil("alif_faq").addEventListener("click", function (e) {
    var t = e.target.closest(".alif_faq_tanya");
    if (t) t.parentElement.classList.toggle("alif_buka");
  });
}

/* ---------- Inisialisasi ---------- */
document.addEventListener("DOMContentLoaded", function () {
  alif_inisialisasiNavigasi();
  var h = document.body.getAttribute("data-halaman");
  var peta = { beranda: alif_halamanBeranda, produk: alif_halamanProduk, detail: alif_halamanDetail, promo: alif_halamanPromo,
    keranjang: alif_halamanKeranjang, tentang: alif_halamanTentang, blog: alif_halamanBlog, kontak: alif_halamanKontak };
  if (peta[h]) peta[h]();
  alif_aktifkanMuncul();
});

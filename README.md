# DYNOPRO — Business Ecosystem

Laman web statik untuk ekosistem DYNOPRO: **One Ecosystem. Endless Possibilities.**

Tiga solusi utama (Dyno Focus, VAPRO DuitVoice, Dyno Ads) dan 11 produk sokongan, dengan tapisan kategori, carian produk dan butang WhatsApp untuk setiap produk.

## Struktur

```
index.html              Laman utama (semua kandungan produk)
404.html                Halaman "tidak ditemui"
assets/css/style.css    Gaya (tema gelap chrome / ungu / biru)
assets/js/main.js       Tapisan kategori, carian, butang kembali ke atas
assets/img/             Logo, ikon, gambar Open Graph
assets/img/produk/      Logo setiap produk (.webp)
site.webmanifest        Manifest PWA (ikon & warna)
robots.txt
netlify.toml            Konfigurasi Netlify (header keselamatan & cache)
```

Tiada build step, tiada dependency — hanya HTML, CSS dan JavaScript biasa.

## Jalankan secara lokal

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## Deploy (GitHub Pages)

1. Buka **Settings → Pages** dalam repo ini.
2. Di bawah *Build and deployment*, pilih **Source: Deploy from a branch**.
3. Pilih branch `main` dan folder **`/ (root)`**, kemudian klik **Save**.
4. Tunggu 1–2 minit. Website akan berada di **https://dynopos.github.io/Ecosystem-/**

Setiap kali ada perubahan di-push ke branch itu, GitHub Pages akan kemas kini website secara automatik.
Fail `.nojekyll` memastikan GitHub menghidangkan fail apa adanya (tanpa Jekyll).

**Domain sendiri (pilihan):** dalam Settings → Pages → *Custom domain*, masukkan domain (cth. `dynopro.my`),
kemudian di DNS domain tambah rekod `CNAME www → dynopos.github.io` (atau rekod A ke IP GitHub Pages untuk domain utama).
Tandakan **Enforce HTTPS** selepas sijil siap.

Pilihan lain: Netlify (`netlify.toml` sudah disediakan) atau muat naik semua fail ke `public_html/` di hosting cPanel.

## Kemas kini kandungan

- **Produk**: setiap produk ialah satu `<article class="card">` dalam `index.html`. `data-cat` menentukan kategori tapisan; `--accent` ialah warna produk. Tambah kelas `featured` untuk kad besar (2 lajur).
- **Nombor WhatsApp**: cari `wa.me/60182889932` dalam `index.html` dan tukar jika perlu.
- **Bilangan produk**: dikira automatik oleh `main.js` untuk teks "x daripada y penyelesaian"; kemas kini teks "14 penyelesaian" pada strip hero dan meta description secara manual jika bilangan berubah.

## Selepas domain disambungkan

Tambah URL penuh supaya pratonton media sosial dan SEO lebih tepat:

1. Dalam `index.html`, tukar `og:image` kepada URL penuh (cth. `https://domain-anda.com/assets/img/og-image.jpg`) dan tambah `<link rel="canonical" href="https://domain-anda.com/">`.
2. Tambah `Sitemap: https://domain-anda.com/sitemap.xml` dalam `robots.txt` dan cipta `sitemap.xml`.

# Shoply Backend — Task List

**Repository:** `rez-e-commerce`  
**Stack:** Node.js, Express.js, JavaScript (ES Modules), Supabase
**Aturan kerja:** Selesaikan satu task, tes, lalu lanjut ke task berikutnya.

## Target

Menyediakan REST API Shoply untuk kategori, produk, autentikasi/otorisasi, dan pesanan.

## Phase 1 — Setup Project

- [x] **BE-01 — Buat repository `shoply-server`**
  - Buat folder, repository Git, dan README awal. ✅
  - **Selesai:** repository siap digunakan. ✅

- [x] **BE-02 — Inisialisasi Node.js**
  - Jalankan `npm init -y` dan aktifkan `"type": "commonJs"`. ✅
  - **Selesai:** project menggunakan JavaScript ES Modules, tanpa TypeScript.✅

- [x] **BE-03 — Install dependency**
  - Install `express`, `@supabase/supabase-js`, `dotenv`, `cors`; install `nodemon` sebagai dev dependency.✅
  - **Selesai:** dependency dan script `dev` tersedia.✅

- [x] **BE-04 — Buat server Express**
  - Buat `src/app.js`, `src/server.js`, middleware JSON, dan `GET /api/health`.✅
  - **Selesai:** server hidup dan health endpoint memberi response sukses.✅

- [x] **BE-05 — Siapkan environment**
  - Buat `.env.example`, `.gitignore`, dan konfigurasi port, URL Supabase, key, serta URL frontend.✅
  - **Selesai:** secret tidak masuk Git.✅

## Phase 2 — Supabase dan Database

- [x] **BE-06 — Buat project Supabase**
  - Siapkan project dan kredensial yang diperlukan.✅
  - **Selesai:** backend bisa terhubung ke Supabase.✅

- [x] **BE-07 — Buat tabel database**
  - Buat `profiles`, `categories`, `products`, `orders`, dan `order_items`, termasuk relasi dan timestamp.✅
  - **Selesai:** tabel dan foreign key tersedia.✅

- [x] **BE-08 — Atur Row Level Security**
  - Aktifkan RLS dan buat policy sesuai akses customer/admin.✅
  - **Selesai:** akses data dilindungi di database, bukan frontend saja.✅

- [x] **BE-09 — Buat Supabase client**
  - Buat `src/lib/supabase.js`.✅
  - **Selesai:** backend bisa menjalankan query uji. Service-role key hanya boleh disimpan di backend.✅

## Phase 3 — Fondasi API

- [ ] **BE-10 — Rapikan struktur folder**
  - Siapkan `routes`, `controllers`, `services`, `middleware`, dan `lib`.✅
  - **Selesai:** kode punya pemisahan tanggung jawab yang jelas.✅

- [ ] **BE-11 — Tangani response dan error**
  - Buat error handler, response konsisten, dan handler 404.✅
  - **Selesai:** error menghasilkan HTTP status yang sesuai.✅

- [ ] **BE-12 — Validasi input**
  - Validasi body, parameter ID, field wajib, harga, dan stok.
  - **Selesai:** input tidak valid ditolak.

## Phase 4 — Auth dan Role

- [ ] **BE-13 — Verifikasi access token**
  - Buat middleware untuk memverifikasi Bearer token dari Supabase Auth.
  - **Selesai:** token invalid/expired ditolak.

- [ ] **BE-14 — Ambil profil dan role**
  - Baca role dari database, bukan dari body request atau nilai buatan frontend.
  - **Selesai:** backend dapat mengenali customer dan admin.

- [ ] **BE-15 — Middleware admin**
  - Lindungi route admin dengan autentikasi dan pengecekan role.
  - **Selesai:** customer ditolak dengan `403` saat mengakses route admin.

## Phase 5 — API Kategori dan Produk

- [ ] **BE-16 — Daftar kategori publik**
  - Buat `GET /api/categories`.
  - **Selesai:** frontend bisa mengambil daftar kategori.

- [ ] **BE-17 — Daftar dan detail produk**
  - Buat `GET /api/products` dan `GET /api/products/:id`; dukung filter kategori/pencarian sederhana jika dibutuhkan.
  - **Selesai:** produk aktif dapat dibaca dan ID tidak valid ditangani.

- [ ] **BE-18 — CRUD produk admin**
  - Buat `POST /api/admin/products`, `PATCH /api/admin/products/:id`, dan `DELETE /api/admin/products/:id`.
  - **Selesai:** hanya admin yang dapat mengelola produk.

- [ ] **BE-19 — Kelola kategori admin**
  - Buat endpoint tambah, ubah, dan hapus kategori.
  - **Selesai:** seluruh endpoint terlindungi middleware admin.

## Phase 6 — API Pesanan

- [ ] **BE-20 — Buat pesanan**
  - Buat `POST /api/orders`. Ambil identitas user dari token dan hitung harga dari database, bukan dari frontend.
  - **Selesai:** user tidak dapat memalsukan pemilik atau harga pesanan.

- [ ] **BE-21 — Simpan order dan item**
  - Simpan pesanan beserta item secara konsisten; gunakan transaksi/database function bila diperlukan.
  - **Selesai:** kegagalan tidak meninggalkan pesanan setengah tersimpan.

- [ ] **BE-22 — Riwayat pesanan customer**
  - Buat `GET /api/orders/my`.
  - **Selesai:** customer hanya bisa melihat pesanannya sendiri.

- [ ] **BE-23 — Detail pesanan**
  - Buat `GET /api/orders/:id`.
  - **Selesai:** hanya pemilik pesanan atau admin berwenang yang dapat melihatnya.

- [ ] **BE-24 — Kelola pesanan admin**
  - Buat `GET /api/admin/orders` dan `PATCH /api/admin/orders/:id/status`.
  - **Selesai:** admin bisa melihat pesanan dan mengubah status yang diizinkan.

## Phase 7 — Keamanan, Tes, dan Deploy

- [ ] **BE-25 — Terapkan aturan bisnis**
  - Cegah stok negatif dan transisi status pesanan yang tidak valid.
  - **Selesai:** aturan diterapkan di backend/database.

- [ ] **BE-26 — Proteksi dasar**
  - Batasi CORS, tambahkan rate limit, dan jangan bocorkan detail error internal.
  - **Selesai:** proteksi dasar aktif.

- [ ] **BE-27 — Tes endpoint**
  - Tes endpoint publik, token valid/invalid, akses customer/admin, input salah, dan data tidak ditemukan menggunakan Postman/Insomnia/REST Client.
  - **Selesai:** skenario utama lolos dan akses terlarang ditolak.

- [ ] **BE-28 — Dokumentasi API**
  - Dokumentasikan method, URL, body, response, status error, dan autentikasi.
  - **Selesai:** frontend bisa memakai API tanpa menebak format.

- [ ] **BE-29 — Deployment backend**
  - Atur environment production dan deploy ke hosting pilihan.
  - **Selesai:** health endpoint online dan secret aman.

## Cara Kita Mengerjakan

Untuk setiap task, langkah pembelajaran akan mencakup:

1. Tujuan dan konsep.
2. File yang dibuat/diubah.
3. Kode JavaScript lengkap.
4. Cara menjalankan dan mengetes.
5. Acceptance criteria.
6. Saran Git commit.

**Mulai dari BE-01.**

## Catatan Arsitektur

- Frontend React ada di repo `shoply-client`; backend Express di `shoply-server`.
- Supabase menyediakan PostgreSQL dan Auth.
- Frontend dapat memakai Supabase Auth untuk login lalu mengirim access token ke Express.
- Express wajib memverifikasi token dan role pada endpoint terlindungi.
- Jangan pernah menaruh service-role key di frontend.
- Payment gateway sungguhan belum termasuk MVP.

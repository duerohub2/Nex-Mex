# NEX-MEX — Kantor Virtual untuk Tim AI

NEX-MEX adalah proyek ruang kerja virtual 3D untuk mengelola dan mengamati beberapa AI Agent dalam satu kantor digital. Proyek ini dikembangkan dari basis kode Hermes3D dan diarahkan menjadi lingkungan kerja AI pribadi yang dapat dijalankan sendiri.

> **Status proyek:** aplikasi kantor dan antarmuka agent sudah tersedia. Mode lokal Android/Termux saat ini menyediakan gateway demo dengan penyimpanan lokal. Gateway demo **bukan model AI sungguhan** dan tidak menjalankan tool eksternal.

## Fitur yang tersedia di basis proyek

- Kantor virtual 3D dan tampilan kantor 2D bergaya pixel.
- Daftar agent, pembuatan agent, pengaturan, dan percakapan.
- Streaming pesan melalui protokol gateway.
- Panel operasional seperti standup, review, analitik, dan pemantauan.
- Pengaturan Studio yang disimpan secara lokal.
- Adapter untuk gateway Hermes, gateway demo, dan runtime HTTP yang kompatibel.
- Mode demo lokal untuk mencoba antarmuka tanpa memasang backend AI.

## Menjalankan di Android dengan Termux

Persyaratan yang disarankan:
- Android ARM64.
- Termux dari F-Droid atau GitHub resmi Termux.
- Node.js 20 atau lebih baru.
- npm 10 atau lebih baru.

Jalankan perintah berikut:

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts -y
git clone https://github.com/duerohub2/Nex-Mex.git
cd Nex-Mex
npm install
npm run local:demo
```

Buka browser Android dan kunjungi:

```text
http://127.0.0.1:3000
```

Mode demo menjalankan:
- Aplikasi kantor pada port `3000`.
- Gateway demo WebSocket pada port `18789`.

Hentikan aplikasi dengan `Ctrl+C` di Termux.

## Penyimpanan mode demo

Mode demo menyimpan agent, file agent, pengaturan sesi, dan riwayat percakapan ke:

```text
~/.nex-mex/demo-gateway-state.json
```

Lokasi tersebut dapat diganti menggunakan variabel lingkungan `NEX_MEX_STATE_PATH`.

Data disimpan di perangkat yang menjalankan gateway. Jangan menaruh token, kata sandi, atau data rahasia di percakapan demo maupun file state.

## Menjalankan dengan backend AI sungguhan

Mode demo hanya untuk eksplorasi antarmuka dan pengujian alur. Untuk jawaban AI sungguhan, hubungkan aplikasi ke runtime yang kompatibel.

Pilihan integrasi yang sudah ada di basis kode:
- **Hermes:** melalui adapter gateway Hermes.
- **Local / Custom runtime:** melalui endpoint HTTP yang memenuhi kontrak runtime.
- **Demo:** simulasi lokal, tanpa inferensi model.

Kontrak runtime HTTP yang digunakan mencakup:
- `GET /health`
- `GET /state`
- `GET /registry`
- `POST /v1/chat/completions`

Lihat dokumentasi [profil runtime](docs/runtime-profiles.md) dan [adapter Hermes](docs/hermes-gateway.md).

## Perintah pengembangan

```bash
npm run dev              # Jalankan server pengembangan
npm run local:demo       # Jalankan kantor + gateway demo lokal
npm run build            # Build produksi
npm run lint             # Pemeriksaan ESLint
npm run typecheck        # Pemeriksaan TypeScript
npm run test -- --run    # Jalankan tes unit sekali
npm run smoke:dev-server # Uji dasar server
```

## Struktur penting

- `src/app/` — halaman, route API, dan aplikasi Next.js.
- `src/features/` — fitur agent, kantor, chat, dan sistem operasional.
- `server/` — server web, proxy gateway, dan adapter runtime.
- `scripts/` — skrip pengembangan dan peluncur lokal.
- `docs/` — dokumentasi teknis dan panduan penggunaan.
- `tests/` — tes unit dan integrasi.

## Batasan yang perlu diketahui

- Mode demo tidak menghasilkan jawaban dari LLM.
- Penyimpanan mode demo tidak sama dengan database produksi atau sinkronisasi cloud.
- Integrasi backend sungguhan memerlukan runtime, model/provider, dan kredensial yang dikonfigurasi terpisah.
- Menjalankan build dan tes di perangkat Android harus diverifikasi langsung di perangkat; jangan menganggapnya berhasil sebelum dijalankan.

## Atribusi dan lisensi

NEX-MEX menggunakan basis kode Hermes3D. Hormati atribusi, pemberitahuan hak cipta, dan ketentuan lisensi yang tercantum di [LICENSE](LICENSE). NEX-MEX merupakan proyek independen dan tidak berafiliasi dengan tim resmi Hermes maupun Hermes3D.

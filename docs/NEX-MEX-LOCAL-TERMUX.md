# NEX-MEX Lokal — Android / Termux

Dokumen ini menjelaskan cara menjalankan antarmuka kantor NEX-MEX dan gateway demo pada satu perangkat Android.

## Tujuan dan status

Mode lokal menjalankan server web dan gateway demo dalam dua proses Node.js. Gateway demo menyediakan agent contoh, percakapan streaming simulasi, pengaturan sesi, dan penyimpanan state lokal.

**Penting:** gateway demo bukan model AI lokal. Balasan dibuat oleh fungsi simulasi, bukan hasil inferensi LLM, dan tool eksternal tidak dieksekusi.

## Persyaratan

- Android ARM64 disarankan.
- Termux dari sumber resmi F-Droid atau GitHub Termux.
- Node.js 20+ dan npm 10+.
- Ruang penyimpanan yang cukup untuk dependency Next.js, Three.js, dan Phaser.

## Instalasi

Jalankan satu per satu di Termux:

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts -y
node -v
npm -v
git clone https://github.com/duerohub2/Nex-Mex.git
cd Nex-Mex
npm install
npm run local:demo
```

Buka browser Android:

```text
http://127.0.0.1:3000
```

Gateway demo berjalan pada:

```text
ws://127.0.0.1:18789
```

Jika aplikasi meminta pemilihan backend, pilih **Demo backend** lalu hubungkan ke gateway lokal tersebut.

## Penyimpanan data demo

Data demo disimpan otomatis ke file JSON di:

```text
~/.nex-mex/demo-gateway-state.json
```

State yang disimpan:
- daftar agent;
- file agent;
- pengaturan sesi;
- riwayat percakapan.

Folder dibuat otomatis saat penyimpanan pertama. Lokasi file dapat diganti dengan mengatur `NEX_MEX_STATE_PATH` sebelum menjalankan aplikasi:

```bash
NEX_MEX_STATE_PATH="$HOME/nex-mex-data/state.json" npm run local:demo
```

Penulisan menggunakan file sementara lalu rename agar file state tidak mudah rusak ketika proses berhenti saat penyimpanan. Riwayat disimpan maksimal 1.000 pesan terakhir per sesi.

File state berada di perangkat lokal. Jangan memasukkan rahasia, token provider, atau kata sandi ke dalam data demo.

## Menghentikan

Tekan `Ctrl+C` pada sesi Termux yang menjalankan aplikasi.

## Batasan saat ini

- Gateway demo menghasilkan balasan simulasi, bukan AI sungguhan.
- Mode demo tidak menjalankan tool eksternal atau otomasi sistem.
- Penyimpanan JSON hanya untuk satu proses lokal; ini bukan database multi-pengguna.
- UI koneksi upstream masih tersedia dan mungkin memerlukan pemilihan backend secara manual.
- Build dan uji langsung pada perangkat Android belum diverifikasi dari lingkungan pengembangan ini.

## Tahap pengembangan berikutnya

1. Tambahkan mode lokal yang otomatis memilih gateway demo tanpa layar koneksi.
2. Pisahkan antarmuka demo dari runtime AI sungguhan dengan indikator status yang jelas.
3. Hubungkan runtime AI lokal yang kompatibel dan aman.
4. Tambahkan kontrol izin tool dan persetujuan sebelum agent menjalankan tindakan.
5. Uji instalasi, build, penyimpanan, dan pemulihan data langsung di Android/Termux.

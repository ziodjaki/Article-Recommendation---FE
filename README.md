# Frontend Journal Recommendation (Next.js)

Frontend ini dipakai untuk:
- Input judul dan abstrak artikel.
- Mengirim request ke backend FastAPI endpoint `/recommend`.
- Menampilkan Top 3 jurnal dengan skor, confidence, dan alasan.

## Environment

File `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_CLIENT_API_KEY=
```

`NEXT_PUBLIC_CLIENT_API_KEY` opsional, dipakai jika backend mengaktifkan `ENFORCE_API_KEY=true`.

## Menjalankan Lokal

1. Pastikan backend berjalan di `http://localhost:8000`.
2. Jalankan frontend:

```powershell
npm install
npm run dev
```

3. Buka `http://localhost:3000`.

## Struktur Penting

- `src/app/page.tsx`: halaman utama + integrasi form dan hasil.
- `src/components/RecommendationForm.tsx`: input, validasi, submit, loading.
- `src/components/RecommendationResult.tsx`: render daftar hasil/no-data.
- `src/components/ResultCard.tsx`: kartu jurnal per item + badge confidence.
- `src/lib/api.ts`: wrapper request ke backend.
- `src/lib/types.ts`: definisi tipe request/response.

## Validasi Form

- Judul minimal 10 karakter.
- Abstrak minimal 80 karakter.
- Tombol submit disable saat request berjalan.
- Error field dan error API ditampilkan jelas di UI.

## CORS Backend

Pastikan backend mengizinkan origin frontend:
- `http://localhost:3000`

Jika terjadi error CORS, cek:
1. Backend aktif di port 8000.
2. `NEXT_PUBLIC_API_BASE_URL` benar.
3. `allow_origins` pada middleware CORS backend.

## Uji End-to-End (Manual)

1. Hybrid learning:
- Input topik hybrid learning.
- Pastikan `Journal Neosantara Hybrid Learning` muncul dalam Top 3.

2. Islamic digital finance:
- Input topik finance syariah digital.
- Pastikan `Journal Markcount Finance` atau `Sharia Oikonomia Law Journal` punya skor tinggi.

3. Invalid input:
- Isi judul pendek/abstrak terlalu pendek.
- Pastikan submit ditolak di sisi frontend.

4. Backend mati:
- Stop backend lalu submit.
- Pastikan error tampil tanpa crash UI.

## Build dan Deploy

```powershell
npm run lint
npm run build
```

Deploy rekomendasi:
- Frontend: Vercel
- Backend: Railway atau Render

Set env produksi frontend:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url
```

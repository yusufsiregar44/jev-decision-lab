export type Language = "en" | "id";

// UI copy only. Never pass raw JSON, model values, or user input through this map.
const indonesian: Record<string, string> = {
  "Skip to workspace": "Langsung ke area kerja",
  "Choice picks an option. Score rates it. Noul estimates the chance of yes. Open a question to edit it.":
    "Choice memilih jawaban. Score memberi nilai. Noul memperkirakan peluang jawaban ya. Buka pertanyaan untuk mengubahnya.",
  "Confidence is a model signal, not a guarantee of accuracy.":
    "Keyakinan menunjukkan penilaian model, bukan jaminan jawabannya benar.",
  "Jev Decision Lab home": "Beranda Jev Decision Lab",
  "OpenRouter key": "Kunci OpenRouter",
  "OpenRouter API key": "Kunci API OpenRouter",
  Clear: "Hapus",
  "Key required": "Kunci belum diisi",
  "Key supplied": "Kunci sudah diisi",
  "Runtime only. Never saved.": "Hanya selama halaman terbuka. Tidak disimpan.",
  "Your key goes directly to OpenRouter, stays out of storage and logs, and clears on reload.":
    "Kunci dikirim langsung ke OpenRouter, tidak masuk ke penyimpanan browser atau log, dan terhapus saat halaman dimuat ulang.",
  "Green means supplied, not validated.":
    "Hijau berarti sudah diisi, belum tentu valid.",
  Configure: "Atur kebutuhan",
  "Give Jev something to decide.": "Siapkan hal yang ingin dinilai Jev.",
  "Start with an example": "Mulai dari contoh",
  "Input state": "Informasi yang akan dinilai",
  "This text is shared with all three questions.":
    "Ketiga pertanyaan memakai informasi yang sama ini.",
  "Three focused questions": "Tiga pertanyaan utama",
  Editable: "Bisa diubah",
  "Choose one option": "Pilih satu jawaban",
  Question: "Pertanyaan",
  Options: "Pilihan jawaban",
  "· one per line": "· satu pilihan per baris",
  "Rate on a rubric": "Nilai sesuai kriteria",
  Rubric: "Kriteria penilaian",
  "· lowest to highest, one per line":
    "· dari terendah ke tertinggi, satu per baris",
  "Levels start at 0. The returned score can fall between levels.":
    "Tingkat dimulai dari 0. Nilai yang dihasilkan bisa berada di antara dua tingkat.",
  "Check a statement": "Periksa suatu pernyataan",
  "Yes / no question": "Pertanyaan ya / tidak",
  "Returns a probability from 0 (no) to 1 (yes).":
    "Menghasilkan peluang dari 0 (tidak) sampai 1 (ya).",
  "Routing threshold": "Batas untuk meneruskan otomatis",
  "Minimum choice confidence": "Batas keyakinan Jev",
  "More automatic routes": "Lebih banyak diteruskan otomatis",
  "More human review": "Lebih banyak diperiksa tim",
  "Adjust freely. This rule runs locally without another API call.":
    "Silakan sesuaikan. Aturan ini berjalan di browser tanpa panggilan API tambahan.",
  "See the rule": "Lihat aturannya",
  "Inspect & run": "Periksa & coba",
  "Exactly what goes to the model.": "Lihat persis apa yang dikirim ke model.",
  "Via OpenRouter": "Melalui OpenRouter",
  "Run decision": "Coba dengan Jev",
  "Running decision…": "Jev sedang menilai…",
  "Cancel request": "Batalkan permintaan",
  "Add your OpenRouter key to run. Each run uses your OpenRouter credits.":
    "Isi kunci OpenRouter untuk mencoba. Setiap percobaan memakai kredit OpenRouter Anda.",
  "Each run sends the displayed request and uses your OpenRouter credits.":
    "Setiap percobaan mengirim permintaan yang ditampilkan dan memakai kredit OpenRouter Anda.",
  "REQUEST BODY": "ISI PERMINTAAN",
  "Copy JSON": "Salin JSON",
  "Exact JSON request body for next run":
    "JSON yang akan dikirim pada percobaan berikutnya",
  "Your key is sent in the authorization header, never in this JSON.":
    "Kunci dikirim melalui header otorisasi, bukan di dalam JSON ini.",
  Understand: "Lihat hasil",
  "Model judgment, then your rule.": "Penilaian model, lalu aturan Anda.",
  "Model response": "Hasil penilaian Jev",
  "Ready when you are": "Siap dicoba",
  "Choose an example, add your key, and run a decision.":
    "Pilih contoh, isi kunci, lalu coba dengan Jev.",
  "Small questions.": "Pertanyaan sederhana.",
  "Decisions you can inspect.": "Hasilnya bisa Anda periksa.",
  "Inputs changed. These results belong to the captured request below.":
    "Isian sudah berubah. Hasil ini berasal dari permintaan sebelumnya yang ditampilkan di bawah.",
  "Full response JSON": "JSON jawaban lengkap",
  "Original request for this result": "Permintaan asli untuk hasil ini",
  "Your application’s decision": "Keputusan aplikasi Anda",
  "Local rule": "Aturan di browser",
  "Proposed route": "Tujuan yang disarankan",
  "Waiting for Jev": "Menunggu Jev",
  "The choice and confidence will determine the route.":
    "Pilihan dan tingkat keyakinan menentukan ke mana permintaan diteruskan.",
  "An explanation of what your code would do. No downstream action is executed.":
    "Ini menjelaskan tindakan yang akan diambil kode Anda. Tidak ada tindakan lanjutan yang dijalankan.",
  "Built for learning. Independent of TypeSafe and OpenRouter.":
    "Dibuat untuk belajar. Tidak berafiliasi dengan TypeSafe atau OpenRouter.",
  "Source on GitHub ↗": "Kode di GitHub ↗",
  "Jev docs ↗": "Panduan Jev ↗",
  "API example ↗": "Contoh API ↗",
  "Enter input text.": "Isi informasi yang ingin dinilai.",
  "Fill in all three questions.": "Lengkapi ketiga pertanyaan.",
  "Add at least two choice options.": "Tambahkan minimal dua pilihan jawaban.",
  "Choice options must be unique.": "Setiap pilihan jawaban harus berbeda.",
  "Add at least two rubric levels.": "Tambahkan minimal dua tingkat penilaian.",
  "CHOICE · Selected option": "CHOICE · Pilihan terpilih",
  "SCORE · Rubric rating": "SCORE · Nilai sesuai kriteria",
  "NOUL · Probability of yes": "NOUL · Peluang jawaban ya",
  "Rubric unavailable": "Kriteria penilaian tidak tersedia",
  "not supplied": "tidak diberikan",
  "Model:": "Model:",
  "Provider:": "Penyedia:",
  "Input tokens:": "Token masukan:",
  "Output tokens:": "Token keluaran:",
  "Cost:": "Biaya:",
  "Rubric:": "Kriteria:",
  "Confidence:": "Keyakinan:",
  Confidence: "Keyakinan",
  "meets threshold": "memenuhi batas",
  "is below threshold": "di bawah batas",
  "s round trip": "detik total",
  "Request JSON copied. No authorization key included.":
    "JSON permintaan disalin tanpa kunci otorisasi.",
  "Clipboard unavailable. Select the request text to copy it.":
    "Salin otomatis tidak tersedia. Pilih teks permintaan untuk menyalinnya.",
  "Sending request to OpenRouter…": "Mengirim permintaan ke OpenRouter…",
  Running: "Sedang diproses",
  "Live result": "Hasil API langsung",
  "Request cancelled or timed out. OpenRouter may already have processed it.":
    "Permintaan dibatalkan atau melewati batas waktu. OpenRouter mungkin sudah memprosesnya.",
  "Previous successful result retained below.":
    "Hasil terakhir yang berhasil tetap ditampilkan di bawah.",
  "No response available.": "Belum ada jawaban yang bisa ditampilkan.",
  "Previous result": "Hasil sebelumnya",
  Failed: "Gagal",
  "Human review": "Perlu diperiksa tim",
  "human review": "Perlu diperiksa tim",
  "No usable choice returned.":
    "Model tidak memberikan pilihan yang bisa digunakan.",
  "Returned choice is not an option in the captured request.":
    "Pilihan dari model tidak ada dalam daftar pilihan pada permintaan asli.",
  "Choice confidence was not returned as a valid 0–1 confidence value. No confidence was inferred.":
    "Model tidak memberikan nilai keyakinan yang valid antara 0 dan 1. Aplikasi tidak menebak nilainya.",
  "Supply an OpenRouter API key first.":
    "Isi kunci API OpenRouter terlebih dahulu.",
  "Response did not contain an answers object.":
    "Jawaban API tidak memuat objek answers yang diperlukan.",
  "Response contained an invalid answer.":
    "Jawaban API memuat jawaban yang tidak valid.",
  "Response contained an unsupported or invalid answer.":
    "Jawaban API memuat jawaban yang tidak didukung atau tidak valid.",
  "OpenRouter returned a non-JSON response.":
    "OpenRouter mengirim jawaban yang bukan JSON.",
  "Failed to fetch":
    "Tidak dapat terhubung. Periksa koneksi atau akses ke OpenRouter.",
  "Request failed. Details:": "Permintaan gagal. Detail:",
  "Your edits are unchanged. Reload the example to use this language; this replaces the current input and questions.":
    "Perubahan Anda tetap dipertahankan. Muat ulang contoh untuk memakai bahasa ini; isian dan pertanyaan saat ini akan diganti.",
  "Reload example": "Muat ulang contoh",
  Provider: "Penyedia",
  "Input tokens": "Token masukan",
  "Output tokens": "Token keluaran",
  Cost: "Biaya",
  Language: "Bahasa",
  English: "English",
  Indonesian: "Bahasa Indonesia",
};

/** Translate known interface copy only; unknown text remains unchanged. */
export function translate(text: string, lang: Language): string {
  if (lang === "en") return text;
  if (Object.hasOwn(indonesian, text)) return indonesian[text];
  const rule = text.match(
    /^Confidence (\d+\.\d+) (meets threshold|is below threshold) (\d+\.\d+)\.$/,
  );
  if (rule) return `Keyakinan ${rule[1]} ${indonesian[rule[2]]} ${rule[3]}.`;
  return text;
}

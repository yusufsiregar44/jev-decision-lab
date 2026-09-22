export const presets = {
  support: {
    name: "Support triage",
    text: "I was charged twice, and now I can’t log in before my meeting.",
    choice: "Which team should handle this?",
    options: ["billing", "technical", "general"],
    score: "How urgently does this need attention?",
    levels: ["Can wait", "This week", "Today"],
    noul: "Does this describe blocked account access?",
  },
  research: {
    name: "Research relevance",
    text: "Acme reported stronger revenue, but cash flow fell as inventory accumulated. Management expects demand to recover next quarter.",
    choice: "What is the main research topic?",
    options: ["earnings", "industry", "other"],
    score: "How relevant is this to cash-flow research?",
    levels: ["Unrelated", "Indirectly relevant", "Directly relevant"],
    noul: "Does this mention deteriorating cash flow?",
  },
  router: {
    name: "Request routing",
    text: "Find the cancellation terms in our subscription policy.",
    choice: "Which tool fits this request?",
    options: ["document_search", "calculator", "human_review"],
    score: "How clearly is the task specified?",
    levels: ["Unclear", "Partly specified", "Clear"],
    noul: "Does the answer require internal documents?",
  },
};
export type PresetId = keyof typeof presets;

// Preset content is localized intentionally; raw answers are displayed as returned.
export const localizedPresets = {
  en: presets,
  id: {
    support: {
      name: "Keluhan pelanggan",
      text: "Saya ditagih dua kali untuk langganan yang sama. Sekarang saya juga tidak bisa masuk akun, padahal sebentar lagi ada rapat dengan klien.",
      choice: "Tim mana yang sebaiknya menangani keluhan ini?",
      options: ["penagihan", "bantuan teknis", "layanan umum"],
      score: "Seberapa cepat keluhan ini perlu ditangani?",
      levels: ["Bisa menunggu", "Minggu ini", "Hari ini"],
      noul: "Apakah pelanggan sedang tidak bisa mengakses akunnya?",
    },
    research: {
      name: "Relevansi riset bisnis",
      text: "PT Maju Bersama melaporkan kenaikan pendapatan, tetapi arus kas menurun karena persediaan barang menumpuk. Manajemen memperkirakan permintaan akan pulih pada kuartal berikutnya.",
      choice: "Apa topik utama informasi bisnis ini?",
      options: ["kinerja keuangan", "kondisi industri", "topik lain"],
      score: "Seberapa relevan informasi ini untuk riset arus kas perusahaan?",
      levels: [
        "Tidak relevan",
        "Berkaitan secara tidak langsung",
        "Berkaitan langsung",
      ],
      noul: "Apakah informasi ini menyebutkan penurunan arus kas?",
    },
    router: {
      name: "Arahkan permintaan kerja",
      text: "Tolong cari syarat pembatalan dalam dokumen kebijakan langganan perusahaan kita.",
      choice: "Cara mana yang paling sesuai untuk menangani permintaan ini?",
      options: ["cari dokumen", "gunakan kalkulator", "minta bantuan tim"],
      score: "Seberapa jelas tugas yang diminta?",
      levels: ["Belum jelas", "Sebagian sudah jelas", "Sudah jelas"],
      noul: "Apakah jawaban memerlukan dokumen internal perusahaan?",
    },
  },
};

"use client";

import { useMemo, useState } from "react";

import RecommendationForm from "@/components/RecommendationForm";
import RecommendationResult from "@/components/RecommendationResult";
import { RecommendationItem } from "@/lib/types";

export default function Home() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);

  const total = useMemo(() => recommendations.length, [recommendations]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#cffafe_0%,_#f8fafc_45%,_#f5f3ff_100%)] px-4 py-10 md:px-8">
      <main className="mx-auto w-full max-w-5xl space-y-7">
        <header className="rounded-3xl border border-cyan-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Article Recommendation</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            Temukan Jurnal Paling Relevan untuk Naskah Anda
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 md:text-base">
            Masukkan judul dan abstrak artikel Anda. Sistem akan menganalisis kemiripan semantik dan
            menampilkan 3 jurnal teratas lengkap dengan skor serta alasan rekomendasi.
          </p>
          {/* <p className="mt-4 text-sm text-slate-600">
            Rekomendasi ini berbasis analisis semantik dan penalaran AI Gemini 2.5 Pro. Keputusan final tetap
            mengikuti kebijakan editor jurnal.
          </p> */}
        </header>

        <section className="grid items-start gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="lg:sticky lg:top-8">
            <RecommendationForm onResult={setRecommendations} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex lg:h-[calc(100vh-8.5rem)] lg:flex-col lg:overflow-hidden">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <h2 className="text-base font-semibold text-slate-900">Hasil Rekomendasi</h2>
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">
                {total} hasil
              </span>
            </div>

            <div className="mt-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
              <RecommendationResult items={recommendations} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

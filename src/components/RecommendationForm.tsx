"use client";

import { FormEvent, useState } from "react";

import { recommendArticle } from "@/lib/api";
import { RecommendationItem } from "@/lib/types";

type RecommendationFormProps = {
  onResult: (items: RecommendationItem[]) => void;
};

type FieldErrors = {
  title?: string;
  abstract?: string;
};

export default function RecommendationForm({ onResult }: RecommendationFormProps) {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [requestError, setRequestError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  function validateInput(): FieldErrors {
    const nextErrors: FieldErrors = {};

    if (title.trim().length < 10) {
      nextErrors.title = "Judul minimal 10 karakter.";
    }

    if (abstract.trim().length < 80) {
      nextErrors.abstract = "Abstrak minimal 80 karakter.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestError("");

    const nextErrors = validateInput();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await recommendArticle({
        title: title.trim(),
        abstract: abstract.trim(),
      });
      onResult(result.recommendations);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan tidak terduga.";
      setRequestError(message);
      onResult([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold text-slate-800">
          Judul Artikel
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Contoh: AI-based Prediction for Learning Outcomes"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-rose-600">
            {errors.title}
          </p>
        )}
      </div>

      <div className="mt-5 space-y-2">
        <label htmlFor="abstract" className="text-sm font-semibold text-slate-800">
          Abstrak
        </label>
        <textarea
          id="abstract"
          value={abstract}
          onChange={(event) => setAbstract(event.target.value)}
          placeholder="Tuliskan abstrak minimal 80 karakter..."
          rows={7}
          className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          aria-invalid={Boolean(errors.abstract)}
          aria-describedby={errors.abstract ? "abstract-error" : undefined}
        />
        {errors.abstract && (
          <p id="abstract-error" className="text-sm text-rose-600">
            {errors.abstract}
          </p>
        )}
      </div>

      {requestError && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{requestError}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isLoading ? "Memproses rekomendasi..." : "Cari Rekomendasi Jurnal"}
      </button>
    </form>
  );
}

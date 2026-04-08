import { RecommendationItem } from "@/lib/types";
import ResultCard from "./ResultCard";

type RecommendationResultProps = {
  items: RecommendationItem[];
};

export default function RecommendationResult({ items }: RecommendationResultProps) {
  if (!items.length) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-600">
        Belum ada hasil rekomendasi. Isi judul dan abstrak, lalu klik Cari Rekomendasi.
      </section>
    );
  }

  const sorted = [...items].sort((a, b) => b.score - a.score);

  return (
    <section className="space-y-4">
      {sorted.map((item, index) => (
        <ResultCard key={item.journal_id} item={item} rank={index + 1} />
      ))}
    </section>
  );
}

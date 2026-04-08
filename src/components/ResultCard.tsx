import { RecommendationItem } from "@/lib/types";

type ResultCardProps = {
  item: RecommendationItem;
  rank: number;
};

function getConfidenceClass(confidence: RecommendationItem["confidence"]): string {
  if (confidence === "high") return "bg-emerald-100 text-emerald-800 border-emerald-300";
  if (confidence === "medium") return "bg-amber-100 text-amber-800 border-amber-300";
  return "bg-rose-100 text-rose-800 border-rose-300";
}

function toPercent(score: number): string {
  const value = Math.max(0, Math.min(100, score * 100));
  return `${value.toFixed(1)}%`;
}

export default function ResultCard({ item, rank }: ResultCardProps) {
  const isTop = rank === 1;

  return (
    <article
      className={[
        "rounded-2xl border p-5 shadow-sm transition",
        isTop
          ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-white shadow-cyan-100"
          : "border-slate-200 bg-white",
      ].join(" ")}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Peringkat #{rank}
        </p>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${getConfidenceClass(item.confidence)}`}
        >
          {item.confidence}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{item.journal_name}</h3>
      <p className="mt-1 text-sm text-slate-500">ID: {item.journal_id}</p>

      <div className="mt-4 flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-900">{toPercent(item.score)}</p>
        <p className="text-sm text-slate-500">semantic match score</p>
      </div>

      <ul className="mt-4 space-y-2">
        {item.reasons.slice(0, 4).map((reason, idx) => (
          <li key={`${item.journal_id}-reason-${idx}`} className="flex gap-2 text-sm text-slate-700">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

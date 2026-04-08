import { RecommendRequest, RecommendResponse } from "./types";

export async function recommendArticle(payload: RecommendRequest): Promise<RecommendResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_API_KEY;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL belum diset.");
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (clientApiKey) {
    headers["X-API-Key"] = clientApiKey;
  }

  const res = await fetch(`${baseUrl}/recommend`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    let message = "Gagal memproses rekomendasi.";
    try {
      const body = await res.json();
      if (body?.detail) {
        message = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
      }
    } catch {
      const raw = await res.text();
      if (raw) {
        message = raw;
      }
    }
    throw new Error(message);
  }

  return (await res.json()) as RecommendResponse;
}

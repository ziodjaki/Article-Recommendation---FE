export type RecommendRequest = {
  title: string;
  abstract: string;
};

export type RecommendationItem = {
  journal_id: string;
  journal_name: string;
  score: number;
  confidence: "high" | "medium" | "low";
  reasons: string[];
};

export type RecommendResponse = {
  recommendations: RecommendationItem[];
};

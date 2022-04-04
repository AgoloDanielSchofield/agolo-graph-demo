export interface IEsgSummaryRequest {
  id: string;
  query: string;
  topic: string;
  subtopics: string[];
}

export interface ISummary {
  metadata: any;
  ranks: Number[];
  sentences: string[];
  title: string;
}
export interface IEsgSummaryResponse {
  photos: any[];
  summary: ISummary[];
  summary_clusters: any[];
  title: string;
  title_candidates: string[];
}

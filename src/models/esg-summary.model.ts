export interface IEsgSummaryRequest {
  id: string;
  query: string;
  topic: string;
  subtopics: string[];
}

export interface ISummary {
  metadata: any;
  ranks: number[];
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

export enum IStatus {
  COMPLETE = 'COMPLETE',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
}

export interface IDocument {
  id: string;
  name: string;
  numberOfPages: number;
  parsing_status: IStatus;
  size: number;
  summarization_status: IStatus;
  type: any;
}

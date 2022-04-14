import { MouseEventHandler } from 'react';
import {
  IDocument,
  IEsgSummaryRequest,
  IEsgSummaryResponse,
  ISummary,
  ITopic,
} from './esg-summary.model';

export interface ISummarizeButton {
  onSummarizeBtnClick: MouseEventHandler;
  summarizeBtnDisabled?: boolean;
  summarizeBtnLoading?: boolean;
}

export interface ISummaryOutput {
  summary?: IEsgSummaryResponse | any;
  isFetchingESGSummary?: boolean;
  handleSummaryHTML: (text: string) => void;
  summarizedDocumentTitle?: string;
}

export interface IPdfSelectionList {
  isFetchingPDFList: boolean;
  documentsList: IDocument[];
  setSelectedDocumentID: (key: string) => void;
}

export interface IOntologySelection {
  topics: ITopic[];
  isFetchingTopicsList: boolean;
  setSelectedSubtopics: (subtopics: string[]) => void;
}

export interface ISummaryElements {
  topics: ITopic[];
  isFetchingTopicsList: boolean;
  isFetchingPDFList: boolean;
  documentsList: IDocument[];
  isFetchingESGSummary: boolean;
}

export interface ISummaryForm extends ISummaryElements {
  selectedDocumentID: string;
  setSelectedDocumentID: (id: string) => void;
  query: string;
  setQuery: (query: string) => void;
  selectedSubtopics: string[];
  setSelectedSubtopics: (subtopics: string[]) => void;
  fetchESGSummary: (payload: IEsgSummaryRequest) => void;
  setSummarizedDocumentTitle: (title: string) => void;
}

export interface IQueryInput {
  placeholder: string;
  title: string;
  query: string;
  setQuery: (query: string) => void;
}

export interface IOntologyBasedSummarizer extends ISummaryElements {
  summary: ISummary;
  isFetchingPDFFile: boolean;
  fetchTopicsListProp: () => ITopic[] | any;
  fetchPDFListProp: () => IDocument[] | any;
  clearSummaryProp: () => void;
  fetchESGSummaryProp: (params: IEsgSummaryRequest) => {};
  fetchPDFFileProp: (id: string) => Blob | any;
}

export interface IObsDocsUpload {
  fetchPDFListProp: () => IDocument[] | any;
  documentsList: IDocument[];
}

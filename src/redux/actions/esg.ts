import { message } from 'antd';
import { Dispatch } from 'redux';
import {
  fetchESGSummaryAPI,
  fetchOntologyTopicsAPI,
  fetchPDFFileAPI,
  fetchPDFListAPI,
} from '../../api/esg';
import {
  IDocument,
  IEsgSummaryRequest,
  IEsgSummaryResponse,
  ITopics,
} from '../../models/esg-summary.model';
import { IAction } from '../../models/shared';
import * as actionTypes from '../constants';

export const fetchTopicsListBegin = (): IAction => ({
  type: actionTypes.FETCH_TOPICS_LIST_BEGIN,
});

export const fetchTopicsListSuccess = (topics: string[]): IAction => ({
  type: actionTypes.FETCH_TOPICS_LIST_SUCCESS,
  payload: { topics },
});

export const fetchTopicsListFailure = (error: string): IAction => ({
  type: actionTypes.FETCH_TOPICS_LIST_FAILURE,
  payload: { error },
});

export const fetchPDFListBegin = (): IAction => ({
  type: actionTypes.FETCH_PDF_LIST_BEGIN,
});

export const fetchPDFListSuccess = (documents: IDocument[]): IAction => ({
  type: actionTypes.FETCH_PDF_LIST_SUCCESS,
  payload: { documents },
});

export const fetchPDFListFailure = (error: string): IAction => ({
  type: actionTypes.FETCH_PDF_LIST_FAILURE,
  payload: { error },
});

export const fetchESGSummaryBegin = (): IAction => ({
  type: actionTypes.FETCH_ESG_SUMMARY_BEGIN,
});

export const fetchESGSummarySuccess = (
  summary: IEsgSummaryResponse
): IAction => ({
  type: actionTypes.FETCH_ESG_SUMMARY_SUCCESS,
  payload: { summary },
});

export const fetchESGSummaryFailure = (error: string): IAction => ({
  type: actionTypes.FETCH_ESG_SUMMARY_FAILURE,
  payload: { error },
});
export const fetchPDFFileBegin = (): IAction => ({
  type: actionTypes.FETCH_PDF_FILE_BEGIN,
});

export const fetchPDFFileSuccess = (file: Blob): IAction => ({
  type: actionTypes.FETCH_PDF_FILE_SUCCESS,
  payload: { file },
});

export const fetchPDFFileFailure = (error: string): IAction => ({
  type: actionTypes.FETCH_PDF_FILE_FAILURE,
  payload: { error },
});

export const fetchTopicsList =
  (): ITopics | any => async (dispatch: Dispatch) => {
    dispatch(fetchTopicsListBegin());
    try {
      const result = await fetchOntologyTopicsAPI();
      if (result.error) {
        dispatch(fetchTopicsListFailure(result.message));
        message.error(
          'Unable to load ontologies list. Please try again later.'
        );
      } else {
        const { topics } = result;
        dispatch(fetchTopicsListSuccess(topics));
        return topics;
      }
    } catch (error: any) {
      dispatch(fetchTopicsListFailure(error.message));
      message.error('Unable to load ontologies list. Please try again later.');
    }
    return '';
  };

export const fetchPDFList =
  (): IDocument[] | any => async (dispatch: Dispatch) => {
    dispatch(fetchPDFListBegin());
    try {
      const result = await fetchPDFListAPI();
      dispatch(fetchPDFListSuccess(result));
    } catch (error: any) {
      dispatch(fetchPDFListFailure(error.message));
      message.error('Unable to load PDF list. Please try again later.');
    }
  };

export const fetchESGSummary =
  (params: IEsgSummaryRequest): IEsgSummaryResponse | any =>
  async (dispatch: Dispatch) => {
    dispatch(fetchESGSummaryBegin());
    try {
      const result = await fetchESGSummaryAPI(params);
      if (result.error) {
        dispatch(fetchESGSummaryFailure(result.message));
        message.error('Unable to fetch summary. Please try again later.');
      } else {
        dispatch(fetchESGSummarySuccess(result));
      }
    } catch (error: any) {
      dispatch(fetchESGSummaryFailure(error.message));
      message.error('Unable to fetch summary. Please try again later.');
    }
  };

export const fetchPDFFile =
  (id: string): Blob | any =>
  async (dispatch: Dispatch) => {
    dispatch(fetchPDFFileBegin());
    try {
      const result = await fetchPDFFileAPI(id);
      if (result.error) {
        dispatch(fetchPDFFileFailure(result.message));
        message.error('Unable to view PDF. Please try again later.');
      } else {
        dispatch(fetchPDFFileSuccess(result));
        return result;
      }
    } catch (error: any) {
      dispatch(fetchPDFFileFailure(error.message));
      message.error('Unable to view PDF. Please try again later.');
    }
    return '';
  };

import { IAction } from '../../models/shared';
import * as actionTypes from '../constants';

const initialState = {
  isFetchingTopicsList: false,
  topics: [],
  isFetchingPDFList: false,
  documentsList: [],
  isFetchingESGSummary: false,
  summary: {},
  isFetchingPDFFile: false,
  file: {},
};

export type ESGState = Readonly<typeof initialState>;
const initialAction = {
  type: '',
  payload: {},
  message: '',
};
const esg = (
  action: IAction = initialAction,
  state: ESGState = initialState
): ESGState => {
  switch (action.type) {
    case actionTypes.FETCH_TOPICS_LIST_BEGIN:
      return {
        ...state,
        isFetchingTopicsList: true,
      };
    case actionTypes.FETCH_TOPICS_LIST_SUCCESS:
      return {
        ...state,
        isFetchingTopicsList: false,
        topics: action.payload.topics,
      };
    case actionTypes.FETCH_TOPICS_LIST_FAILURE:
      return {
        ...state,
        isFetchingTopicsList: false,
      };
    case actionTypes.FETCH_PDF_LIST_BEGIN:
      return {
        ...state,
        isFetchingPDFList: true,
      };
    case actionTypes.FETCH_PDF_LIST_SUCCESS:
      return {
        ...state,
        isFetchingPDFList: false,
        documentsList: action.payload.documents,
      };
    case actionTypes.FETCH_PDF_LIST_FAILURE:
      return {
        ...state,
        isFetchingPDFList: false,
      };
    case actionTypes.FETCH_ESG_SUMMARY_BEGIN:
      return {
        ...state,
        isFetchingESGSummary: true,
      };
    case actionTypes.FETCH_ESG_SUMMARY_SUCCESS:
      return {
        ...state,
        isFetchingESGSummary: false,
        summary: action.payload.summary,
      };
    case actionTypes.FETCH_ESG_SUMMARY_FAILURE:
      return {
        ...state,
        isFetchingESGSummary: false,
        summary: {},
      };
    case actionTypes.FETCH_PDF_FILE_BEGIN:
      return {
        ...state,
        isFetchingPDFFile: true,
      };
    case actionTypes.FETCH_PDF_FILE_SUCCESS:
      return {
        ...state,
        isFetchingPDFFile: false,
        file: action.payload.file,
      };
    case actionTypes.FETCH_PDF_FILE_FAILURE:
      return {
        ...state,
        isFetchingPDFFile: false,
        file: {},
      };
    default:
      return state;
  }
};

export default esg;

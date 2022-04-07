import axios from 'axios';
import {
  IDocument,
  IEsgSummaryRequest,
  IEsgSummaryResponse,
  ITopics,
} from '../models/esg-summary.model';
import { IErrorResponse } from '../models/shared';
import { getCurrentUserEmail, getUserId } from '../utils/helpers';

const ONTOLOGY_HANDLER_URL = process.env.REACT_APP_ONTOLOGY_HANDLER_URL;
const OBS_DOCS_WAREHOUSE = process.env.REACT_APP_DOCS_WAREHOUSE;

export const fetchOntologyTopicsAPI = async (): Promise<
  ITopics | IErrorResponse | any
> => {
  try {
    const url = `${ONTOLOGY_HANDLER_URL}/retrieve-ontology-aspect-subtopics`;
    const response = await axios.post(url, {
      data: {},
    });
    const { status, statusText, data } = response;
    if (status === 200) {
      return data;
    }
    return { error: true, message: statusText, status };
  } catch (err: any) {
    const { data } = err.response;
    return { error: true, message: data.message, status: data.status };
  }
};

export const fetchESGSummaryAPI = async (
  params: IEsgSummaryRequest
): Promise<IEsgSummaryResponse | IErrorResponse | any> => {
  const { id, query, topic, subtopics } = params;
  const url = `${OBS_DOCS_WAREHOUSE}/docs/${id}/summarize`;
  const userId = getUserId();
  const userEmail = getCurrentUserEmail();
  try {
    const payload = JSON.stringify({
      query,
      ontology_aspect: topic,
      ontology_aspect_subtopics: subtopics,
      userId,
      userEmail,
    });
    const response = await axios.post(url, {
      data: payload,
    });
    const { status, statusText, data } = response;
    if (status === 200) {
      return data;
    }
    return { error: true, message: statusText, status };
  } catch (err: any) {
    const { data } = err.response;
    return { error: true, message: data.message, status: data.status };
  }
};

export const fetchPDFListAPI = async (): Promise<
  IDocument[] | IErrorResponse | any
> => {
  try {
    const url = `${OBS_DOCS_WAREHOUSE}/docs/all`;
    const response = await axios.get(url);
    const { status, statusText, data } = response;
    if (status === 200) {
      return data;
    }
    return { error: true, message: statusText, status };
  } catch (err: any) {
    const { data } = err.response;
    return { error: true, message: data.message, status: data.status };
  }
};

export const fetchPDFFileAPI = async (
  id: string
): Promise<Blob | IErrorResponse | any> => {
  try {
    const url = `${OBS_DOCS_WAREHOUSE}/docs/download/${id}`;
    const response = await axios.get(url, {
      responseType: 'blob',
    });
    const { status, statusText, data } = response;
    if (status === 200) {
      return data;
    }
    return { error: true, message: statusText, status };
  } catch (err: any) {
    const { data } = err.response;
    return { error: true, message: data.message, status: data.status };
  }
};

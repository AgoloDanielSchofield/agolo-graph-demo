import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, message, Row, Typography } from 'antd';
import './OntologyBasedSummarizer.scss';
import Icon from '@ant-design/icons';
import { Dispatch } from 'redux';
import {
  fetchESGSummary,
  fetchPDFFile,
  fetchPDFList,
  fetchTopicsList,
} from '../../redux/actions/esg';
import { ENVIRONMENTAL_TOPIC } from '../../utils/constants';
import { copyRichTextToClipboard } from '../../utils/helpers';
import SummaryOutput from '../SummaryOutput/SummaryOutput';
import SummaryForm from '../SummaryForm/SummaryForm';
import { IEsgSummaryRequest, ITopic } from '../../models/esg-summary.model';
import { IOntologyBasedSummarizer } from '../../models/esg-components.model';

const { Title } = Typography;

const OntologyBasedSummarizer = (props: IOntologyBasedSummarizer) => {
  const {
    topics,
    isFetchingTopicsList,
    isFetchingPDFList,
    documentsList,
    isFetchingESGSummary,
    fetchESGSummaryProp,
    summary,
    fetchPDFFileProp,
    isFetchingPDFFile,
    fetchPDFListProp,
  } = props;

  const [selectedDocumentID, setSelectedDocumentID] = useState<string>('');
  const [summarizedDocumentTitle, setSummarizedDocumentTitle] =
    useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [summaryOutputHTML, setSummaryOutputHTML] = useState<
    HTMLDivElement | any
  >(null);
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);

  const fetchTopics = async () => {
    const { fetchTopicsListProp } = props;
    const fetchedTopics = await fetchTopicsListProp();
    // Currently support environmental topic only
    const environmentalTopic = fetchedTopics.find(
      (topic: ITopic) => topic.name === ENVIRONMENTAL_TOPIC
    );
    setSelectedSubtopics(environmentalTopic.subtopics);
  };

  useEffect(() => {
    fetchTopics();
    fetchPDFListProp();
  }, []);

  const handleSummaryHTML = (summaryHTMLRef: HTMLDivElement | any) => {
    setSummaryOutputHTML(summaryHTMLRef);
  };

  const handleCopyButtonClick = async () => {
    copyRichTextToClipboard(
      summaryOutputHTML,
      (err: any) => err && message.error(err)
    )
      .then(message.success('Text copied to clipboard successfully!', 10))
      .catch((err) => console.log(err));
  };

  const viewOriginalPDF = async () => {
    const fetchedFile = await fetchPDFFileProp(selectedDocumentID);
    const pdfFile = new Blob([fetchedFile], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(pdfFile);
    window.open(fileURL);
  };
  return (
    <div className="ontology-summarizer-wrapper">
      <Row>
        <Col span={12}>
          <Title level={3}>ESG Report Summarization</Title>
        </Col>
        <Col span={12}>
          <div className="buttons-container">
            <Button
              onClick={viewOriginalPDF}
              loading={isFetchingPDFFile}
              rel="noreferrer"
              target="_blank"
              type="link"
              disabled={!selectedDocumentID}
              className="action-link-button"
            >
              {!isFetchingPDFFile && <Icon type="eye" />}
              View Original
            </Button>
            <Button
              type="link"
              disabled={!summaryOutputHTML || isFetchingESGSummary}
              className="action-link-button"
              onClick={handleCopyButtonClick}
            >
              <Icon type="copy" /> Copy
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <SummaryForm
            topics={topics}
            isFetchingTopicsList={isFetchingTopicsList}
            documentsList={documentsList}
            isFetchingPDFList={isFetchingPDFList}
            selectedDocumentID={selectedDocumentID}
            setSelectedDocumentID={setSelectedDocumentID}
            selectedSubtopics={selectedSubtopics}
            setSelectedSubtopics={setSelectedSubtopics}
            query={query}
            setQuery={setQuery}
            isFetchingESGSummary={isFetchingESGSummary}
            fetchESGSummary={fetchESGSummaryProp}
            setSummarizedDocumentTitle={setSummarizedDocumentTitle}
          />
        </Col>
        <Col span={18}>
          <SummaryOutput
            summary={summary}
            isFetchingESGSummary={isFetchingESGSummary}
            handleSummaryHTML={handleSummaryHTML}
            summarizedDocumentTitle={summarizedDocumentTitle}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ esg }: any) => ({
  isFetchingTopicsList: esg.isFetchingTopicsList,
  topics: esg.topics,
  isFetchingPDFList: esg.isFetchingPDFList,
  documentsList: esg.documentsList,
  isFetchingESGSummary: esg.isFetchingESGSummary,
  summary: esg.summary,
  isFetchingPDFFile: esg.isFetchingPDFFile,
  file: esg.file,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchTopicsListProp: () => dispatch(fetchTopicsList()),
  fetchPDFListProp: () => dispatch(fetchPDFList()),
  fetchESGSummaryProp: (params: IEsgSummaryRequest) =>
    dispatch(fetchESGSummary(params)),
  fetchPDFFileProp: (id: string) => dispatch(fetchPDFFile(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OntologyBasedSummarizer);

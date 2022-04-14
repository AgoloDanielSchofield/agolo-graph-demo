import { Card, Col, Row } from 'antd';
import { ISummaryForm } from '../../models/esg-components.model';
import { ENVIRONMENTAL_TOPIC } from '../../utils/constants';
import OntologySelection from '../OntologySelection/OntologySelection';
import PDFSelectionList from '../PDFSelectionList/PDFSelectionList';
import QueryInput from '../QueryInput';
import SummarizeButton from '../SummarizeButton/SummarizeButton';
import './SummaryForm.scss';

const SummaryForm = (props: ISummaryForm) => {
  const {
    topics,
    isFetchingTopicsList,
    isFetchingPDFList,
    documentsList,
    setSelectedDocumentID,
    selectedDocumentID,
    query,
    setQuery,
    selectedSubtopics,
    setSelectedSubtopics,
    isFetchingESGSummary,
    fetchESGSummary,
    setSummarizedDocumentTitle,
  } = props;
  const onSummarizeBtnClick = () => {
    const parsedDocument = documentsList.find(
      (document) => document.id === selectedDocumentID
    );
    const payload = {
      query,
      topic: ENVIRONMENTAL_TOPIC,
      subtopics: [...selectedSubtopics],
      id: selectedDocumentID,
    };
    fetchESGSummary(payload);
    setSummarizedDocumentTitle(parsedDocument?.name || '');
  };
  return (
    <Card className="summary-form-container">
      <Row className="summary-form" justify="start">
        <Col span={24}>
          <PDFSelectionList
            isFetchingPDFList={isFetchingPDFList}
            documentsList={documentsList}
            setSelectedDocumentID={setSelectedDocumentID}
          />
        </Col>
        <Col span={24}>
          <OntologySelection
            topics={topics}
            isFetchingTopicsList={isFetchingTopicsList}
            setSelectedSubtopics={setSelectedSubtopics}
          />
        </Col>

        <Col span={24}>
          <QueryInput
            placeholder="Enter search item"
            title="Include Search Terms (Optional):"
            query={query}
            setQuery={setQuery}
          />
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 2 }}
          lg={{ span: 24, offset: 0 }}
          xl={{ span: 24, offset: 0 }}
        >
          <SummarizeButton
            summarizeBtnDisabled={!selectedDocumentID}
            onSummarizeBtnClick={onSummarizeBtnClick}
            summarizeBtnLoading={isFetchingESGSummary}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SummaryForm;

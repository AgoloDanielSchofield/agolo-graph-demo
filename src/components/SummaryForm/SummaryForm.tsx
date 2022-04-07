import { Card } from 'antd';
import { ISummaryForm } from '../../models/esg-components.model';
import { ENVIRONMENTAL_TOPIC } from '../../utils/constants';
import OntologySelection from '../OntologySelection/OntologySelection';
import PDFSelectionList from '../PDFSelectionList/PDFSelectionList';
import QueryInput from '../QueryInput';
import SummarizeButton from '../SummarizeButton/SummarizeButton';

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
    <Card>
      <PDFSelectionList
        isFetchingPDFList={isFetchingPDFList}
        documentsList={documentsList}
        setSelectedDocumentID={setSelectedDocumentID}
      />
      <OntologySelection
        topics={topics}
        isFetchingTopicsList={isFetchingTopicsList}
        setSelectedSubtopics={setSelectedSubtopics}
      />
      <QueryInput
        placeholder="Enter search item"
        title="Include Search Terms (Optional):"
        query={query}
        setQuery={setQuery}
      />
      <SummarizeButton
        summarizeBtnDisabled={!selectedDocumentID}
        onSummarizeBtnClick={onSummarizeBtnClick}
        summarizeBtnLoading={isFetchingESGSummary}
      />
    </Card>
  );
};

export default SummaryForm;

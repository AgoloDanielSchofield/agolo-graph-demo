import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import './App.less';
import OntologyBasedSummarizer from './components/OntologyBasedSummarizer/OntologyBasedSummarizer';
import BaseLayout from './Layout/BaseLayout/BaseLayout';
import OBSDocsUpload from './components/UploadDocument/OBSDocsUpload';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate replace to="/summarizer" />} />
      <Route
        path="/summarizer"
        element={<BaseLayout component={<OntologyBasedSummarizer />} />}
      />
      <Route
        path="/upload"
        element={<BaseLayout component={<OBSDocsUpload />} />}
      />
    </Routes>
  </BrowserRouter>
);
export default App;

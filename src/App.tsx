import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.scss';
import OntologyBasedSummarizer from './components/OntologyBasedSummarizer/OntologyBasedSummarizer';
import OBSDocsUpload from './components/UploadDocument/OBSDocsUpload';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<OntologyBasedSummarizer />} />
      <Route path="/upload" element={<OBSDocsUpload />} />
    </Routes>
  </BrowserRouter>
);
export default App;

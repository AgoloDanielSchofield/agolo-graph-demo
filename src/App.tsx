import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.scss';
import OntologyBasedSummarizer from './components/OntologyBasedSummarizer/OntologyBasedSummarizer';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<OntologyBasedSummarizer />} />
    </Routes>
  </BrowserRouter>
);
export default App;

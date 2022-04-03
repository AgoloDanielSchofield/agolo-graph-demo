import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';

const root = document.getElementById('root')!;
const ReactRoot = ReactDOMClient.createRoot(root);

ReactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

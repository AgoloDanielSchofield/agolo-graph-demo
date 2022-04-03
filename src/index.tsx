import React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOMClient from 'react-dom/client';
import initStore from './config/store';
import './index.css';
import App from './App';

const root = document.getElementById('root')!;
const ReactRoot = ReactDOMClient.createRoot(root);

const store = initStore();

ReactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

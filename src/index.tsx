import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import initStore from './config/store';
import './index.css';
import App from './App';

const store = initStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import esg from './esg';

const rootReducer = combineReducers({
  esg,
  loadingBar,
});

export default rootReducer;

import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import thunkMiddleware from 'redux-thunk';
import reducer from '../redux/reducers';

const defaultMiddlewares: any = [
  thunkMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
];
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const middleWareEnhancer = applyMiddleware(...defaultMiddlewares);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialize = (initialState?: any) =>
  createStore(reducer, initialState, composeEnhancers(middleWareEnhancer));

export default initialize;

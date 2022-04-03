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
const composedMiddlewares = (middlewares: never[]) =>
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares))
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: any, middlewares: any = []) =>
  createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;

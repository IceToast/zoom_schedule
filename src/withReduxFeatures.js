import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import withProvider from './withProvider';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import axios from 'axios';

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/** Use Redux compose, if browser doesn't have Redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: createDriver(axios.create({
    baseURL: 'https://zoom.icetoast.cloud/api',
    withCredentials: true
  })),
});

const reducers = combineReducers({
  requests: requestsReducer,
});

/** Create Redux store with root reducer and middleware included */
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...requestsMiddleware))
);

/**
 * Create HOC, which wraps given Component with Redux Provider
 */
export default withProvider({store, Provider});

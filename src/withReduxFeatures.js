import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider as StoreProvider } from 'react-redux';
import withProvider from './withProvider';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import axios from 'axios';
import rootReducers from './reducers';

const setupStore = initialState => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(
      axios.create({
        baseURL: 'https://zoom.icetoast.cloud/api',
        withCredentials: true,
      })
    ),
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    ...rootReducers,
  });

  return configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(requestsMiddleware),
  });
};

/**
 * Create HOC, which wraps given Component with Redux Provider
 */

const store = setupStore();
export default withProvider({ store, StoreProvider });

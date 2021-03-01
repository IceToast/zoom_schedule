import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers';
import withProvider from './withProvider';

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/** Use Redux compose, if browser doesn't have Redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initState = {
  week: {
    days: [
      {name: 'Monday', meetings: []},
      {name: 'Tuesday', meetings: []},
      {name: 'Wednesday', meetings: []},
      {name: 'Thursday', meetings: []},
      {name: 'Friday', meetings: []},
      {name: 'Saturday', meetings: []},
    ],
  },
  meetings: {
    meetingRooms: [],
  },
};

/** Create Redux store with root reducer and middleware included */
export const store = createStore(
  rootReducer,
  initState,
  composeEnhancers(applyMiddleware(promise))
);

/**
 * Create HOC, which wraps given Component with Redux Provider
 */
export default withProvider({store, Provider});

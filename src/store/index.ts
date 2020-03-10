import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import loadDataToStateMiddleware from '../middleware/loadDataToState';

import rootReducer from '../reducers/index';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, loadDataToStateMiddleware))
);

export default store;

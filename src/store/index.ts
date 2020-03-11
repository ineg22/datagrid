import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import loadDataToStateMiddleware from '../middleware/loadDataToState';
import transformPersons from '../middleware/transformPersons';

import rootReducer from '../reducers/index';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, loadDataToStateMiddleware, transformPersons)
  )
);

export default store;

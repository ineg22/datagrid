import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import loadDataToStateMiddleware from '../middleware/loadDataToState';
import transformPersons from '../middleware/transformPersons';
import setSortMiddleware from '../middleware/setSortMiddleware';
import setEnumFilterParamMiddleware from '../middleware/setEnumFilterParamMiddleware';
import setSelectedRawsMiddleware from '../middleware/setSelectedRawsMiddleware';

import rootReducer from '../reducers/index';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, loadDataToStateMiddleware, transformPersons, setSortMiddleware, setEnumFilterParamMiddleware, setSelectedRawsMiddleware)
  )
);

export default store;

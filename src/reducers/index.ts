import { ActionTypes } from '../types/actionTypes';
import { StateType } from '../types/index';
import loadFakeData from './loadFakeData';
import {
  LOADING_END,
  LOADING_START,
  SHOW_ERROR,
  CHANGE_ASYNC,
  CHANGE_VIRTUALIZE,
  CHANGE_COUNT,
  LOAD_OFFLINE,
} from '../constants/action-types';

const tableParamsString = window.localStorage.getItem('tableParams');
const tableParams = tableParamsString ? JSON.parse(tableParamsString) : null;

const initialState: StateType = {
  persons: [],
  isLoading: false,
  error: null,
  isAsync: tableParams.isAsync || false,
  isVirtualize: tableParams.isVirtualize || false,
  rawCount: tableParams.rawCount || 200,
};

function rootReducer(state = initialState, action: ActionTypes): StateType {
  switch (action.type) {
    case LOADING_END:
      return { ...state, isLoading: false, persons: action.payload };
    case LOADING_START:
      return { ...state, isLoading: true };
    case SHOW_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case CHANGE_ASYNC:
      return { ...state, isAsync: action.payload };
    case CHANGE_VIRTUALIZE:
      return { ...state, isVirtualize: action.payload };
    case CHANGE_COUNT:
      return { ...state, rawCount: action.payload };
    case LOAD_OFFLINE:
      return { ...state, persons: loadFakeData(action.payload) };
    default:
      return state;
  }
}

export default rootReducer;

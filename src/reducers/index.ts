import { ActionTypes } from '../types/actionTypes';
import { StateType } from '../types/index';
import {
  LOADING_END,
  LOADING_START,
  SHOW_ERROR,
} from '../constants/action-types';

const initialState: StateType = {
  persons: [],
  isLoading: false,
  error: null,
};

function rootReducer(state = initialState, action: ActionTypes): StateType {
  switch (action.type) {
    case LOADING_END:
      return { ...state, isLoading: false, persons: action.payload };
    case LOADING_START:
      return { ...state, isLoading: true };
    case SHOW_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default rootReducer;

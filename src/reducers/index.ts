import { ActionTypes } from '../types/actionTypes';
import { StateType } from '../types/index';
import {
  LOADING_END,
  LOADING_START,
  SHOW_ERROR,
  CHANGE_ASYNC,
  CHANGE_VIRTUALIZE,
  CHANGE_COUNT,
  CHANGE_VISIBILITY,
  CHANGE_FILTER_VALUE,
  CHANGE_FILTERED_COLUMNS,
  SET_TRANSFORMED_PERSONS,
  APPLY_FILTER,
  SET_SORT,
} from '../constants/action-types';

const tableParamsString = window.localStorage.getItem('tableParams');
const tableParams = tableParamsString ? JSON.parse(tableParamsString) : null;

const initialState: StateType = {
  persons: [],
  transformed: [],
  isLoading: false,
  error: null,
  isAsync: tableParams ? tableParams.isAsync : false,
  isVirtualize: tableParams ? tableParams.isVirtualize : false,
  rawCount: tableParams ? tableParams.rawCount : 20,
  columnVisibility: tableParams
    ? tableParams.columnVisibility
    : new Array(7).fill(true),
  filteredColumns: tableParams
    ? tableParams.filteredColumns
    : new Array(7).fill(false),
  filterValue: tableParams ? tableParams.filterValue : '',
  filterApplied: tableParams ? tableParams.filterValue : false,
  sortedParams: tableParams ? tableParams.sortedParams : [],
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
    case CHANGE_VISIBILITY:
      return { ...state, columnVisibility: action.payload };
    case CHANGE_FILTERED_COLUMNS:
      return { ...state, filteredColumns: action.payload };
    case CHANGE_FILTER_VALUE:
      return { ...state, filterValue: action.payload };
    case SET_TRANSFORMED_PERSONS:
      return { ...state, transformed: action.payload };
    case APPLY_FILTER:
      return { ...state, filterApplied: action.payload };
    case SET_SORT:
      return { ...state, sortedParams: action.payload };
    default:
      return state;
  }
}

export default rootReducer;

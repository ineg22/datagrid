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
  SET_SORT_PARAMS,
  SET_TRANSFORMED,
  SET_ENUM_FILTER_PARAMS,
  SET_SELECTED_RAWS,
  SET_VISIBLE_ROWS,
} from '../constants/action-types';
import { initialEnumFilterParams, STRING_COLUMNS } from '../constants/columns';

const tableParamsString = window.localStorage.getItem('tableParams');
const tableParams = tableParamsString ? JSON.parse(tableParamsString) : null;

const initialState: StateType = {
  persons: [],
  transformed: null,
  isLoading: false,
  error: null,
  selectedRaws: tableParams ? tableParams.selectedRaws : [],
  isAsync: tableParams ? tableParams.isAsync : false,
  isVirtualize: tableParams ? tableParams.isVirtualize : false,
  rawCount: tableParams ? tableParams.rawCount : 1000,
  columnVisibility: tableParams ? tableParams.columnVisibility : new Array(7).fill(true),
  filteredColumns: tableParams ? tableParams.filteredColumns : STRING_COLUMNS,
  filterValue: tableParams ? tableParams.filterValue : '',
  sortedParams: tableParams ? tableParams.sortedParams : [],
  enumFilterParams: tableParams ? tableParams.enumFilterParams : initialEnumFilterParams,
  visibleRows: [0, 30],
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
    case SET_SORT_PARAMS:
      return { ...state, sortedParams: action.payload };
    case SET_TRANSFORMED:
      return { ...state, transformed: action.payload };
    case SET_ENUM_FILTER_PARAMS:
      return { ...state, enumFilterParams: action.payload };
    case SET_SELECTED_RAWS:
      return { ...state, selectedRaws: action.payload };
    case SET_VISIBLE_ROWS:
      return { ...state, visibleRows: action.payload };
    default:
      return state;
  }
}

export default rootReducer;

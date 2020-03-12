import {
  LOADING_END,
  LOADING_START,
  SHOW_ERROR,
  CHANGE_ASYNC,
  CHANGE_VIRTUALIZE,
  CHANGE_COUNT,
  LOAD_OFFLINE,
  CHANGE_VISIBILITY,
  CHANGE_FILTER_VALUE,
  CHANGE_FILTERED_COLUMNS,
  TRANSFORM_PERSONS,
  SET_TRANSFORMED_BY_SORT,
  SET_TRANSFORMED_BY_FILTER,
  APPLY_FILTER,
  SET_SORT_PARAMS,
  SET_SORT_LIGHT,
  SET_TRANSFORMED,
} from '../constants/action-types';

import { ActionTypes } from '../types/actionTypes';
import { PersonType, SortBy } from '../types/index';

export function endLoading(payload: Array<PersonType>): ActionTypes {
  return { type: LOADING_END, payload };
}
export function startLoading(): ActionTypes {
  return { type: LOADING_START };
}
export function showError(payload: Error | null): ActionTypes {
  return { type: SHOW_ERROR, payload };
}
export function changeAsync(payload: boolean): ActionTypes {
  return { type: CHANGE_ASYNC, payload: payload };
}
export function changeVirtualize(payload: boolean): ActionTypes {
  return { type: CHANGE_VIRTUALIZE, payload: payload };
}
export function changeCount(payload: number): ActionTypes {
  return { type: CHANGE_COUNT, payload: payload };
}
export function loadOffline(payload: number): ActionTypes {
  return { type: LOAD_OFFLINE, payload: payload };
}
export function changeVisibility(payload: Array<boolean>): ActionTypes {
  return { type: CHANGE_VISIBILITY, payload: payload };
}
export function changeFilterValue(payload: string): ActionTypes {
  return { type: CHANGE_FILTER_VALUE, payload: payload };
}
export function changeFilteredColumns(payload: Array<boolean>): ActionTypes {
  return { type: CHANGE_FILTERED_COLUMNS, payload: payload };
}
export function setTransformedBySort(payload: Array<PersonType>): ActionTypes {
  return { type: SET_TRANSFORMED_BY_SORT, payload: payload };
}
export function setTransformedByFilter(
  payload: Array<PersonType>
): ActionTypes {
  return { type: SET_TRANSFORMED_BY_FILTER, payload: payload };
}
export function setTransformed(payload: Array<PersonType>): ActionTypes {
  return { type: SET_TRANSFORMED, payload: payload };
}
export function transformPersons(): ActionTypes {
  return { type: TRANSFORM_PERSONS };
}
export function applyFilters(payload: boolean): ActionTypes {
  return { type: APPLY_FILTER, payload: payload };
}
export function setSortParams(payload: Array<SortBy>): ActionTypes {
  return { type: SET_SORT_PARAMS, payload: payload };
}
export function setSortLight(payload: [number, boolean]): ActionTypes {
  return { type: SET_SORT_LIGHT, payload: payload };
}

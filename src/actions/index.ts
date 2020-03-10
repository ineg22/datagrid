import {
  LOADING_END,
  LOADING_START,
  SHOW_ERROR,
  CHANGE_ASYNC,
  CHANGE_VIRTUALIZE,
  CHANGE_COUNT,
  LOAD_OFFLINE,
  CHANGE_VISIBILITY,
} from '../constants/action-types';
import { ActionTypes } from '../types/actionTypes';
import { PersonType } from '../types/index';

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

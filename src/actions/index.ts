import {
  LOADING_END,
  LOADING_START,
  SHOW_ERROR,
} from '../constants/action-types';
import { ActionTypes } from '../types/actionTypes';
import { PersonType } from '../types/index';

export function endLoading(payload: Array<PersonType>): ActionTypes {
  return { type: LOADING_END, payload };
}

export function startLoading(): ActionTypes {
  return { type: LOADING_START };
}

export function showError(payload: Error): ActionTypes {
  return { type: SHOW_ERROR, payload };
}

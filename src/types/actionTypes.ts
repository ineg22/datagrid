import { ThunkAction } from 'redux-thunk';
import { PersonType, StateType } from './index';
import {
  DELETE_PERSON,
  LOADING_END,
  LOADING_START,
  SHOW_ERROR,
} from '../constants/action-types';

interface DeletePersonActionType {
  type: typeof DELETE_PERSON;
  payload: PersonType;
}

interface LoadingEndActionType {
  type: typeof LOADING_END;
  payload: Array<PersonType>;
}

interface LoadingStartActionType {
  type: typeof LOADING_START;
}

interface ShowErrorActionType {
  type: typeof SHOW_ERROR;
  payload: Error;
}

export type ActionTypes =
  | DeletePersonActionType
  | LoadingEndActionType
  | LoadingStartActionType
  | ShowErrorActionType;

export type thunkLoadDataActionType<R> = ThunkAction<
  R,
  StateType,
  unknown,
  ActionTypes
>;

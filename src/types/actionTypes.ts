import { ThunkAction } from 'redux-thunk';
import { PersonType, StateType } from './index';
import {
  DELETE_PERSON,
  LOADING_END,
  LOADING_START,
  LOAD_OFFLINE,
  SHOW_ERROR,
  CHANGE_ASYNC,
  CHANGE_VIRTUALIZE,
  CHANGE_COUNT,
  CHANGE_VISIBILITY,
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
  payload: Error | null;
}
interface ChangeAsyncActionType {
  type: typeof CHANGE_ASYNC;
  payload: boolean;
}
interface ChangeVirtualizeActionType {
  type: typeof CHANGE_VIRTUALIZE;
  payload: boolean;
}
interface ChangeCountActionType {
  type: typeof CHANGE_COUNT;
  payload: number;
}
interface LoadOfflineActionType {
  type: typeof LOAD_OFFLINE;
  payload: number;
}
interface ChangeVisibilityActionType {
  type: typeof CHANGE_VISIBILITY;
  payload: Array<boolean>;
}

export type ActionTypes =
  | DeletePersonActionType
  | LoadingEndActionType
  | LoadingStartActionType
  | ShowErrorActionType
  | ChangeAsyncActionType
  | ChangeVirtualizeActionType
  | ChangeCountActionType
  | LoadOfflineActionType
  | ChangeVisibilityActionType;

export type thunkLoadDataActionType<R> = ThunkAction<
  R,
  StateType,
  unknown,
  ActionTypes
>;

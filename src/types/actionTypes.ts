import { ThunkAction } from 'redux-thunk';
import { PersonType, StateType, SortBy } from './index';
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
  CHANGE_FILTER_VALUE,
  CHANGE_FILTERED_COLUMNS,
  TRANSFORM_PERSONS,
  SET_TRANSFORMED_PERSONS,
  APPLY_FILTER,
  SET_SORT,
  SET_SORT_LIGHT,
} from '../constants/action-types';

interface DeletePersonActionType {
  type: typeof DELETE_PERSON;
  payload: PersonType;
}
interface LoadingStartActionType {
  type: typeof LOADING_START;
}
interface LoadingEndActionType {
  type: typeof LOADING_END;
  payload: Array<PersonType>;
}
interface LoadOfflineActionType {
  type: typeof LOAD_OFFLINE;
  payload: number;
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
interface ChangeVisibilityActionType {
  type: typeof CHANGE_VISIBILITY;
  payload: Array<boolean>;
}
interface ChangeFilterValueActionType {
  type: typeof CHANGE_FILTER_VALUE;
  payload: string;
}
interface ChangeFilteredColumnsActionType {
  type: typeof CHANGE_FILTERED_COLUMNS;
  payload: Array<boolean>;
}
interface SetTransformedPersonsActionType {
  type: typeof SET_TRANSFORMED_PERSONS;
  payload: Array<PersonType>;
}
interface TransformPersonsActionType {
  type: typeof TRANSFORM_PERSONS;
}
interface ApplyFilterActionType {
  type: typeof APPLY_FILTER;
  payload: boolean;
}
interface SetSortActionType {
  type: typeof SET_SORT;
  payload: Array<SortBy>;
}
interface SetSortLightActionType {
  type: typeof SET_SORT_LIGHT;
  payload: [number, boolean];
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
  | ChangeVisibilityActionType
  | ChangeFilterValueActionType
  | ChangeFilteredColumnsActionType
  | TransformPersonsActionType
  | SetTransformedPersonsActionType
  | ApplyFilterActionType
  | SetSortActionType
  | SetSortLightActionType;

export type thunkLoadDataActionType<R> = ThunkAction<
  R,
  StateType,
  unknown,
  ActionTypes
>;

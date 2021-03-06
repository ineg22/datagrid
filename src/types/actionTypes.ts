import { ThunkAction } from 'redux-thunk';
import { PersonType, StateType, SortBy, EnumFilterParam, SelectRows } from './index';
import {
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
  SET_SORT_PARAMS,
  SET_SORT_LIGHT,
  SET_TRANSFORMED,
  SET_ENUM_FILTER_PARAM,
  SET_ENUM_FILTER_PARAMS,
  SET_SELECTED_ROWS,
  SELECT_ROWS,
  DELETE_SELECTED_ROWS,
  DELETE_CURRENT_ROW,
  SET_VISIBLE_ROWS,
} from '../constants/action-types';

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
interface SetTransformedActionType {
  type: typeof SET_TRANSFORMED;
  payload: Array<PersonType> | null;
}
interface TransformPersonsActionType {
  type: typeof TRANSFORM_PERSONS;
}
interface SetSortActionType {
  type: typeof SET_SORT_PARAMS;
  payload: Array<SortBy>;
}
interface SetSortLightActionType {
  type: typeof SET_SORT_LIGHT;
  payload: [number, boolean];
}
interface SetEnumFilterParamActionType {
  type: typeof SET_ENUM_FILTER_PARAM;
  payload: EnumFilterParam;
}
interface SetEnumFilterParamsActionType {
  type: typeof SET_ENUM_FILTER_PARAMS;
  payload: Array<EnumFilterParam>;
}
interface SetSelectedRowsActionType {
  type: typeof SET_SELECTED_ROWS;
  payload: Array<number>;
}
interface SelectRowsActionType {
  type: typeof SELECT_ROWS;
  payload: SelectRows;
}
interface DeleteSelectedRowsActionType {
  type: typeof DELETE_SELECTED_ROWS;
}
interface DeleteCurrentRowActionType {
  type: typeof DELETE_CURRENT_ROW;
  payload: number;
}
interface SetVisibleRowsActionType {
  type: typeof SET_VISIBLE_ROWS;
  payload: [number, number];
}

export type ActionTypes =
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
  | SetSortActionType
  | SetSortLightActionType
  | SetTransformedActionType
  | SetEnumFilterParamActionType
  | SetEnumFilterParamsActionType
  | SetSelectedRowsActionType
  | SelectRowsActionType
  | DeleteSelectedRowsActionType
  | DeleteCurrentRowActionType
  | SetVisibleRowsActionType;

export type thunkLoadDataActionType<R> = ThunkAction<R, StateType, unknown, ActionTypes>;

import { Middleware } from 'redux';

import { SET_ENUM_FILTER_PARAM } from '../constants/action-types';
import { ActionTypes } from '../types/actionTypes';
import { EnumFilterParam } from '../types/index';
import { setEnumFilterParams } from '../actions/index';

const setEnumFilterParamMiddleware: Middleware = ({ dispatch, getState }) => {
  return function(next) {
    return function(action): ActionTypes {
      if (action.type === SET_ENUM_FILTER_PARAM) {
        const { enumFilterParams } = getState();
        const newParam = action.payload;
        const newEnumFilterParams = enumFilterParams.map((el: EnumFilterParam) => {
          if (el.col === newParam.col) return { ...newParam };
          return el;
        });

        return dispatch(setEnumFilterParams(newEnumFilterParams));
      }
      return next(action);
    };
  };
};

export default setEnumFilterParamMiddleware;

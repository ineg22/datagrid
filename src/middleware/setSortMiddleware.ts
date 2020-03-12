import { Middleware } from 'redux';

import { SET_SORT_LIGHT } from '../constants/action-types';
import { ActionTypes } from '../types/actionTypes';
import { SortBy } from '../types/index';
import { setSort } from '../actions/index';

const getNextState = ({ col, up, down }: SortBy): SortBy => {
  if (up) return { col, up: false, down: false };
  if (down) return { col, up: true, down: false };
  return { col, up: false, down: true };
};

const setSortMiddleware: Middleware = ({ dispatch, getState }) => {
  return function(next) {
    return function(action): ActionTypes {
      if (action.type === SET_SORT_LIGHT) {
        const { sortedParams } = getState();
        const [col, isShift] = action.payload;

        let sortedUp = false;
        let sortedDown = false;
        let alreadyIn = false;

        sortedParams.forEach((el: SortBy) => {
          if (el.col === col) {
            alreadyIn = true;
            if (el.up) sortedUp = true;
            if (el.down) sortedDown = true;
          }
        });

        // without SHIFT
        if (!isShift) {
          const nextState = getNextState({
            col,
            up: sortedUp,
            down: sortedDown,
          });
          if (nextState.up || nextState.down) {
            return dispatch(setSort([nextState]));
          }
          return dispatch(setSort([]));
        }

        // with SHIFT
        const newSortedParams: Array<SortBy> = [];

        sortedParams.forEach((el: SortBy) => {
          if (el.col === col) {
            const nextState = getNextState({
              col: el.col,
              up: el.up,
              down: el.down,
            });
            if (nextState.up || nextState.down) {
              newSortedParams.push(nextState);
            }
          } else {
            newSortedParams.push({ ...el });
          }
        });

        if (!alreadyIn) {
          newSortedParams.push({ col, up: false, down: true });
        }

        return dispatch(setSort(newSortedParams));
      }
      return next(action);
    };
  };
};

export default setSortMiddleware;

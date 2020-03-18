import { Middleware } from 'redux';

import { SELECT_ROWS } from '../constants/action-types';
import { PersonType } from '../types/index';
import { ActionTypes } from '../types/actionTypes';
import { setSelectedRows } from '../actions/index';

const setSelectedRowsMiddleware: Middleware = ({ dispatch, getState }) => {
  return function(next) {
    return function(action): ActionTypes {
      if (action.type === SELECT_ROWS) {
        const { id, ctrl, shift } = action.payload;
        const { selectedRows, persons, transformed } = getState();
        let newSelectedRows: Array<number> = [];
        if (!ctrl && !shift) {
          if (selectedRows.length === 1 && selectedRows[0] === id) {
            newSelectedRows = [];
          } else {
            newSelectedRows = [id];
          }
        } else if (ctrl && !shift) {
          const alreadyIn = selectedRows.includes(id);

          newSelectedRows = alreadyIn ? selectedRows.filter((el: number) => el !== id) : [...selectedRows, id];
        } else if (shift) {
          const activePersons = transformed ? transformed : persons;
          const activePersonsId = activePersons.map((el: PersonType) => el.id);
          const lastAddedIndex = activePersonsId.indexOf(selectedRows[selectedRows.length - 1]);
          const currentAddedIndex = activePersonsId.indexOf(id);
          let shiftAdded: Array<number> = [];
          if (currentAddedIndex > lastAddedIndex) {
            shiftAdded = activePersonsId.slice(lastAddedIndex, currentAddedIndex + 1);
          } else if (currentAddedIndex < lastAddedIndex) {
            shiftAdded = activePersonsId.slice(currentAddedIndex, lastAddedIndex + 1);
          } else {
            shiftAdded = [currentAddedIndex];
          }
          selectedRows.forEach((el: number) => {
            if (!shiftAdded.includes(el)) newSelectedRows.push(el);
          });
          newSelectedRows = [...newSelectedRows, ...shiftAdded];
        }
        return dispatch(setSelectedRows(newSelectedRows));
      }
      return next(action);
    };
  };
};

export default setSelectedRowsMiddleware;

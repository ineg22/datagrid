import { Middleware } from 'redux';

import { SELECT_RAWS } from '../constants/action-types';
import { PersonType } from '../types/index';
import { ActionTypes } from '../types/actionTypes';
import { setSelectedRaws } from '../actions/index';

const setSelectedRawsMiddleware: Middleware = ({ dispatch, getState }) => {
  return function(next) {
    return function(action): ActionTypes {
      if (action.type === SELECT_RAWS) {
        const { id, ctrl, shift } = action.payload;
        const { selectedRaws, persons, transformed } = getState();
        let newSelectedRaws: Array<number> = [];
        if (!ctrl && !shift) {
          newSelectedRaws.push(id);
        } else if (ctrl && !shift) {
          const alreadyIn = selectedRaws.includes(id);

          newSelectedRaws = alreadyIn ? selectedRaws.filter((el: number) => el !== id) : [...selectedRaws, id];
        } else if (shift) {
          const activePersons = transformed ? transformed : persons;
          const activePersonsId = activePersons.map((el: PersonType) => el.id);
          const lastAddedIndex = activePersonsId.indexOf(selectedRaws[selectedRaws.length - 1]);
          const currentAddedIndex = activePersonsId.indexOf(id);
          let shiftAdded: Array<number> = [];
          if (currentAddedIndex > lastAddedIndex) {
            shiftAdded = activePersonsId.slice(lastAddedIndex, currentAddedIndex + 1);
          } else if (currentAddedIndex < lastAddedIndex) {
            shiftAdded = activePersonsId.slice(currentAddedIndex, lastAddedIndex + 1);
          } else {
            shiftAdded = [currentAddedIndex];
          }
          selectedRaws.forEach((el: number) => {
            if (!shiftAdded.includes(el)) newSelectedRaws.push(el);
          });
          newSelectedRaws = [...newSelectedRaws, ...shiftAdded];
        }
        return dispatch(setSelectedRaws(newSelectedRaws));
      }
      return next(action);
    };
  };
};

export default setSelectedRawsMiddleware;

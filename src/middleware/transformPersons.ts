import { Middleware } from 'redux';

import { TRANSFORM_PERSONS } from '../constants/action-types';
import { COLUMN_TITLES } from '../constants/columns';
import { PersonType } from '../types/index';
import { ActionTypes } from '../types/actionTypes';
import { setTransformedPersons } from '../actions/index';

type PersonKeys = keyof PersonType;

const transformPersons: Middleware = ({ dispatch, getState }) => {
  return function(next) {
    return function(action): ActionTypes {
      if (action.type === TRANSFORM_PERSONS) {
        const { filteredColumns, filterValue, persons } = getState();
        const filteredColumnNames: Array<PersonKeys> = COLUMN_TITLES.filter(
          (_, i) => filteredColumns[i]
        );

        const transformedPersons = persons.filter((el: PersonType) => {
          let isSatisfy = false;

          filteredColumnNames.map((title: PersonKeys) => {
            const rawSatisfy = el[title]
              .toString()
              .trim()
              .toLowerCase()
              .includes(filterValue);

            if (rawSatisfy) isSatisfy = true;
          });

          return isSatisfy;
        });

        console.log(transformedPersons);
        return dispatch(setTransformedPersons(transformedPersons));
      }
      return next(action);
    };
  };
};

export default transformPersons;

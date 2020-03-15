import faker from 'faker';
import { Middleware } from 'redux';

import { ENUM_MASK } from '../constants/columns';
import { LOAD_OFFLINE, DELETE_SELECTED_RAWS, DELETE_CURRENT_RAW } from '../constants/action-types';
import { PersonType } from '../types/index';
import { ActionTypes } from '../types/actionTypes';
import { endLoading } from '../actions/index';

const makeFake = (idx: number): PersonType => {
  const genders = ['Female', 'Male'];

  return {
    id: idx,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    gender: faker.random.arrayElement(genders),
    shirt_size: faker.random.arrayElement(ENUM_MASK),
    app_name: faker.commerce.productName(),
    app_version: Number(faker.finance.amount(0.1, 5.0, 2)) >= 1,
  };
};

const loadFakeData = (count: number): Array<PersonType> => {
  faker.seed(count);

  return [...new Array(count)].map((_, idx) => makeFake(idx));
};

const loadDataToStateMiddleware: Middleware = ({ dispatch, getState }) => {
  return function(next) {
    return function(action): ActionTypes {
      if (action.type === LOAD_OFFLINE) {
        return dispatch(endLoading(loadFakeData(action.payload)));
      }
      if (action.type === DELETE_SELECTED_RAWS) {
        const { persons, selectedRaws } = getState();
        const newPersons = persons.filter((el: PersonType) => {
          if (selectedRaws.includes(el.id)) return false;
          return true;
        });
        return dispatch(endLoading(newPersons));
      }
      if (action.type === DELETE_CURRENT_RAW) {
        const { persons } = getState();
        const newPersons = persons.filter((el: PersonType) => {
          if (el.id === action.payload) return false;
          return true;
        });
        return dispatch(endLoading(newPersons));
      }
      return next(action);
    };
  };
};

export default loadDataToStateMiddleware;

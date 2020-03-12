import faker from 'faker';
import { Middleware } from 'redux';

import { ENUM_MASK } from '../constants/columns';
import { LOAD_OFFLINE } from '../constants/action-types';
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

const loadDataToStateMiddleware: Middleware = ({ dispatch }) => {
  return function(next) {
    return function(action): ActionTypes {
      if (action.type === LOAD_OFFLINE) {
        return dispatch(endLoading(loadFakeData(action.payload)));
      }
      return next(action);
    };
  };
};

export default loadDataToStateMiddleware;

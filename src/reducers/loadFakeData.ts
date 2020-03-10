import faker from 'faker';
import { PersonType } from '../types/index';

export const makeFake = (idx: number): PersonType => {
  const genders = ['Female', 'Male'];
  const shirt_sizes = ['S', 'L', 'XL', '2XL', '3XL', 'M', 'XS'];

  return {
    id: idx,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    gender: faker.random.arrayElement(genders),
    shirt_size: faker.random.arrayElement(shirt_sizes),
    app_name: faker.commerce.productName(),
    app_version: Number(faker.finance.amount(0.1, 5.0, 2)) >= 1,
  };
};

const loadFakeData = (count: number): Array<PersonType> => {
  faker.seed(count);

  return [...new Array(count)].map((_, idx) => makeFake(idx));
};

export default loadFakeData;

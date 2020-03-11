import { PersonType } from '../types/index';

type PersonKeys = keyof PersonType;

export const COLUMN_TITLES: Array<PersonKeys> = [
  'id',
  'first_name',
  'last_name',
  'gender',
  'shirt_size',
  'app_name',
  'app_version',
];

export const STRING_COLUMNS = [false, true, true, false, false, true, false];

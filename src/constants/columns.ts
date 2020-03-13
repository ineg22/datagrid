import { PersonType } from '../types/index';

type PersonKeys = keyof PersonType;

export const COLUMN_TITLES: Array<PersonKeys> = ['id', 'first_name', 'last_name', 'gender', 'shirt_size', 'app_name', 'app_version'];

export const STRING_COLUMNS = [false, true, true, false, false, true, false];
export const NUMBER_COLUMNS = [true, false, false, false, false, false, false];
export const ENUM_COLUMNS = [false, false, false, false, true, false, false];

export const COLUMNS_WITH_SORT = [true, true, true, true, true, true, false];
export const ENUM_FILTER_COLUMNS = [false, false, false, true, true, false, true];

export const ENUM_MASK = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

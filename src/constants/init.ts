import { MUSK_MAP } from './columns';
import { EnumFilterParam } from '../types/index';

export const initialEnumFilterParams: Array<EnumFilterParam> = [];
MUSK_MAP.forEach((el, i) => {
  if (el) {
    const val: Array<boolean> = new Array(el.length).fill(true);
    initialEnumFilterParams.push({ col: i, val });
  }
});

const urlParams = new URLSearchParams(window.location.search);
export const stringFilterValue = urlParams.get('stringFilterValue');
const gender = urlParams.get('gender')?.split(' ');
const shirtSize = urlParams.get('shirtSize')?.split(' ');
const isStable = urlParams.get('isStable')?.split(' ');

export const isEnumQuery = Boolean(gender || shirtSize || isStable);

export const queryEnumValues: Array<EnumFilterParam> = [];
['', '', '', gender, shirtSize, '', isStable].forEach((el, i) => {
  if (el) {
    const val: Array<boolean> = new Array(MUSK_MAP[i].length).fill(false).map((_, j) => {
      if (el.includes(MUSK_MAP[i][j])) return true;
      return false;
    });
    queryEnumValues.push({ col: i, val });
  } else if (MUSK_MAP[i]) {
    const val: Array<boolean> = new Array(MUSK_MAP[i].length).fill(true);
    queryEnumValues.push({ col: i, val });
  }
});

import { Middleware } from 'redux';

import { TRANSFORM_PERSONS } from '../constants/action-types';
import { COLUMN_TITLES, NUMBER_COLUMNS, ENUM_COLUMNS, ENUM_MASK, MUSK_MAP, STRING_COLUMNS } from '../constants/columns';
import { PersonType, SortBy, EnumFilterParam } from '../types/index';
import { ActionTypes } from '../types/actionTypes';
import { setTransformed } from '../actions/index';

type PersonKeys = keyof PersonType;

const transformPersons: Middleware = ({ dispatch, getState }) => {
  return function(next) {
    return function(action): ActionTypes {
      const sortPersons = (persons: Array<PersonType>): Array<PersonType> => {
        const { sortedParams } = getState();

        const firstNonZeroValue = (acc: number, el: number): number => (acc ? acc : el);

        const fieldSorter = (fields: Array<SortBy>) => (a: PersonType, b: PersonType): number =>
          fields
            .map(field => {
              const dir = field.up ? -1 : 1;
              const sortByTitle = COLUMN_TITLES[field.col];
              const isNumber = NUMBER_COLUMNS[field.col];
              const isEnum = ENUM_COLUMNS[field.col];

              if (isNumber) {
                if (a[sortByTitle] > b[sortByTitle]) return dir;
                if (a[sortByTitle] < b[sortByTitle]) return -dir;
                return 0;
              } else if (isEnum) {
                const enumA = ENUM_MASK.indexOf(a[sortByTitle].toString());
                const enumB = ENUM_MASK.indexOf(b[sortByTitle].toString());
                if (enumA > enumB) return dir;
                if (enumA < enumB) return -dir;
                return 0;
              } else {
                const stringA = a[sortByTitle].toString().toLowerCase();
                const stringB = b[sortByTitle].toString().toLowerCase();
                if (stringA > stringB) return dir;
                if (stringA < stringB) return -dir;
                return 0;
              }
            })
            .reduce(firstNonZeroValue, 0);

        const sortedPersons = persons.map((el: PersonType) => ({ ...el })).sort(fieldSorter(sortedParams));

        return sortedPersons;
      };

      const filterPersons = (persons: Array<PersonType>): Array<PersonType> => {
        const { filteredColumns, filterValue } = getState();

        const filteredColumnNames: Array<PersonKeys> = COLUMN_TITLES.filter((_, i) => filteredColumns[i]);

        const transformedPersons = persons.filter((el: PersonType) => {
          let isSatisfy = false;

          filteredColumnNames.forEach((title: PersonKeys) => {
            const rawSatisfy = el[title]
              .toString()
              .trim()
              .toLowerCase()
              .includes(filterValue);

            if (rawSatisfy) isSatisfy = true;
          });

          return isSatisfy;
        });

        return transformedPersons;
      };

      const enumFilter = (persons: Array<PersonType>): Array<PersonType> => {
        const { enumFilterParams } = getState();
        const transformedPersons: Array<PersonType> = [];

        persons.forEach((person: PersonType) => {
          let remove = false;
          enumFilterParams.forEach(({ col, val }: EnumFilterParam) => {
            const title = COLUMN_TITLES[col];
            const value = person[title];

            const ENUM_VALUES = MUSK_MAP[col];
            const filteredValues: Array<string> = [];
            val.forEach((el: boolean, i) => {
              if (!el) filteredValues.push(ENUM_VALUES[i]);
            });

            if (filteredValues.includes(value.toString())) {
              remove = true;
            }
          });
          if (!remove) transformedPersons.push({ ...person });
        });

        return transformedPersons;
      };

      if (action.type === TRANSFORM_PERSONS) {
        const { persons, sortedParams, enumFilterParams, filteredColumns, filterValue } = getState();

        const enumFilterApplied = enumFilterParams.reduce((acc: number, el: EnumFilterParam) => {
          const applied = el.val.reduce((acc: number, el: boolean) => (!el ? ++acc : acc), 0);
          if (applied) return ++acc;
          return acc;
        }, 0);

        const stringFilteredColumns = filteredColumns.reduce((acc: number, el: boolean, i: number) => {
          if (el && STRING_COLUMNS[i]) return ++acc;
          return acc;
        }, 0);
        const filterApplied = filterValue && stringFilteredColumns;

        const afterFilter = filterApplied ? filterPersons(persons) : persons;
        const afterSort = sortedParams.length ? sortPersons(afterFilter) : afterFilter;
        const afterEnumFilter = enumFilterApplied ? enumFilter(afterSort) : afterSort;

        return dispatch(setTransformed(afterEnumFilter));
      }

      return next(action);
    };
  };
};

export default transformPersons;

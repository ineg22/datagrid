import React from 'react';
import { useSelector } from 'react-redux';

import './Table.scss';

import TableHeader from './TableHeader/TableHeader';
import TableRaw from './TableRaw/TableRaw';
import { StateType } from '../../types/index';

const Table: React.FC = () => {
  const { persons, columnVisibility, transformed, filterApplied } = useSelector(
    (state: StateType) => ({
      persons: state.persons,
      columnVisibility: state.columnVisibility,
      transformed: state.transformed,
      filterApplied: state.filterApplied,
    })
  );

  const renderedPersons = filterApplied ? transformed : persons;
  console.log(transformed.length);

  return (
    <table className="table">
      <thead>
        <TableHeader columnVisibility={columnVisibility} />
      </thead>
      <tbody>
        {renderedPersons.map(person => (
          <TableRaw
            person={person}
            key={person.id}
            columnVisibility={columnVisibility}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

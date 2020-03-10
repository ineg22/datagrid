import React from 'react';
import { useSelector } from 'react-redux';

import './Table.scss';

import TableHeader from './TableHeader/TableHeader';
import TableRaw from './TableRaw/TableRaw';
import { StateType } from '../../types/index';

const Table: React.FC = () => {
  const { persons, columnVisibility } = useSelector((state: StateType) => ({
    persons: state.persons,
    columnVisibility: state.columnVisibility,
  }));

  return (
    <table className="table">
      <thead>
        <TableHeader columnVisibility={columnVisibility} />
      </thead>
      <tbody>
        {persons.map(person => (
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

import React from 'react';
import { useSelector } from 'react-redux';

import './Table.scss';

import TableHeader from './TableHeader/TableHeader';
import TableRaw from './TableRaw/TableRaw';
import { StateType } from '../../types/index';

const Table: React.FC = () => {
  const { persons, columnVisibility, transformed } = useSelector((state: StateType) => ({
    persons: state.persons,
    columnVisibility: state.columnVisibility,
    transformed: state.transformed,
    filterApplied: state.filterApplied,
    sortedParams: state.sortedParams,
  }));

  const renderedPersons = transformed.length ? transformed : persons;

  return (
    <table className="table">
      <thead>
        <TableHeader columnVisibility={columnVisibility} />
      </thead>
      <tbody>
        {renderedPersons.map(person => (
          <TableRaw person={person} key={person.id} columnVisibility={columnVisibility} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

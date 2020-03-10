import React from 'react';
import { useSelector } from 'react-redux';

import './Table.scss';

import TableHeader from './TableHeader/TableHeader';
import TableRaw from './TableRaw/TableRaw';
import { StateType } from '../../types/index';

const Table: React.FC = () => {
  const { persons } = useSelector((state: StateType) => ({
    persons: state.persons,
  }));

  return (
    <table className="table">
      <thead>
        <TableHeader />
      </thead>
      <tbody>
        {persons.map(person => (
          <TableRaw person={person} key={person.id} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteSelectedRaws, transformPersons, setSelectedRaws } from '../../actions/index';

import TableHeader from './TableHeader/TableHeader';
import TableRaw from './TableRaw/TableRaw';
import { StateType } from '../../types/index';

const ESC_KEY = 'Delete';

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const { persons, columnVisibility, transformed } = useSelector((state: StateType) => ({
    persons: state.persons,
    columnVisibility: state.columnVisibility,
    transformed: state.transformed,
    sortedParams: state.sortedParams,
  }));

  useEffect(() => {
    const deleteHandle = (evt: KeyboardEvent): void => {
      if (evt.key === ESC_KEY) {
        dispatch(deleteSelectedRaws());
        dispatch(transformPersons());
        dispatch(setSelectedRaws([]));
      }
    };

    window.addEventListener('keyup', deleteHandle);
    return (): void => {
      window.removeEventListener('keyup', deleteHandle);
    };
  }, []);

  const renderedPersons = transformed ? transformed : persons;

  return (
    <>
      <TableHeader columnVisibility={columnVisibility} />
      {renderedPersons.map(person => (
        <TableRaw person={person} key={person.id} columnVisibility={columnVisibility} />
      ))}
    </>
  );
};

export default Table;

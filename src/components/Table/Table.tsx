import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteSelectedRows, transformPersons, setSelectedRows } from '../../actions/index';

import './Table.scss';
import TableHeader from './TableHeader/TableHeader';
import TableRow from './TableRow/TableRow';
import CustomVList from './CustomVList/CustomVList';
import { StateType } from '../../types/index';

const ESC_KEY = 'Delete';

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const { columnVisibility, transformed, isVirtualize } = useSelector((state: StateType) => ({
    columnVisibility: state.columnVisibility,
    transformed: state.transformed,
    sortedParams: state.sortedParams,
    isVirtualize: state.isVirtualize,
  }));

  useEffect(() => {
    const deleteHandle = (evt: KeyboardEvent): void => {
      if (evt.key === ESC_KEY) {
        dispatch(deleteSelectedRows());
        dispatch(transformPersons());
        dispatch(setSelectedRows([]));
      }
    };

    window.addEventListener('keyup', deleteHandle);
    return (): void => {
      window.removeEventListener('keyup', deleteHandle);
    };
  }, []);

  return (
    <>
      <TableHeader columnVisibility={columnVisibility} />
      {transformed && isVirtualize && <CustomVList />}
      {transformed && !isVirtualize && transformed.map(person => <TableRow person={person} key={person.id} columnVisibility={columnVisibility} />)}
    </>
  );
};

export default Table;

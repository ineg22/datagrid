import React from 'react';
import { useSelector } from 'react-redux';

import TableRaw from '../TableRaw/TableRaw';
import { StateType } from '../../../types/index';

const VisibleRows: React.FC = () => {
  const { visibleRows, transformed, columnVisibility } = useSelector((state: StateType) => ({
    visibleRows: state.visibleRows,
    transformed: state.transformed,
    columnVisibility: state.columnVisibility,
  }));
  const [from, to] = visibleRows;

  return (
    <>{transformed && transformed.slice(from, to).map(person => <TableRaw person={person} key={person.id} columnVisibility={columnVisibility} />)}</>
  );
};

export default VisibleRows;

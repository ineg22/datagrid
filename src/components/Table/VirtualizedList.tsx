import React from 'react';
import { FixedSizeList as List, ReactElementType } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { PersonType } from '../../types/index';
import TableRaw from './TableRaw/TableRaw';

interface Props {
  persons: Array<PersonType>;
  columnVisibility: Array<boolean>;
}

const VirtualizedList = ({ persons, columnVisibility }: Props) => {
  const Row: ReactElementType = ({ index }) => {
    return <TableRaw person={persons[index]} key={persons[index].id} columnVisibility={columnVisibility} />;
  };

  return (
    <List height={800} width={500} itemCount={1000} itemSize={30} className="List">
      {Row}
    </List>
  );
};

export default VirtualizedList;

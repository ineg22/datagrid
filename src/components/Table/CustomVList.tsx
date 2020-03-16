import React, { useEffect, useState } from 'react';

import { PersonType } from '../../types/index';
import TableRaw from './TableRaw/TableRaw';

interface Props {
  persons: Array<PersonType>;
  columnVisibility: Array<boolean>;
}

const CustomVList: React.FC<Props> = ({ persons, columnVisibility }) => {
  const rowHeight = 30;
  const headerHeight = 165;
  const fullHeight = headerHeight + rowHeight * persons.length;

  let { pageYOffset } = window;
  const { innerHeight } = window;
  if (pageYOffset + innerHeight > fullHeight) {
    pageYOffset = fullHeight - innerHeight;
  }
  const viewPort = innerHeight - headerHeight;
  const visibleRowsCount = viewPort / rowHeight + 2;

  const firstPerson = persons.length * rowHeight < viewPort ? 0 : Math.floor(pageYOffset / 30);

  const initialVisibleRows = persons
    .slice(firstPerson, firstPerson + visibleRowsCount)
    .map(person => <TableRaw person={person} key={person.id} columnVisibility={columnVisibility} />);

  const [visibleRows, setVisibleRows] = useState(initialVisibleRows);
  const [topVirtualSize, setTopVirtualSize] = useState(firstPerson * 30);
  const [bottomVirtualSize, setBottomVirtualSize] = useState(fullHeight - innerHeight > 0 ? fullHeight - innerHeight - firstPerson * 30 : 0);

  const virtualUpdate = (): void => {
    const fullHeight = headerHeight + rowHeight * persons.length;

    let { pageYOffset } = window;
    const { innerHeight } = window;

    const viewPort = innerHeight - headerHeight;
    const visibleRowsCount = Math.floor(viewPort / rowHeight + 2);
    if (pageYOffset + innerHeight > fullHeight) {
      pageYOffset = fullHeight - innerHeight;
    }
    const firstPerson = persons.length * rowHeight < viewPort ? 0 : Math.floor(pageYOffset / 30);
    setTopVirtualSize(firstPerson * 30);
    setBottomVirtualSize(fullHeight - innerHeight > 0 ? fullHeight - innerHeight - firstPerson * 30 : 0);
    const VisibleRows = persons
      .slice(firstPerson, firstPerson + visibleRowsCount)
      .map(person => <TableRaw person={person} key={person.id} columnVisibility={columnVisibility} />);
    setVisibleRows(VisibleRows);
  };

  useEffect(() => {
    document.addEventListener('scroll', virtualUpdate);
    return (): void => {
      document.removeEventListener('scroll', virtualUpdate);
    };
  }, []);

  useEffect(virtualUpdate, [persons, columnVisibility]);

  return (
    <div className="rowContainer">
      <div className="blockBefore" style={{ height: `${topVirtualSize}px` }}></div>
      {visibleRows}
      <div className="blockAfter" style={{ height: `${bottomVirtualSize}px` }}></div>
    </div>
  );
};

export default CustomVList;

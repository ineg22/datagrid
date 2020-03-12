import React from 'react';

import SortWidget from './SortWidget/SortWidget';
import { COLUMN_TITLES, STRING_COLUMNS } from '../../../constants/columns';
import './TableHeader.scss';

interface Params {
  columnVisibility: Array<boolean>;
}

const TableHeader: React.FC<Params> = ({ columnVisibility }) => {
  return (
    <tr className="header__raw">
      {COLUMN_TITLES.map((el, i) => {
        const className = columnVisibility[i]
          ? 'header__col'
          : 'header__col hidden';
        return (
          <th className={className} key={i}>
            <span>{el}</span>
            {STRING_COLUMNS[i] && <SortWidget col={i} />}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;

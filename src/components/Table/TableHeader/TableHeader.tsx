import React from 'react';

import { COLUMN_TITLES } from '../../../constants/columns';
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
            {el}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;

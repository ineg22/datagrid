import React from 'react';

import SortWidget from './SortWidget/SortWidget';
import EnumFilterWidget from './EnumFilterWidget/EnumFilterWidget';
import { COLUMN_TITLES, COLUMNS_WITH_SORT, ENUM_FILTER_COLUMNS } from '../../../constants/columns';
import './TableHeader.scss';

interface Params {
  columnVisibility: Array<boolean>;
}

const TableHeader: React.FC<Params> = ({ columnVisibility }) => {
  return (
    <tr className="header__raw">
      {COLUMN_TITLES.map((el, i) => {
        const className = columnVisibility[i] ? 'header__col' : 'header__col hidden';
        return (
          <th className={className} key={i}>
            {ENUM_FILTER_COLUMNS[i] && <EnumFilterWidget col={i} />}
            {el === 'app_version' ? <span>is_stable</span> : <span>{el}</span>}
            {COLUMNS_WITH_SORT[i] && <SortWidget col={i} />}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;

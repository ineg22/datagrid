import React from 'react';

import './TableHeader.scss';

interface Params {
  columnVisibility: Array<boolean>;
}

const TableHeader: React.FC<Params> = ({ columnVisibility }) => {
  const titlesArray = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'shirt_size',
    'app_name',
    'is_stable',
  ];
  return (
    <tr className="header__raw">
      {titlesArray.map((el, i) => {
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

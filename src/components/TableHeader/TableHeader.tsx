import React from 'react';

import './TableHeader.scss';

const TableHeader: React.FC = () => {
  return (
    <tr className="header__raw">
      <th className="header__col">id</th>
      <th className="header__col">first name</th>
      <th className="header__col">last_name</th>
      <th className="header__col">gender</th>
      <th className="header__col">shirt_size</th>
      <th className="header__col">app_name</th>
      <th className="header__col">app_version</th>
    </tr>
  );
};

export default TableHeader;

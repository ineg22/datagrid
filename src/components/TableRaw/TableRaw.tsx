import React from 'react';

import './TableRaw.scss';

const TableRaw: React.FC = () => {
  return (
    <tr className="content__raw">
      <td className="content__col">id</td>
      <td className="content__col">first name</td>
      <td className="content__col">last_name</td>
      <td className="content__col">gender</td>
      <td className="content__col">shirt_size</td>
      <td className="content__col">app_name</td>
      <td className="content__col">app_version</td>
    </tr>
  );
};

export default TableRaw;

import React from 'react';

import { PersonType } from '../../../types/index';
import './TableRaw.scss';

interface Params {
  person: PersonType;
}

const TableRaw: React.FC<Params> = ({ person }) => {
  const {
    id,
    first_name,
    last_name,
    gender,
    shirt_size,
    app_name,
    app_version,
  } = person;

  const is_stable = Number(app_version) >= 1;
  return (
    <tr className="content__raw">
      <td className="content__col content__col--sticky">{id}</td>
      <td className="content__col">{first_name}</td>
      <td className="content__col">{last_name}</td>
      <td className="content__col">{gender}</td>
      <td className="content__col">{shirt_size}</td>
      <td className="content__col">{app_name}</td>
      <td className="content__col content__col--bool">
        {is_stable ? <span>+</span> : <span>-</span>}
      </td>
    </tr>
  );
};

export default TableRaw;

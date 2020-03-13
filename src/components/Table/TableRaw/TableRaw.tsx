import React from 'react';

import { PersonType } from '../../../types/index';
import './TableRaw.scss';

interface Params {
  person: PersonType;
  columnVisibility: Array<boolean>;
}

const TableRaw: React.FC<Params> = ({ person, columnVisibility }) => {
  const { id, first_name, last_name, gender, shirt_size, app_name, app_version } = person;

  const contentArray = [id, first_name, last_name, gender, shirt_size, app_name, app_version ? 'true' : 'false'];

  return (
    <tr className="content__raw">
      {contentArray.map((el, i) => {
        const className = columnVisibility[i] ? 'content__col' : 'content__col hidden';

        return (
          <td className={className} key={i}>
            {el}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRaw;

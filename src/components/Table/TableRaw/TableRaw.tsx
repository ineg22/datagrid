import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectRaws } from '../../../actions/index';
import { PersonType, StateType } from '../../../types/index';
import './TableRaw.scss';

interface Params {
  person: PersonType;
  columnVisibility: Array<boolean>;
}

const TableRaw: React.FC<Params> = ({ person, columnVisibility }) => {
  const dispatch = useDispatch();
  const { selectedRaws } = useSelector((state: StateType) => ({
    selectedRaws: state.selectedRaws,
  }));
  const { id, first_name, last_name, gender, shirt_size, app_name, app_version } = person;

  const contentArray = [id, first_name, last_name, gender, shirt_size, app_name, app_version ? 'true' : 'false'];

  const rawClassName = selectedRaws.includes(id) ? 'content__raw selected' : 'content__raw';

  const rawClickHandler = (evt: React.MouseEvent<HTMLTableRowElement>): void => {
    const isCtrl = evt.ctrlKey;
    const isShift = evt.shiftKey;
    dispatch(selectRaws({ id, ctrl: isCtrl, shift: isShift }));
  };

  return (
    <tr className={rawClassName} onClick={rawClickHandler}>
      {contentArray.map((el, i) => {
        const className = columnVisibility[i] ? 'content__col' : 'content__col hidden';

        return (
          <td className={className} key={i}>
            {el}
          </td>
        );
      })}
      {/* <div className="rawOverflow">
        <input type="checkbox" className="selectRawCheckbox" />
        <button className="delRawButton">del</button>
      </div> */}
    </tr>
  );
};

export default TableRaw;

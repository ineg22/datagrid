import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectRaws, deleteCurrentRaw, transformPersons } from '../../../actions/index';
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

  const delRawButtonHandler = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.stopPropagation();
    dispatch(deleteCurrentRaw(id));
    if (selectedRaws.includes(id)) {
      dispatch(selectRaws({ id, ctrl: true, shift: false }));
    }
    dispatch(transformPersons());
  };

  return (
    <div className={rawClassName} onClick={rawClickHandler}>
      {contentArray.map((el, i) => {
        const className = columnVisibility[i] ? 'content__col' : 'content__col hidden';

        return (
          <div className={className} key={i}>
            {el}
          </div>
        );
      })}
      <div className="rawOverflow">
        <button className="delRawButton" onClick={delRawButtonHandler}>
          del
        </button>
      </div>
    </div>
  );
};

export default TableRaw;

import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectRows, deleteCurrentRow, transformPersons } from '../../../actions/index';
import { PersonType, StateType } from '../../../types/index';
import './TableRow.scss';

interface Params {
  person: PersonType;
  columnVisibility: Array<boolean>;
}

const TableRow: React.FC<Params> = ({ person, columnVisibility }) => {
  const dispatch = useDispatch();
  const { selectedRows } = useSelector((state: StateType) => ({
    selectedRows: state.selectedRows,
  }));
  const { id, first_name, last_name, gender, shirt_size, app_name, app_version } = person;

  const contentArray = [id, first_name, last_name, gender, shirt_size, app_name, app_version ? 'true' : 'false'];

  const rowClassName = selectedRows.includes(id) ? 'content__row selected' : 'content__row';

  const rowClickHandler = (evt: React.MouseEvent<HTMLTableRowElement>): void => {
    const isCtrl = evt.ctrlKey;
    const isShift = evt.shiftKey;
    dispatch(selectRows({ id, ctrl: isCtrl, shift: isShift }));
  };

  const delRowButtonHandler = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.stopPropagation();
    dispatch(deleteCurrentRow(id));
    if (selectedRows.includes(id)) {
      dispatch(selectRows({ id, ctrl: true, shift: false }));
    }
    dispatch(transformPersons());
  };

  return (
    <div className={rowClassName} onClick={rowClickHandler}>
      {contentArray.map((el, i) => {
        const className = columnVisibility[i] ? 'content__col' : 'content__col hidden';

        return (
          <div className={className} key={i}>
            {el}
          </div>
        );
      })}
      <div className="rowOverflow">
        <button className="delRowButton" onClick={delRowButtonHandler}>
          del
        </button>
      </div>
    </div>
  );
};

export default TableRow;

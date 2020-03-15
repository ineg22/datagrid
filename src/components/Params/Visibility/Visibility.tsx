import React from 'react';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';

import { StateType } from '../../../types/index';
import { changeVisibility } from '../../../actions/index';

import { COLUMN_TITLES } from '../../../constants/columns';
import './Visibility.scss';

const Visibility: React.FC = () => {
  const dispatch = useDispatch();
  const { columnVisibility } = useSelector((state: StateType) => ({
    columnVisibility: state.columnVisibility,
  }));

  const checkboxHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const number = Number(evt.target.dataset.columns);
    const newVisibility = [...columnVisibility];
    newVisibility[number] = !newVisibility[number];
    dispatch(changeVisibility(newVisibility));
  };

  return (
    <>
      <Popup
        trigger={<button className="visibilityButton">hide cols</button>}
        on={['click', 'hover']}
        position="bottom center"
        contentStyle={{ zIndex: 20 }}
        overlayStyle={{ zIndex: 10 }}
      >
        <div>
          {columnVisibility.map((el, i) => {
            return (
              <label className="checkboxWrapper" key={i}>
                <input type="checkbox" name={`column${i}`} id={`column${i}`} data-columns={i} onChange={checkboxHandler} checked={el} />
                {COLUMN_TITLES[i]}
              </label>
            );
          })}
        </div>
      </Popup>
    </>
  );
};

export default Visibility;

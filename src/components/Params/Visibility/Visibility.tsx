import React from 'react';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../types/index';

import { changeVisibility } from '../../../actions/index';

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
        trigger={open => (
          <button className="visibilityButton">
            {open ? 'show' : 'hide'} cols
          </button>
        )}
        position="bottom center"
        contentStyle={{ zIndex: 20 }}
        overlayStyle={{ zIndex: 10 }}
      >
        <div>
          {columnVisibility.map((el, i) => {
            return (
              <div className="checkboxWrapper" key={i}>
                <input
                  type="checkbox"
                  name={`column${i}`}
                  id={`column${i}`}
                  data-columns={i}
                  onChange={checkboxHandler}
                  checked={el}
                />
                <label htmlFor={`column${i}`}>column {i}</label>
              </div>
            );
          })}
        </div>
      </Popup>
    </>
  );
};

export default Visibility;

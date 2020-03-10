import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../types/index';

import { changeVisibility } from '../../actions/index';

import './Visibility.scss';

const Visibility: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { columnVisibility } = useSelector((state: StateType) => ({
    columnVisibility: state.columnVisibility,
  }));

  const buttonHandler = (): void => {
    if (ref && ref.current) {
      ref.current.classList.toggle('hidden');
    }
  };

  const checkboxHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const number = Number(evt.target.dataset.columns);
    const newVisibility = [...columnVisibility];
    newVisibility[number] = !newVisibility[number];
    dispatch(changeVisibility(newVisibility));
  };

  return (
    <>
      <button onClick={buttonHandler} className="visibilityButton">
        Show/hide columns
      </button>

      <div className="visibilityWrapper" ref={ref}>
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
    </>
  );
};

export default Visibility;

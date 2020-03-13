import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../../types/index';
import { setSortLight, transformPersons } from '../../../../actions/index';

import './SortWidget.scss';

interface Props {
  col: number;
}

const SortWidget: React.FC<Props> = ({ col }) => {
  const dispatch = useDispatch();
  const { sortedParams } = useSelector((state: StateType) => ({
    sortedParams: state.sortedParams,
  }));

  let sortedUp = false;
  let sortedDown = false;
  let currentSortPlace = 0;

  sortedParams.forEach((el, i) => {
    if (el.col === col) {
      currentSortPlace = i + 1;
      if (el.up) sortedUp = true;
      if (el.down) sortedDown = true;
    }
  });

  const sortHandle = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.shiftKey ? dispatch(setSortLight([col, true])) : dispatch(setSortLight([col, false]));

    dispatch(transformPersons());
  };

  return (
    <>
      {' '}
      <button className="SortButton" onClick={sortHandle}>
        <span className={sortedUp ? 'sortLabel sortUp sortActive' : 'sortLabel sortUp'}>
          <svg viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
          </svg>
        </span>
        <span className={sortedDown ? 'sortLabel sortDown sortActive' : 'sortLabel sortDown'}>
          <svg viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
          </svg>
        </span>
      </button>
      <span className="currentSortPlace">{currentSortPlace ? currentSortPlace : null}</span>
    </>
  );
};

export default SortWidget;

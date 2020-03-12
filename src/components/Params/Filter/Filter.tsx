import React from 'react';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../types/index';

import {
  changeFilterValue,
  changeFilteredColumns,
  transformPersons,
  applyFilters,
} from '../../../actions/index';

import { COLUMN_TITLES, STRING_COLUMNS } from '../../../constants/columns';
import './Filter.scss';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredColumns, filterValue, filterApplied } = useSelector(
    (state: StateType) => ({
      filteredColumns: state.filteredColumns,
      filterValue: state.filterValue,
      filterApplied: state.filterApplied,
    })
  );

  const checkboxHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const number = Number(evt.target.dataset.columns);
    const newFilterColumns = [...filteredColumns];
    newFilterColumns[number] = !newFilterColumns[number];
    dispatch(changeFilteredColumns(newFilterColumns));
    if (filterApplied) dispatch(transformPersons());
  };

  const inputHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const value = evt.target.value.trim().toLowerCase();
    dispatch(changeFilterValue(value));
    if (filterApplied) dispatch(transformPersons());
  };

  const applyFilterHandler = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = evt.target.checked;
    dispatch(applyFilters(value));
    dispatch(transformPersons());
  };

  return (
    <div className="filterWrapper">
      <Popup
        trigger={<button className="filterButton">filter in:</button>}
        on={['click']}
        position="bottom center"
        contentStyle={{ zIndex: 20 }}
        overlayStyle={{ zIndex: 10 }}
      >
        <div>
          {filteredColumns.map((el, i) => {
            if (STRING_COLUMNS[i])
              return (
                <label className="checkboxWrapper" key={i}>
                  <input
                    type="checkbox"
                    name={`column${i}`}
                    id={`column${i}`}
                    data-columns={i}
                    onChange={checkboxHandler}
                    checked={el}
                  />
                  {COLUMN_TITLES[i]}
                </label>
              );
            return null;
          })}
        </div>
      </Popup>
      <input
        type="text"
        placeholder="string value"
        name="filterInput"
        className="filterInput"
        value={filterValue}
        onChange={inputHandler}
      />
      <label htmlFor="applyFilterCheckbox">
        <input
          type="checkbox"
          checked={filterApplied}
          name="applyFilterCheckbox"
          id="applyFilterCheckbox"
          className="applyFilterCheckbox"
          onChange={applyFilterHandler}
        />
        apply filter
      </label>
    </div>
  );
};

export default Filter;

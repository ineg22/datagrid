import React from 'react';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';

import { setEnumFilterParam, transformPersons } from '../../../../actions/index';
import { StateType, EnumFilterParam } from '../../../../types/index';
import { MUSK_MAP, ENUM_LIKE_A_TOGGLE } from '../../../../constants/columns';
import './EnumFilterWidget.scss';

interface Props {
  col: number;
}

const EnumFilterWidget: React.FC<Props> = ({ col }) => {
  const dispatch = useDispatch();
  const { enumFilterParams } = useSelector((state: StateType) => ({
    enumFilterParams: state.enumFilterParams,
  }));

  let currentFilterValues: Array<boolean> = [];
  enumFilterParams.forEach((el: EnumFilterParam) => {
    if (el.col === col) {
      currentFilterValues = [...el.val];
    }
  });

  const checkboxHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const number = Number(evt.target.dataset.columns);
    const value = evt.target.checked;
    currentFilterValues[number] = value;
    dispatch(setEnumFilterParam({ col, val: currentFilterValues }));
    dispatch(transformPersons());
  };

  if (ENUM_LIKE_A_TOGGLE[col]) {
    return (
      <div className="toggleWrapper">
        {currentFilterValues.length &&
          currentFilterValues.map((el, i) => (
            <label className="checkboxWrapper" key={i}>
              <input type="checkbox" name={`column${i}`} id={`column${i}`} data-columns={i} onChange={checkboxHandler} checked={el} />
              {MUSK_MAP[col][i]}
            </label>
          ))}
      </div>
    );
  }
  return (
    <Popup
      trigger={<button className="EnumfilterButton">enum filter</button>}
      on={['click', 'hover']}
      position="bottom center"
      contentStyle={{ zIndex: 20, width: 'fit-content' }}
      overlayStyle={{ zIndex: 10 }}
    >
      <div>
        {currentFilterValues.length &&
          currentFilterValues.map((el, i) => (
            <label className="checkboxWrapper checkboxWrapper__enum" key={i}>
              <input type="checkbox" name={`column${i}`} id={`column${i}`} data-columns={i} onChange={checkboxHandler} checked={el} />
              {MUSK_MAP[col][i]}
            </label>
          ))}
      </div>
    </Popup>
  );
};

export default EnumFilterWidget;

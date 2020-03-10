import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../types/index';

import {
  changeAsync,
  changeVirtualize,
  changeCount,
} from '../../actions/index';

import './Params.scss';

interface Props {
  renderHandle: () => void;
}

const Params: React.FC<Props> = ({ renderHandle }) => {
  const dispatch = useDispatch();

  const { isAsync, isVirtualize, rawCount, columnVisibility } = useSelector(
    (state: StateType) => ({
      isAsync: state.isAsync,
      isVirtualize: state.isVirtualize,
      rawCount: state.rawCount,
      columnVisibility: state.columnVisibility,
    })
  );

  useEffect(() => {
    const params = JSON.stringify({
      isAsync,
      isVirtualize,
      rawCount,
      columnVisibility,
    });
    window.localStorage.setItem('tableParams', params);
  }, [isAsync, isVirtualize, rawCount, columnVisibility]);

  const asyncToggleHandle = (): void => {
    dispatch(changeAsync(!isAsync));
  };

  const virtualizeToggleHandle = (): void => {
    dispatch(changeVirtualize(!isVirtualize));
  };

  const changeCountToggleHandle = (count: number): void => {
    dispatch(changeCount(count));
  };

  return (
    <div className="paramsWrapper">
      <div>
        <input
          type="checkbox"
          checked={isAsync}
          name="asyncToggle"
          id="asyncToggle"
          className="asyncToggle"
          onChange={asyncToggleHandle}
        />
        <label htmlFor="asyncToggle">async</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={isVirtualize}
          name="virtualizeToggle"
          id="virtualizeToggle"
          className="virtualizeToggle"
          onChange={virtualizeToggleHandle}
        />
        <label htmlFor="virtualizeToggle">virtualize</label>
      </div>
      <input
        type="number"
        name="inputCount"
        id="inputCount"
        value={rawCount}
        className="inputCount"
        min={10}
        max={1000}
        step={1}
        onChange={(evt): void => {
          const count = Number(evt.target.value);
          changeCountToggleHandle(count);
        }}
      />
      <input
        type="range"
        name="rangeCount"
        id="rangeCount"
        min={10}
        max={1000}
        step={1}
        value={rawCount}
        className="rangeCount"
        onChange={(evt): void => {
          const count = Number(evt.target.value);
          changeCountToggleHandle(count);
        }}
      />
      <button onClick={renderHandle}>Render</button>
    </div>
  );
};

export default Params;

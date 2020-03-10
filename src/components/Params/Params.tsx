import React from 'react';
import './Params.scss';

interface Props {
  isAsync: boolean;
  isVirtualize: boolean;
  rawCount: number;
  asyncToggleHandle: () => void;
  virtualizeToggleHandle: () => void;
  changeCountToggleHandle: (count: number) => void;
  renderHandle: () => void;
}

const Params: React.FC<Props> = ({
  isAsync,
  isVirtualize,
  rawCount,
  asyncToggleHandle,
  virtualizeToggleHandle,
  changeCountToggleHandle,
  renderHandle,
}) => (
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

export default Params;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { StateType } from '../../types/index';

import Visibility from './Visibility/Visibility';
import Filter from './Filter/Filter';
import ExportCSVButton from './ExportCSVButton';
import { changeAsync, changeVirtualize, changeCount, deleteSelectedRaws, transformPersons, setSelectedRaws } from '../../actions/index';

import './Params.scss';

interface Props {
  renderHandle: () => void;
}

const Params: React.FC<Props> = ({ renderHandle }) => {
  const dispatch = useDispatch();

  const { isAsync, isVirtualize, rawCount, selectedRaws } = useSelector((state: StateType) => ({
    isAsync: state.isAsync,
    isVirtualize: state.isVirtualize,
    rawCount: state.rawCount,
    selectedRaws: state.selectedRaws,
  }));

  const asyncToggleHandle = (): void => {
    dispatch(changeAsync(!isAsync));
  };

  const virtualizeToggleHandle = (): void => {
    dispatch(changeVirtualize(!isVirtualize));
  };

  const changeCountHandle = (count: number): void => {
    dispatch(changeCount(count));
  };

  const onDeleteClickHandler = (): void => {
    dispatch(deleteSelectedRaws());
    dispatch(transformPersons());
    dispatch(setSelectedRaws([]));
  };

  return (
    <div className="sticker">
      <form className="formWrapper">
        <label htmlFor="asyncToggle">
          <input type="checkbox" checked={isAsync} name="asyncToggle" id="asyncToggle" className="asyncToggle" onChange={asyncToggleHandle} />
          async
        </label>
        <label htmlFor="virtualizeToggle">
          <input
            type="checkbox"
            checked={isVirtualize}
            name="virtualizeToggle"
            id="virtualizeToggle"
            className="virtualizeToggle"
            onChange={virtualizeToggleHandle}
          />
          virtualize
        </label>
        <label htmlFor="rangeCount">
          Raw count:
          <input
            type="range"
            name="rangeCount"
            min={10}
            max={1000}
            step={1}
            value={rawCount}
            className="rangeCount"
            onChange={(evt): void => {
              const count = Number(evt.target.value);
              changeCountHandle(count);
            }}
          />
          <input
            type="number"
            name="inputCount"
            value={rawCount}
            className="inputCount"
            min={10}
            max={1000}
            step={1}
            onChange={(evt): void => {
              const count = Number(evt.target.value);

              if (count > 9 && count < 1001 && count % 1 === 0) {
                changeCountHandle(count);
              }
            }}
          />
        </label>
        <button
          type="submit"
          onClick={(evt): void => {
            evt.preventDefault();
            renderHandle();
          }}
          className="renderButton"
        >
          Render
        </button>
      </form>
      <div className="additionalTools">
        <Filter />
        <Visibility />
        <button className="deleteRawsButton" title="press DELETE on keyboard" onClick={onDeleteClickHandler} disabled={Boolean(!selectedRaws.length)}>
          delete selected raws
        </button>
        <ExportCSVButton />
        <Popup
          trigger={
            <button className="queryExample" title="show query example">
              show query example
            </button>
          }
          on={['click']}
          position="bottom center"
          contentStyle={{ zIndex: 20 }}
          overlayStyle={{ zIndex: 10 }}
        >
          <input
            type="text"
            className="queryInputExample"
            title="click on text to copy it"
            value={`${`http://localhost:3000/?stringFilterValue=er&gender=Male+Female&shirtSize=XS+S+M&isStable=true`}`}
            readOnly
            onClick={(evt: React.SyntheticEvent<HTMLInputElement>): void => {
              const target: HTMLInputElement = evt.target as HTMLInputElement;
              target.select();
              document.execCommand('copy');
            }}
          />
        </Popup>
      </div>
    </div>
  );
};

export default Params;

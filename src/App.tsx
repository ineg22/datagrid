import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import thunkLoadData from './actions/thunkLoadData';
import {
  loadOffline,
  showError,
  setSortParams,
  setTransformed,
  setEnumFilterParams,
  changeFilterValue,
  changeFilteredColumns,
  transformPersons,
} from './actions/index';
import { StateType } from './types/index';
import { initialEnumFilterParams } from './constants/columns';

import Params from './components/Params/Params';
import Table from './components/Table/Table';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, isAsync, rawCount, error } = useSelector((state: StateType) => ({
    isLoading: state.isLoading,
    isAsync: state.isAsync,
    rawCount: state.rawCount,
    error: state.error,
  }));

  const renderTable = (count: number): void => {
    dispatch(setTransformed(null));
    dispatch(setEnumFilterParams(initialEnumFilterParams));
    dispatch(setSortParams([]));
    dispatch(changeFilterValue(''));
    dispatch(changeFilteredColumns(new Array(7).fill(true)));

    if (error) dispatch(showError(null));
    if (isAsync) {
      dispatch(thunkLoadData(count));
    } else {
      dispatch(loadOffline(count));
    }
  };

  useEffect(() => {
    const tableParamsString = window.localStorage.getItem('tableParams');

    if (!tableParamsString) {
      renderTable(rawCount);
    } else {
      if (isAsync) {
        dispatch(thunkLoadData(rawCount));
      } else {
        dispatch(loadOffline(rawCount));
      }
      dispatch(transformPersons());
    }
  }, []);

  return (
    <div className="App">
      <Params
        renderHandle={(): void => {
          renderTable(rawCount);
        }}
      />
      {isLoading && <p className="loading">loading...</p>}
      {error && <p className="loading">{error.message}</p>}
      {!isLoading && !error && <Table />}
    </div>
  );
};

export default App;

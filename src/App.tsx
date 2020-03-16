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
  setSelectedRaws,
  transformPersons,
} from './actions/index';
import { StateType } from './types/index';
import { initialEnumFilterParams, STRING_COLUMNS } from './constants/columns';

import Params from './components/Params/Params';
import Table from './components/Table/Table';
import useLocalStorage from './components/useLocalStorage';
import './App.scss';

const App: React.FC = () => {
  useLocalStorage();
  const dispatch = useDispatch();
  const { isLoading, isAsync, rawCount, error, persons } = useSelector((state: StateType) => ({
    isLoading: state.isLoading,
    isAsync: state.isAsync,
    rawCount: state.rawCount,
    error: state.error,
    persons: state.persons,
  }));

  const renderTable = (count: number): void => {
    dispatch(setSelectedRaws([]));
    dispatch(setTransformed(null));
    dispatch(setEnumFilterParams(initialEnumFilterParams));
    dispatch(setSortParams([]));
    dispatch(changeFilterValue(''));
    dispatch(changeFilteredColumns(STRING_COLUMNS));

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
    }
  }, []);

  useEffect(() => {
    dispatch(transformPersons());
  }, [persons]);

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

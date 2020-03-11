import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import thunkLoadData from './actions/thunkLoadData';
import { loadOffline, showError, setTransformedPersons } from './actions/index';
import { StateType } from './types/index';

import Params from './components/Params/Params';
import Table from './components/Table/Table';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, isAsync, rawCount, error } = useSelector(
    (state: StateType) => ({
      isLoading: state.isLoading,
      isAsync: state.isAsync,
      rawCount: state.rawCount,
      error: state.error,
    })
  );

  const renderTable = (count: number): void => {
    dispatch(setTransformedPersons([]));
    if (error) dispatch(showError(null));
    if (isAsync) {
      dispatch(thunkLoadData(count));
    } else {
      dispatch(loadOffline(count));
    }
  };

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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import thunkLoadData from './actions/thunkLoadData';
import { loadOffline, showError } from './actions/index';
import { StateType } from './types/index';

import Params from './components/Params/Params';
import Table from './components/Table/Table';
import Visibility from './components/Visibility/Visibility';
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
    if (error) dispatch(showError(null));
    if (isAsync) {
      dispatch(thunkLoadData(count));
    } else {
      dispatch(loadOffline(count));
    }
  };

  useEffect(() => {
    renderTable(rawCount);
  }, []); // [dispatch]

  const renderHandle = (): void => {
    renderTable(rawCount);
  };

  return (
    <div className="App">
      <Params renderHandle={renderHandle} />
      <div>
        <Visibility />
      </div>
      {isLoading ? <p className="loading">loading...</p> : null}
      {error ? <p className="loading">{error.message}</p> : null}
      {!isLoading && !error ? <Table /> : null}
    </div>
  );
};

export default App;

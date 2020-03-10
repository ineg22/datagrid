import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import thunkLoadData from './actions/thunkLoadData';
import {
  changeAsync,
  changeVirtualize,
  changeCount,
  loadOffline,
  showError,
} from './actions/index';
import { StateType } from './types/index';

import Params from './components/Params/Params';
import Table from './components/Table/Table';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, isAsync, isVirtualize, rawCount, error } = useSelector(
    (state: StateType) => ({
      isLoading: state.isLoading,
      persons: state.persons,
      isAsync: state.isAsync,
      isVirtualize: state.isVirtualize,
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

  useEffect(() => {
    const params = JSON.stringify({
      isAsync,
      isVirtualize,
      rawCount,
    });
    window.localStorage.setItem('tableParams', params);
  }, [isAsync, isVirtualize, rawCount]);

  const asyncToggleHandle = (): void => {
    dispatch(changeAsync(!isAsync));
  };

  const virtualizeToggleHandle = (): void => {
    dispatch(changeVirtualize(!isVirtualize));
  };

  const changeCountToggleHandle = (count: number): void => {
    dispatch(changeCount(count));
  };

  const renderHandle = (): void => {
    renderTable(rawCount);
  };

  console.log(error ? error.message : null);
  return (
    <div className="App">
      <Params
        isAsync={isAsync}
        isVirtualize={isVirtualize}
        rawCount={rawCount}
        asyncToggleHandle={asyncToggleHandle}
        virtualizeToggleHandle={virtualizeToggleHandle}
        changeCountToggleHandle={changeCountToggleHandle}
        renderHandle={renderHandle}
      />
      {isLoading ? <p className="loading">loading...</p> : null}
      {error ? <p className="loading">{error.message}</p> : null}
      {!isLoading && !error ? <Table /> : null}
    </div>
  );
};

export default App;

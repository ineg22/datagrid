import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import thunkLoadData from './actions/thunkLoadData';
import { startLoading } from './actions/index';
import { StateType } from './types/index';

import TableHeader from './components/TableHeader/TableHeader';
import TableRaw from './components/TableRaw/TableRaw';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, persons } = useSelector((state: StateType) => ({
    isLoading: state.isLoading,
    persons: state.persons,
  }));

  useEffect(() => {
    dispatch(startLoading());
    dispatch(thunkLoadData());
  }, [dispatch]);

  if (isLoading) return <p className="loading">loading...</p>;

  return (
    <div className="App">
      <table className="table">
        <tbody>
          <TableHeader />
          <TableRaw />
          <TableRaw />
          <TableRaw />
          <TableRaw />
        </tbody>
      </table>
    </div>
  );
};

export default App;

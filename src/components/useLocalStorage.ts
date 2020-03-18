import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '../types/index';

const useLocalStorage = (): void => {
  const {
    isAsync,
    isVirtualize,
    rowCount,
    columnVisibility,
    filteredColumns,
    filterValue,
    sortedParams,
    enumFilterParams,
    selectedRows,
  } = useSelector((state: StateType) => ({
    isAsync: state.isAsync,
    isVirtualize: state.isVirtualize,
    rowCount: state.rowCount,
    columnVisibility: state.columnVisibility,
    filteredColumns: state.filteredColumns,
    filterValue: state.filterValue,
    sortedParams: state.sortedParams,
    enumFilterParams: state.enumFilterParams,
    selectedRows: state.selectedRows,
  }));

  useEffect(() => {
    const params = JSON.stringify({
      isAsync,
      isVirtualize,
      rowCount,
      columnVisibility,
      filteredColumns,
      filterValue,
      sortedParams,
      enumFilterParams,
      selectedRows,
    });
    window.localStorage.setItem('tableParams', params);
  }, [isAsync, isVirtualize, rowCount, columnVisibility, filteredColumns, filterValue, sortedParams, enumFilterParams, selectedRows]);
};

export default useLocalStorage;

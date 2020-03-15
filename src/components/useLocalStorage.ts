import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '../types/index';

const useLocalStorage = (): void => {
  const {
    isAsync,
    isVirtualize,
    rawCount,
    columnVisibility,
    filteredColumns,
    filterValue,
    sortedParams,
    enumFilterParams,
    selectedRaws,
  } = useSelector((state: StateType) => ({
    isAsync: state.isAsync,
    isVirtualize: state.isVirtualize,
    rawCount: state.rawCount,
    columnVisibility: state.columnVisibility,
    filteredColumns: state.filteredColumns,
    filterValue: state.filterValue,
    sortedParams: state.sortedParams,
    enumFilterParams: state.enumFilterParams,
    selectedRaws: state.selectedRaws,
  }));

  useEffect(() => {
    const params = JSON.stringify({
      isAsync,
      isVirtualize,
      rawCount,
      columnVisibility,
      filteredColumns,
      filterValue,
      sortedParams,
      enumFilterParams,
      selectedRaws,
    });
    window.localStorage.setItem('tableParams', params);
  }, [isAsync, isVirtualize, rawCount, columnVisibility, filteredColumns, filterValue, sortedParams, enumFilterParams, selectedRaws]);
};

export default useLocalStorage;

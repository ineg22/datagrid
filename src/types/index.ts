export interface PersonType {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  shirt_size: string;
  app_name: string;
  app_version: boolean;
}

export interface SortBy {
  col: number;
  up: boolean;
  down: boolean;
}

export interface EnumFilterParam {
  col: number;
  val: Array<boolean>;
}

export interface SelectRows {
  id: number;
  ctrl?: boolean;
  shift?: boolean;
}

export interface StateType {
  persons: Array<PersonType>;
  transformed: Array<PersonType> | null;
  isLoading: boolean;
  error: Error | null;
  isAsync: boolean;
  isVirtualize: boolean;
  rowCount: number;
  columnVisibility: Array<boolean>;
  filteredColumns: Array<boolean>;
  filterValue: string;
  sortedParams: Array<SortBy>;
  enumFilterParams: Array<EnumFilterParam>;
  selectedRows: Array<number>;
  visibleRows: [number, number];
}

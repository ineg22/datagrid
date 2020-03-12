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
export interface StateType {
  persons: Array<PersonType>;
  transformed: Array<PersonType>;
  isLoading: boolean;
  error: Error | null;
  isAsync: boolean;
  isVirtualize: boolean;
  rawCount: number;
  columnVisibility: Array<boolean>;
  filteredColumns: Array<boolean>;
  filterValue: string;
  filterApplied: boolean;
  sortedParams: Array<SortBy>;
}

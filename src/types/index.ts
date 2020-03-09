export interface PersonType {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  shirt_size: string;
  app_name: string;
  app_version: boolean;
}

export interface StateType {
  persons: Array<PersonType>;
  isLoading: boolean;
  error: Error | null;
}

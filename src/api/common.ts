export type PagedParams = {
  page?: number;
  rowsPerPage?: number;
};

export type PagedResult<T> = {
  count: number;
  rows: T[];
};

export type SearchParams<T> = {
  term: string;
  keys?: (keyof T)[];
};

export type PagedParams = {
  startAt?: number;
  endAt?: number;
  orderBy?: string;
};

export type PagedResult<T> = {
  count: number;
  rows: T[];
};

export type SearchParams<T> = {
  term?: string;
  keys?: (keyof T)[];
};

export type OtherPagedParams = {
  startAt?: number;
  endAt?: number;
};

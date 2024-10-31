export type SortOrder = 'asc' | 'desc';

export type SortOptions<T> = { [K in keyof T]?: SortOrder };

export interface FilterOptions<T> {
  key: keyof T;
  value: string;
}

export interface CommonOptions<T> {
  page: number;
  limit: number;
  sortBy?: SortOptions<T>;
  filter?: FilterOptions<T>;
}

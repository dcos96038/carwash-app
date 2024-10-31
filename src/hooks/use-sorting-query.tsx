import { sortingParser } from '@/lib/search-params';
import { SortingState } from '@tanstack/react-table';
import { useQueryState } from 'nuqs';

export const useSortingQuery = () => {
  const [sorting, setSorting] = useQueryState<SortingState>('sorting', {
    ...sortingParser,
    shallow: false,
  });

  return {
    sorting,
    setSorting,
  };
};

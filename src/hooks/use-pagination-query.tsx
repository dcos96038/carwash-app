import { paginationParser } from '@/lib/search-params';
import { PaginationState } from '@tanstack/react-table';
import { useQueryState } from 'nuqs';
import { useDebounceCallback } from 'usehooks-ts';

export const usePaginationQuery = () => {
  const [pagination, setPagination] = useQueryState<PaginationState>(
    'pagination',
    {
      ...paginationParser,
      shallow: false,
    }
  );

  const debouncedSetPagination = useDebounceCallback(setPagination, 0);

  return {
    pagination,
    setPagination: debouncedSetPagination,
  };
};

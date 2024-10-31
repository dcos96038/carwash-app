import { paginationParsers, paginationUrlKeys } from '@/lib/search-params';
import { useQueryStates } from 'nuqs';

export const usePaginationQuery = () => {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys,
    shallow: false,
  });
};

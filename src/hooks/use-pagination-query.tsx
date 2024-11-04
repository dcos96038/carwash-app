import { useQueryStates } from "nuqs";

import { paginationParsers, paginationUrlKeys } from "@/lib/search-params";

export const usePaginationQuery = () => {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys,
    shallow: false,
  });
};

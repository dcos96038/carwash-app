import { SortingState } from "@tanstack/react-table";
import { useQueryState } from "nuqs";

import { sortingParser } from "@/lib/search-params";

export const useSortingQuery = () => {
  const [sorting, setSorting] = useQueryState<SortingState>("sorting", {
    ...sortingParser,
    shallow: false,
  });

  return {
    sorting,
    setSorting,
  };
};

import { SortingState } from "@tanstack/react-table";
import {
  createParser,
  createSearchParamsCache,
  parseAsFloat,
  parseAsInteger,
  parseAsJson,
} from "nuqs/server";
import z from "zod";

import { Constants } from "./constants";

export const pageIndexParser = createParser({
  parse: (query) => {
    const page = parseAsInteger.parse(query);
    return page === null ? null : page - 1;
  },
  serialize: (value) => {
    return parseAsInteger.serialize(value + 1);
  },
});

export const paginationParsers = {
  pageIndex: pageIndexParser.withDefault(0),
  pageSize: parseAsInteger.withDefault(Constants.ITEMS_PER_PAGE),
};

export const paginationUrlKeys = {
  pageIndex: "page",
  pageSize: "perPage",
};

const sortingSchema = z.custom<SortingState>((value) => value);

export const sortingParser = parseAsJson(sortingSchema.parse).withDefault([
  {
    id: "createdAt",
    desc: true,
  },
]);

export const searchParamsCache = createSearchParamsCache({
  nwLat: parseAsFloat.withDefault(0),
  nwLng: parseAsFloat.withDefault(0),
  seLat: parseAsFloat.withDefault(0),
  seLng: parseAsFloat.withDefault(0),
  page: paginationParsers.pageIndex,
  perPage: paginationParsers.pageSize,
  sorting: sortingParser,
});

import { PaginationState } from '@tanstack/react-table';
import {
  createSearchParamsCache,
  parseAsFloat,
  parseAsJson,
} from 'nuqs/server';
import z from 'zod';
import { Constants } from './constants';

const paginationSchema = z.custom<PaginationState>((value) => {
  if (value.page < 0) {
    throw new Error('Page cannot be less than 0');
  }

  if (value.limit < 1) {
    throw new Error('Limit cannot be less than 1');
  }

  return value;
});

export const paginationParser = parseAsJson(paginationSchema.parse).withDefault(
  {
    pageIndex: 0,
    pageSize: Constants.ITEMS_PER_PAGE,
  }
);

export const searchParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  nwLat: parseAsFloat.withDefault(0),
  nwLng: parseAsFloat.withDefault(0),
  seLat: parseAsFloat.withDefault(0),
  seLng: parseAsFloat.withDefault(0),
  pagination: paginationParser,
});

import { createSearchParamsCache, parseAsFloat } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
	// List your search param keys and associated parsers here:
	nwLat: parseAsFloat.withDefault(0),
	nwLng: parseAsFloat.withDefault(0),
	seLat: parseAsFloat.withDefault(0),
	seLng: parseAsFloat.withDefault(0),
});

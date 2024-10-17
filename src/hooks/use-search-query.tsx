import { useQueryState, parseAsString } from "nuqs";
import { useDebounceCallback } from "usehooks-ts";

export const useSearchQuery = () => {
	const [query, setQuery] = useQueryState("q", {
		...parseAsString,
		throttleMs: 3000,
	});

	const debouncedSetQuery = useDebounceCallback(setQuery, 1000);

	return {
		query,
		setQuery: debouncedSetQuery,
	};
};

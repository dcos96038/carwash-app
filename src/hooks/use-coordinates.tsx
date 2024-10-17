"use client";

import { useQueryState, parseAsFloat } from "nuqs";
import { useDebounceCallback } from "usehooks-ts";

export const useCoordinates = () => {
	const [nwLat, setNwLat] = useQueryState("nwLat", {
		...parseAsFloat,
		throttleMs: 1000,
	});
	const [nwLng, setNwLng] = useQueryState("nwLng", {
		...parseAsFloat,
		throttleMs: 1000,
	});
	const [seLat, setSeLat] = useQueryState("seLat", {
		...parseAsFloat,
		throttleMs: 1000,
	});
	const [seLng, setSeLng] = useQueryState("seLng", {
		...parseAsFloat,
		throttleMs: 1000,
	});

	const debouncedSetNwLat = useDebounceCallback(setNwLat, 1000);
	const debouncedSetNwLng = useDebounceCallback(setNwLng, 1000);
	const debouncedSetSeLat = useDebounceCallback(setSeLat, 1000);
	const debouncedSetSeLng = useDebounceCallback(setSeLng, 1000);

	return {
		nwLat,
		setNwLat: debouncedSetNwLat,
		nwLng,
		setNwLng: debouncedSetNwLng,
		seLat,
		setSeLat: debouncedSetSeLat,
		seLng,
		setSeLng: debouncedSetSeLng,
	};
};

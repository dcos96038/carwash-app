'use client';

import { useQueryState, parseAsFloat } from 'nuqs';
import { useDebounceCallback } from 'usehooks-ts';

export const useCoordinates = () => {
  const [nwLat, setNwLat] = useQueryState('nwLat', {
    ...parseAsFloat,
  });
  const [nwLng, setNwLng] = useQueryState('nwLng', {
    ...parseAsFloat,
  });
  const [seLat, setSeLat] = useQueryState('seLat', {
    ...parseAsFloat,
  });
  const [seLng, setSeLng] = useQueryState('seLng', {
    ...parseAsFloat,
  });

  const debouncedSetNwLat = useDebounceCallback(setNwLat, 500);
  const debouncedSetNwLng = useDebounceCallback(setNwLng, 500);
  const debouncedSetSeLat = useDebounceCallback(setSeLat, 500);
  const debouncedSetSeLng = useDebounceCallback(setSeLng, 500);

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

"use client";

import type { Map as MapType } from "leaflet";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useCoordinates } from "@/hooks/use-coordinates";

interface ContextProps {
  map: MapType | null;
  setMap: (map: MapType | null) => void;
  moveMap: (lat: number, lng: number) => void;
}

const MapContext = createContext({} as ContextProps);

export function useMap() {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }

  return context;
}

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [map, setMap] = useState<MapType | null>(null);
  const { setNwLat, setNwLng, setSeLat, setSeLng, seLng, nwLat, nwLng, seLat } =
    useCoordinates();

  const moveMap = useCallback(
    (lat: number, lng: number) => {
      if (!map) return;

      map.setZoomAround([lat, lng], 100);
      map.panTo([lat, lng]);
    },
    [map],
  );

  useEffect(() => {
    if (!map) return;
    const onBoundsChange = () => {
      const bounds = map.getBounds();

      setNwLat(bounds.getNorthWest().lat);
      setNwLng(bounds.getNorthWest().lng);
      setSeLat(bounds.getSouthEast().lat);
      setSeLng(bounds.getSouthEast().lng);
    };

    map.on("moveend", onBoundsChange);

    return () => {
      map.off("moveend", onBoundsChange);
    };
  }, [map, setNwLat, setNwLng, setSeLat, setSeLng]);

  useEffect(() => {
    if (map && nwLat && nwLng && seLat && seLng) {
      map.fitBounds([
        [nwLat, nwLng],
        [seLat, seLng],
      ]);
    }
  }, [map, nwLat, nwLng, seLat, seLng]);

  return (
    <MapContext.Provider value={{ map, setMap, moveMap }}>
      {children}
    </MapContext.Provider>
  );
};

"use client";

import { useCoordinates } from "@/hooks/use-coordinates";
import type { Map as MapType } from "leaflet";
import { createContext, useContext, useEffect, useState } from "react";

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

	const moveMap = (lat: number, lng: number) => {
		if (!map) return;
		map.panTo([lat, lng]);
	};

	useEffect(() => {
		const onBoundsChange = () => {
			if (!map) return;
			const bounds = map.getBounds();

			setNwLat(bounds.getNorthWest().lat);
			setNwLng(bounds.getNorthWest().lng);
			setSeLat(bounds.getSouthEast().lat);
			setSeLng(bounds.getSouthEast().lng);
		};

		map?.on("moveend", onBoundsChange);

		return () => {
			map?.off("moveend", onBoundsChange);
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

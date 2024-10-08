"use client";
import { icon } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import type { carwashLocations } from "@/db/schema";

type CarwashLocation = typeof carwashLocations.$inferSelect;

const customMarker = icon({
	iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
});

export function ClientHomePage({
	markers,
}: {
	markers: CarwashLocation[];
}) {
	console.log("CLIENT", markers);

	const [location, setLocation] = useState<{ lat: number; lng: number }>();

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (navigator.geolocation) {
				console.log("Geolocation is supported by this browser.");

				navigator.geolocation.getCurrentPosition(
					(position: GeolocationPosition) => {
						const coords = {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						};
						setLocation(coords);
						console.log(`Latitude: ${coords.lat} Longitude: ${coords.lng}`);
					},
					(error: GeolocationPositionError) => {
						console.log(`Error getting location: ${error.message}`);
					},
				);
			} else {
				console.log("Geolocation is not supported by this browser.");
			}
		}
	}, []);

	if (!location) {
		return <p>Loading location...</p>;
	}

	return (
		<MapContainer
			center={[location.lat, location.lng]}
			zoom={50}
			scrollWheelZoom={false}
			style={{ height: "100vh", width: "100%" }}
			trackResize={true}
		>
			<TileLayer
				className="bg-blue-500"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MapHelper markers={markers} />
		</MapContainer>
	);
}

const MapHelper = ({ markers }: { markers: CarwashLocation[] }) => {
	const map = useMap();

	useEffect(() => {
		const onBoundsChange = () => {
			const bounds = map.getBounds();
			const southWest = bounds.getSouthWest();
			const northEast = bounds.getNorthEast();
			console.log("Bounds changed:");
			console.log("Southwest corner:", southWest.lat, southWest.lng);
			console.log("Northeast corner:", northEast.lat, northEast.lng);
		};

		map.on("moveend", onBoundsChange);

		return () => {
			map.off("moveend", onBoundsChange);
		};
	}, [map]);

	return (
		<>
			{markers.map((marker) => (
				<Marker
					icon={customMarker}
					key={marker.id}
					position={[marker.latitude, marker.longitude]}
				>
					<Popup>
						<h2>{marker.name}</h2>
					</Popup>
				</Marker>
			))}
		</>
	);
};

"use client";

import "leaflet/dist/leaflet.css";

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Home() {
	const [location, setLocation] = useState<{ lat: number; lng: number }>();

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}, []);

	const showPosition = (position: GeolocationPosition) => {
		const coords = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		};
		setLocation(coords);
		console.log(`Latitude: ${coords.lat} Longitude: ${coords.lng}`);
	};

	const showError = (error: GeolocationPositionError) => {
		console.log(`Error getting location: ${error.message}`);
	};

	if (!location) {
		return <p>Loading location...</p>;
	}

	return (
		<>
			<MapContainer
				center={[-26.9272191, -65.3408132]}
				zoom={13}
				scrollWheelZoom={false}
				style={{ height: "100vh", width: "100%" }} // Estilos del mapa
			>
				<TileLayer
					className="bg-blue-500"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[-26.9272191, -65.3408132]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</>
	);
}

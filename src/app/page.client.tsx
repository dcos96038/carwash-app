"use client";

import { useMap } from "@/context/use-map";
import { icon } from "leaflet";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { Carwash } from "@/types/carwash.types";

import { useCoordinates } from "@/hooks/use-coordinates";

import { getLocationsAction } from "./actions";
import { SearchDrawer } from "./components/search-drawer";
import { Sidebar } from "./components/sidebar";

const locationMarker = icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

export default function ClientHomePage({
  locations,
}: {
  locations: Carwash[];
}) {
  const [carwashLocations, setCarwashLocations] =
    useState<Carwash[]>(locations);

  const { setMap, moveMap } = useMap();

  const { nwLat, nwLng, seLat, seLng } = useCoordinates();
  const [userLocation, setUserLocation] = useState<GeolocationPosition>();

  const { execute } = useAction(getLocationsAction, {
    onSuccess: ({ data }) => {
      if (data?.length) {
        setCarwashLocations(data);
      }
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          moveMap(position.coords.latitude, position.coords.longitude);

          setUserLocation(position);
        },
        () => {},
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: Number.POSITIVE_INFINITY,
        },
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [moveMap]);

  useEffect(() => {
    const fetchMarkers = async () => {
      if (!nwLat || !nwLng || !seLat || !seLng) return;

      execute({
        coords: {
          northWestLat: nwLat,
          northWestLng: nwLng,
          southEastLat: seLat,
          southEastLng: seLng,
        },
      });
    };

    fetchMarkers();
  }, [execute, nwLat, nwLng, seLat, seLng]);

  return (
    <>
      <Sidebar locations={carwashLocations || []} />
      <div className="relative w-full overflow-hidden rounded-lg">
        <div>
          <div className="absolute bottom-10 right-10 z-[1000]">
            <SearchDrawer />
          </div>
          <MapContainer
            zoom={70}
            scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%" }}
            trackResize={true}
            center={[51.505, -0.09]}
            ref={setMap}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <Marker
                icon={locationMarker}
                position={[
                  userLocation.coords.latitude,
                  userLocation.coords.longitude,
                ]}
              >
                <Popup>
                  <h2>Your Location</h2>
                </Popup>
              </Marker>
            )}
            {carwashLocations.map((marker) => (
              <Marker
                icon={locationMarker}
                key={marker.id}
                position={[marker.latitude, marker.longitude]}
              >
                <Popup>
                  <h2>{marker.name}</h2>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}

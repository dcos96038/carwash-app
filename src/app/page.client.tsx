'use client';

import { useMap } from '@/context/use-map';
import type { Carwash } from '@/types/locations.types';
import { icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Sidebar } from './components/sidebar';
import { useCoordinates } from '@/hooks/use-coordinates';
import { getLocationsAction } from './actions';
import { SearchDrawer } from './components/search-drawer';
import { useAction } from 'next-safe-action/hooks';

const locationMarker = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

export function ClientHomePage({ locations }: { locations: Carwash[] }) {
  const [carwashLocations, setCarwashLocations] =
    useState<Carwash[]>(locations);
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );
  const [userLocationError, setUserLocationError] = useState<string | null>(
    null
  );

  const { setMap } = useMap();

  const { nwLat, nwLng, seLat, seLng } = useCoordinates();

  const { execute } = useAction(getLocationsAction, {
    onSuccess: ({ data }) => {
      if (data?.length) {
        setCarwashLocations(data);
      }
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setUserLocation(position);
        },
        (error: GeolocationPositionError) => {
          console.log(`Error getting location: ${error.message}`);
          setUserLocationError(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: Number.POSITIVE_INFINITY,
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

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

  if (userLocationError) {
    return (
      <div className="text-center text-red-500">
        {userLocationError}. Please enable location services.
      </div>
    );
  }

  return (
    <>
      <Sidebar locations={carwashLocations || []} />
      <div className="rounded-lg w-full overflow-hidden relative">
        {userLocation ? (
          <>
            <div className="absolute z-[1000] bottom-10 right-10">
              <SearchDrawer />
            </div>
            <MapContainer
              zoom={70}
              scrollWheelZoom={false}
              style={{ height: '100vh', width: '100%' }}
              trackResize={true}
              center={[
                userLocation.coords.latitude,
                userLocation.coords.longitude,
              ]}
              ref={setMap}
            >
              <TileLayer
                className="bg-blue-500"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
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
          </>
        ) : (
          <div className="text-center text-gray-400">Loading...</div>
        )}
      </div>
    </>
  );
}

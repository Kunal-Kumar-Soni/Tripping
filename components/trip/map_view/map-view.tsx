"use client";

import { useCallback, useMemo, useState } from "react";

import {
  GoogleMap,
  LoadScript,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "92vh" };
const origin = { lat: 23.3441, lng: 85.3096 };
const destination = { lat: 23.37, lng: 85.325 };

const mapOptions = {
  styles: [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }],
    },
  ],
  disableDefaultUI: true,
  zoomControl: false,
};

export default function CleanMap() {
  const [route, setRoute] = useState<google.maps.LatLngLiteral[]>([]);

  const fetchRoute = useCallback(async () => {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          const path = result.routes[0].overview_path.map((p) => ({
            lat: p.lat(),
            lng: p.lng(),
          }));
          setRoute(path);
        }
      },
    );
  }, []);

  return (
    <div className="mt-18">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={origin}
          zoom={13}
          onLoad={fetchRoute}
          options={mapOptions}
        >
          {route.length > 0 && (
            <Polyline
              path={route}
              options={{
                strokeColor: "#fbbf24",
                strokeWeight: 5,
                strokeOpacity: 0.9,
              }}
            />
          )}

          <MarkerF
            position={origin}
            options={{
              icon: {
                path: 0,
                scale: 6,
                fillColor: "#fbbf24",
                fillOpacity: 1,
                strokeWeight: 0,
              },
            }}
          />

          <MarkerF
            position={destination}
            options={{
              icon: {
                path: 0,
                scale: 10,
                fillColor: "#06b6d4",
                fillOpacity: 1,
                strokeWeight: 3,
                strokeColor: "#ffffff",
              },
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

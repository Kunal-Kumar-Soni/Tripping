"use client";

import { useCallback, useState } from "react";

import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  MarkerClustererF,
  MarkerF,
} from "@react-google-maps/api";
import { useJsApiLoader } from "@react-google-maps/api";

import BlueLoader from "@/components/loader/blue-loader";
import { usePlan } from "@/hooks/usePlan";
import {
  getTravelMode,
  useTransportWithCoords,
} from "@/hooks/useTransportWithCoords";
import {
  ActivityIconPaths,
  getActivityMarkerIcon,
  getTimeBadgeIcon,
  mapOptions,
  ModeIconPath,
} from "@/lib/mapView";

const containerStyle = { width: "100%", height: "calc(100vh - 72px)" };
const SHOW_DETAILS_ZOOM = 5;
export default function MapView() {
  const { plans } = usePlan();
  const { transports } = useTransportWithCoords();
  const [zoom, setZoom] = useState<number>(6);

  const [directionsList, setDirectionsList] = useState<
    google.maps.DirectionsResult[]
  >([]);

  const handleMapCallback = useCallback(
    (result: google.maps.DirectionsResult | null, index: number) => {
      if (result !== null) {
        setDirectionsList((prev) => {
          if (prev[index]) return prev;
          const newList = [...prev];
          newList[index] = result;
          return newList;
        });
      }
    },
    [],
  );

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      if (plans.length === 0) {
        map.setCenter({ lat: 20, lng: 0 });
        map.setZoom(2);
        return;
      }

      const bounds = new window.google.maps.LatLngBounds();

      plans.forEach((plan) => {
        if (plan.lat && plan.lng) {
          bounds.extend({ lat: plan.lat, lng: plan.lng });
        }
      });

      map.fitBounds(bounds);

      const listener = window.google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom()! > 10) map.setZoom(10);
        window.google.maps.event.removeListener(listener);
      });
    },
    [plans],
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <BlueLoader />;

  return (
    <div className="mt-18">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={(map) => {
          onMapLoad(map);

          map.addListener("zoom_changed", () => {
            const currentZoom = map.getZoom() || 6;
            setZoom(currentZoom);
          });
        }}
        zoom={6}
        options={mapOptions}
      >
        {/*  Markers */}
        <MarkerClustererF>
          {(clusterer) => (
            <>
              {plans.map((plan) => (
                <MarkerF
                  key={plan.id}
                  position={{ lat: plan.lat!, lng: plan.lng! }}
                  title={plan.title}
                  clusterer={clusterer} // ⭐ IMPORTANT
                  icon={getActivityMarkerIcon(
                    plan.title || "",
                    ActivityIconPaths[plan.type],
                  )}
                />
              ))}
            </>
          )}
        </MarkerClustererF>

        {/* DirectionsService  */}
        {transports.map((t, index) => {
          if (!t.fromLat || !t.toLat) return null;

          return (
            <DirectionsService
              key={index}
              options={{
                origin: { lat: t.fromLat, lng: t.fromLng },
                destination: { lat: t.toLat, lng: t.toLng },
                travelMode: getTravelMode(t.travelMode),
              }}
              callback={(result) => handleMapCallback(result, index)}
            />
          );
        })}

        {/* DirectionsRenderer  */}
        {zoom > SHOW_DETAILS_ZOOM && (
          <>
            {directionsList.map((dir, index) => {
              const route = dir?.routes?.[0];
              const routeLeg = route?.legs?.[0];

              if (!route || !routeLeg) return null;

              const path = dir.routes[0].overview_path;
              const midPoint = path[Math.floor(path.length / 2)];

              return (
                <div key={`route-${index}`}>
                  <DirectionsRenderer
                    directions={dir}
                    options={{
                      suppressMarkers: true,
                      preserveViewport: true,
                      polylineOptions: {
                        strokeColor: "#8B5CF6",
                        strokeWeight: 5,
                      },
                    }}
                  />
                  <MarkerF
                    position={midPoint}
                    icon={getTimeBadgeIcon(
                      transports[index].duration_text || "No Time",
                      ModeIconPath[transports[index].travelMode] ||
                        ModeIconPath["driving"],
                    )}
                  />
                </div>
              );
            })}
          </>
        )}
      </GoogleMap>
    </div>
  );
}

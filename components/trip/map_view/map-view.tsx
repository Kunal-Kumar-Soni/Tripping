"use client";

import { BiSolidLandmark } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";

import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

import { usePlan } from "@/hooks/usePlan";
import { ActivityType } from "@/types/common";

const containerStyle = { width: "100%", height: "93vh" };

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

const IconPaths: Record<ActivityType, string> = {
  // MdOutlineRestaurant
  restaurant:
    "M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z",

  // BiSolidLandmark
  hotel:
    "M21 17h-2V9h2V7a.998.998 0 0 0-.594-.914l-9.432-4.191-8.421 4.21A1 1 0 0 0 2 7v2h2v8H2v4h19v-4zm-5-8v8h-3V9h3zM7 9h3v8H7V9z",

  // MdHiking
  activity:
    "M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 5.28c-1.23-.37-2.22-1.17-2.8-2.18l-1-1.6c-.41-.65-1.11-1-1.84-1-.78 0-1.59.5-1.78 1.44S7 23 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1 1.15 2.41 2.01 4 2.34V23H19V9h-1.5v1.78zM7.43 13.13l-2.12-.41a.999.999 0 0 1-.79-1.17l.76-3.93a2 2 0 0 1 2.34-1.58l1.16.23-1.35 6.86z",
};
export default function CleanMap() {
  const { plans } = usePlan();

  if (!plans) return null;

  const center = {
    lat: plans[0]?.lat || 23.3441,
    lng: plans[0]?.lng || 85.3096,
  };

  return (
    <div className="mt-18">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={mapOptions}
        >
          {plans.map((plan) => {
            const path = IconPaths[plan.type];
            const labelText = plan.title || "";
            const width = labelText.length * 8 + 60;

            const svgIcon = `
               <svg 
                width="${width}" 
                height="55" 
                viewBox="0 0 ${width} 55" 
                xmlns="http://www.w3.org/2000/svg"
               >
                <rect x="0" y="5" width="${width}" height="32" rx="10" fill="#2D2D2D" />
                <g transform="translate(12, 11)">
                  <path d="${path}" fill="white" transform="scale(0.8)" />
                </g>
                <text x="40" y="26" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="white">
                 ${labelText}
                </text>
                <circle cx="${width / 2}" cy="38" r="6" fill="#8B5CF6" />
              </svg> 
            `;

            return (
              <MarkerF
                key={plan.id}
                position={{ lat: plan.lat!, lng: plan.lng! }}
                title={plan.title}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`,
                  anchor: window?.google?.maps
                    ? new window.google.maps.Point(width / 2, 45)
                    : undefined,
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "1000px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function MapView() {
  return (
    <div className="mt-18">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}></GoogleMap>
      </LoadScript>
    </div>
  );
}

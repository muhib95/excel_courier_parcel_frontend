"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const Map = dynamic(() => import("./MapComponent"), {
  ssr: false, // Disable server-side rendering
});

export default function MapView({ pickupLocation, deliveryLocation }) {
  return (
    <Map pickupLocation={pickupLocation} deliveryLocation={deliveryLocation} />
  );
}

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix default marker icon path issue in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function MapComponent({ pickupLocation, deliveryLocation }) {
  if (!pickupLocation && !deliveryLocation) {
    return <p>No location data provided</p>;
  }

  const pickup = pickupLocation
    ? {
        lat: parseFloat(pickupLocation.lat),
        lng: parseFloat(pickupLocation.lng),
      }
    : null;

  const delivery = deliveryLocation
    ? {
        lat: parseFloat(deliveryLocation.lat),
        lng: parseFloat(deliveryLocation.lng),
      }
    : null;

  // Center map on pickup if available, otherwise delivery
  const center = pickup || delivery;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {pickup && (
        <Marker position={[pickup.lat, pickup.lng]}>
          <Popup>📦 Pickup Point</Popup>
        </Marker>
      )}

      {delivery && (
        <Marker position={[delivery.lat, delivery.lng]}>
          <Popup>🏁 Delivery Point</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

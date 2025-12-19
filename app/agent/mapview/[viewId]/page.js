"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

// 🛠️ Fix Leaflet marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

// Routing component
const Routing = ({ pickup, delivery }) => {
  const map = useMap();

  useEffect(() => {
    if (!pickup || !delivery || !map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pickup.lat, pickup.lng),
        L.latLng(delivery.lat, delivery.lng),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, pickup, delivery]);

  return null;
};

export default function MapComponent() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const { viewId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!viewId || !token) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/agent/singleBooking/${viewId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [viewId, token]);

  const pickup = booking?.parcel?.pickupLocation;
  const delivery = booking?.parcel?.deliveryLocation;
  const center = pickup || { lat: 23.8103, lng: 90.4125 }; // fallback to Dhaka

  return (
    <div>
      {loading && <p>Loading map...</p>}
      {!loading && pickup && delivery && (
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={7}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Routing pickup={pickup} delivery={delivery} />
        </MapContainer>
      )}
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Dynamically import MapView
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function BookingView() {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const { viewId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!viewId) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/parcels/single/booking/history/${viewId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token, // ⬅️ Add header
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
  }, [viewId, session, status]);
  const pickupLocation = booking?.parcel?.deliveryLocation;
  const deliveryLocation = booking?.parcel?.pickupLocation;
  return (
    <div>
      <h1>Track Parcel</h1>
      <MapView
        pickupLocation={pickupLocation}
        deliveryLocation={deliveryLocation}
      />
    </div>
  );
}

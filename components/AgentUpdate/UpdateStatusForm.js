"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateStatusForm({
  parcelId,
  token,
  availableOptions,
}) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current location using geolocation API
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Send status + location
          await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/agent/updateStatus/${parcelId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify({
                status,
                pickupLocation: {
                  lat: latitude,
                  lng: longitude,
                },
              }),
            }
          );
          setLoading(false);
          router.push(`/agent/${parcelId}`);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to get current location.");
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-2 font-medium text-gray-700">
        Assign Delivery Agent
      </label>
      <select
        name="status"
        className="w-full p-2 border rounded mb-4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="" disabled>
          Select a status
        </option>
        {availableOptions?.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Assign Agent"}
      </button>
    </form>
  );
}

"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ParcelBookingForm() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    pickupAddress: "",
    pickupLat: "",
    pickupLng: "",
    deliveryAddress: "",
    deliveryLat: "",
    deliveryLng: "",
    parcelType: "Small",
    paymentType: "COD",
    status: "Booked",
  });

  const handleChange = async(e) => {
    const { name, value } = e.target;
    setForm({ ...form, [e.target.name]: e.target.value });
    if (name === "pickupAddress") {
    const coords = await geocodeAddress(value);
    if (coords) {
      setForm((prev) => ({
        ...prev,
        pickupAddress: value,
        pickupLat: coords.lat,
        pickupLng: coords.lng,
      }));
    }
  }

  if (name === "deliveryAddress") {
    const coords = await geocodeAddress(value);
    if (coords) {
      setForm((prev) => ({
        ...prev,
        deliveryAddress: value,
        deliveryLat: coords.lat,
        deliveryLng: coords.lng,
      }));
    }
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/parcels/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session?.user?.token}`,
          },
          body: JSON.stringify({
            ...form,
            pickupLocation: {
              lat: parseFloat(form.pickupLat),
              lng: parseFloat(form.pickupLng),
            },
            deliveryLocation: {
              lat: parseFloat(form.deliveryLat),
              lng: parseFloat(form.deliveryLng),
            },
          }),
        }
      );

      if (res.ok) {
        alert("Parcel booked successfully!");
        setForm({
          pickupAddress: "",
          pickupLat: "",
          pickupLng: "",
          deliveryAddress: "",
          deliveryLat: "",
          deliveryLng: "",
          parcelType: "Small",
          paymentType: "COD",
          status: "Booked",
        });
      } else {
        alert("Failed to book parcel");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong");
    }
  };

  const geocodeAddress = async (address) => {
    if (!address || address.length < 4) {
    return null;
  }
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1&countrycodes=bd`
  );
  const data = await res.json();
  if (data.length > 0) {
    return {
      lat: data[0].lat,
      lng: data[0].lon,
    };
  }
  return null;
};

 
  return (
    <div className="flex justify-center px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Book a Parcel
        </h2>

        {/* Pickup Address */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Pickup Address
          </label>
          <input
            type="text"
            name="pickupAddress"
            className="w-full p-2 border rounded-md"
            placeholder="123 Main Street"
            value={form.pickupAddress}
            onChange={handleChange}
            required
          />
        </div>

        {/* Pickup Location */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Pickup Latitude
            </label>
            <input
              type="number"
              name="pickupLat"
              step="any"
              className="w-full p-2 border rounded-md"
              placeholder="23.78"
              value={form.pickupLat}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Pickup Longitude
            </label>
            <input
              type="number"
              name="pickupLng"
              step="any"
              className="w-full p-2 border rounded-md"
              placeholder="90.41"
              value={form.pickupLng}
              onChange={handleChange}
              required
            />
          </div>
        </div> */}

        {/* Delivery Address */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Delivery Address
          </label>
          <input
            type="text"
            name="deliveryAddress"
            className="w-full p-2 border rounded-md"
            placeholder="456 Market Road"
            value={form.deliveryAddress}
            onChange={handleChange}
            required
          />
        </div>

        {/* Delivery Location */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Latitude
            </label>
            <input
              type="number"
              name="deliveryLat"
              step="any"
              className="w-full p-2 border rounded-md"
              placeholder="23.76"
              value={form.deliveryLat}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Longitude
            </label>
            <input
              type="number"
              name="deliveryLng"
              step="any"
              className="w-full p-2 border rounded-md"
              placeholder="90.38"
              value={form.deliveryLng}
              onChange={handleChange}
              required
            />
          </div>
        </div> */}

        {/* Parcel Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Parcel Type</label>
          <select
            name="parcelType"
            className="w-full p-2 border rounded-md"
            value={form.parcelType}
            onChange={handleChange}
            required
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        {/* Payment Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Payment Type</label>
          <select
            name="paymentType"
            className="w-full p-2 border rounded-md"
            value={form.paymentType}
            onChange={handleChange}
            required
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Prepaid">Prepaid</option>
          </select>
        </div>

        {/* Status (optional for Admin) */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            className="w-full p-2 border rounded-md"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Booked">Booked</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

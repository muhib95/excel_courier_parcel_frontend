// app/admin/booking/[viewId]/page.js

import UpdateStatusForm from "@/components/AgentUpdate/UpdateStatusForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function ViewBooking({ params }) {
  const { viewId } = await params;
  const session = await auth();
  const token = session?.user?.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/agent/singleBooking/${viewId}`,
    {
      cache: "no-store", // for fresh data every time
      headers: {
        Authorization: `${token}`, // Replace with session token if needed
      },
    }
  );

  if (!res.ok) {
    return <div>Error fetching booking details.</div>;
  }

  const data = await res.json();
  const parcel = data?.parcel;
  const statusOptions = [
    "Booked",
    "Assigned",
    "Picked Up",
    "In Transit",
    "Delivered",
    "Failed",
  ];

  const currentIndex = statusOptions.indexOf(parcel?.status); // returns 1
  const availableOptions = statusOptions.slice(currentIndex + 1);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Parcel Details</h1>

      <div className="bg-white shadow-md rounded p-4 space-y-4 mb-6">
        <div>
          <strong>Parcel ID:</strong> {parcel?._id}
        </div>
        <div>
          <strong>Customer Name:</strong> {parcel?.customer?.name}
        </div>
        <div>
          <strong>Customer Phone:</strong> {parcel?.customer?.phone}
        </div>
        <div>
          <strong>Pickup Address:</strong> {parcel?.pickupAddress}
        </div>
        <div>
          <strong>Delivery Address:</strong> {parcel?.deliveryAddress}
        </div>
        <div>
          <strong>Price:</strong> {parcel?.price}
        </div>
        <div>
          <strong>Status:</strong> {parcel?.status}
        </div>
      </div>
      <UpdateStatusForm parcelId={parcel?._id} token={token} availableOptions={availableOptions}/>
      {/* <form
        action={async (formData) => {
          "use server";
          const status = formData.get("status");
          await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/agent/updateStatus/${parcel._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify({ status }),
            }
          );
          redirect(`/agent/${parcel._id}`);
        }}
      >
        <label className="block mb-2 font-medium text-gray-700">
          Assign Delivery Agent
        </label>
        <select
          name="status"
          className="w-full p-2 border rounded mb-4"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a status
          </option>
          {availableOptions?.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign Agent
        </button>
      </form> */}
    </div>
  );
}

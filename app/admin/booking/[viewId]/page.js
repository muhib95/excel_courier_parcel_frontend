// app/admin/booking/[viewId]/page.js

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function getAllAgent() {
  const session = await auth();
  const token = session?.user?.token; // you can get it from env, cookies, or session

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/allAgent`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );

  const data = await res.json();
  return data;
}

export default async function ViewBooking({ params }) {
  const { viewId } =await params;
  const session = await auth();
  const token = session?.user?.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/singleBooking/${viewId}`,
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
  const agentsData = await getAllAgent();
  const agents = agentsData?.users;

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
        <div>
          <strong>Assigned Agent Name:</strong>{" "}
          {parcel.assignedAgent?.name || "Not assigned"}
        </div>
         <div>
          <strong>Assigned Agent Phone:</strong>{" "}
          {parcel.assignedAgent?.phone || "Not assigned"}
        </div>
      </div>
      {
        parcel?.status === "Booked" &&
        <form
        action={async (formData) => {
          "use server";
          const agentId = formData.get("agent");
          await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/${parcel._id}/assignAgent`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify({ agentId }),
            }
          );
          redirect(`/admin/booking/${parcel._id}`);
        }}
      >
        <label className="block mb-2 font-medium text-gray-700">
          Assign Delivery Agent
        </label>
        <select
          name="agent"
          className="w-full p-2 border rounded mb-4"
          defaultValue=""
        >
          <option value="" disabled>
            Select an agent
          </option>
          {agents?.map((agent) => (
            <option key={agent?._id} value={agent?._id}>
              {agent?.name} - {agent?.phone}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign Agent
        </button>
      </form>
      }

      
    </div>
  );
}

import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";
async function getAllBooking() {
  const session = await auth();
  const token = session?.user?.token; // you can get it from env, cookies, or session

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/agent/view/assignParcel`,
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

export default async function AgentBookingList() {
  const parcels = await getAllBooking();
  const parcelList = parcels?.parcels;
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Booking Assign List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 ">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">SL</th>
              <th className="px-4 py-2 border">Pickup Address</th>
              <th className="px-4 py-2 border">Delivery Address</th>
              <th className="px-4 py-2 border">Parcel Type</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcelList?.map((parcel, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2 border text-center align-middle">
                  {i + 1}
                </td>
                <td className="px-4 py-2 border text-center align-middle">
                  {parcel?.pickupAddress}
                </td>
                <td className="px-4 py-2 border text-center align-middle">
                  {parcel?.deliveryAddress}
                </td>
                <td className="px-4 py-2 border text-center align-middle">
                  {parcel?.parcelType}
                </td>
                 <td className="px-4 py-2 border text-center align-middle">
                  {parcel?.price}
                </td>
                <td className="px-4 py-2 border text-center align-middle  text-green-800">
                  {parcel?.status}
                </td>
                <td className="px-4 py-2 border text-center align-middle underline text-blue-800">
                    <div className="flex items-center justify-center space-x-2">
                        <Link href={`/agent/${parcel?._id}`}>
                    Update
                  </Link>
                  <Link href={`/agent/mapview/${parcel?._id}`}>
                    Map
                  </Link>
                    </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BookingList = ({ parcels }) => {
    const [parcelList, setParcelList] = useState(parcels);
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, { transports: ["websocket"] });

    socket.on("connect", () => {
      socket.emit("hello", "Hello from frontend");
    });
    socket.on("statusUpdated", (data) => {
      setParcelList((prevList) =>
        prevList.map((parcel) =>
          parcel._id === data.parcelId
            ? { ...parcel, status: data.status }
            : parcel
        )
      );
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Booking List</h2>
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
                  <Link href={`/customer/bookinghistory/${parcel?._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;

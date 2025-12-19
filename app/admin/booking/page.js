import AdminBookingList from "@/components/AdminBookingList/AdminBookingList";
import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";
async function getAllBooking() {
  const session = await auth();
  const token = session?.user?.token; // you can get it from env, cookies, or session

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/allBooking`,
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

export default async function BookingList() {
  const parcels = await getAllBooking();
  const parcelList = parcels?.parcels;

  return (
    <div>
      <AdminBookingList parcelData={parcelList}/>
    </div>
  );
}

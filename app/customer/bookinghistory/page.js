import BookingList from "@/components/BookingList/BookingList";
import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";
async function getParcels() {
  const session = await auth();
  const token = session?.user?.token; // you can get it from env, cookies, or session

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/parcels/booking/history`,
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

export default async function BookingHistory() {
  const parcels = await getParcels();
  const parcelList = parcels?.parcels;

  return (
   <div>
    <BookingList parcels={parcelList}/>
   </div>
  );
}

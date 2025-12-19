"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Report = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const downloadFile = async (type) => {
    
    try {
      const endpoint =
        type === "csv"
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/export/csv/parcels`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/export/pdf/parcels`;
      const res = await fetch(
        `${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to download file");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `parcels_report.${type}`;
      a.click();
      a.remove();
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  };

  return (
    <div className="flex space-x-2 p-6">
      <button
        onClick={() => downloadFile("csv")}
        className="bg-blue-700 text-white p-2 rounded-md cursor-pointer"
      >
        Export CSV
      </button>
      <button
        onClick={() => downloadFile('pdf')}
        className="bg-blue-700 text-white p-2 rounded-md cursor-pointer"
      >
        Export PDF
      </button>
    </div>
  );
};

export default Report;

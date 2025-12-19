import Card from '@/components/Card/Card';
import { auth } from '@/lib/auth';
import React from 'react';
async function getDashboardMetrics() {
      const session = await auth();
      const token = session?.user?.token; 
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getDashboardMetrics`, {
    headers: {
      Authorization: `${token}` // OR session/cookie-based if needed
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard metrics");
  }

  return res.json();
}
const AdminPage = async() => {
    const metrics = await getDashboardMetrics();
    return (
        <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="📦 Daily Bookings" value={metrics?.dailyBookings} bg="bg-blue-100" />
        <Card title="❌ Failed Deliveries" value={metrics?.failedDeliveries} bg="bg-red-100" />
        <Card title="💰 COD Amount" value={`৳ ${metrics?.totalCODAmount}`} bg="bg-green-100" />
      </div>
    </div>
    );
};

export default AdminPage;
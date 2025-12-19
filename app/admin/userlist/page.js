import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";
async function getAllUser() {
  const session = await auth();
  const token = session?.user?.token; // you can get it from env, cookies, or session

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/allUser`,
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

export default async function UserList() {
  const users = await getAllUser();
  const userList = users?.users;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 ">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">SL</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2 border text-center align-middle">
                  {i + 1}
                </td>
                <td className="px-4 py-2 border text-center align-middle">
                  {user?.name}
                </td>
                <td className="px-4 py-2 border text-center align-middle">
                  {user?.phone}
                </td>
                <td className="px-4 py-2 border text-center align-middle">
                  {user?.role}
                </td>
                <td className="px-4 py-2 border text-center align-middle underline text-blue-800">
                  <Link href={`/customer/bookinghistory/${user?._id}`}>
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
}

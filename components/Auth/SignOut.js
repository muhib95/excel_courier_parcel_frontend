"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div className="bg-red-800 flex justify-center items-center rounded-md">
<button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-2 cursor-pointer"
    >
      Logout
    </button>
    </div>
    
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogInInputField() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        phone,
        password,
        redirect: false,
      });
      console.log(result);
      if (result?.error) {
        alert("Login failed");
      } else {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        if (session?.user?.user?.role === "customer") {
          router.replace("/customer");
          return;
        } else if (session?.user?.user?.role === "agent") {
          router.replace("/agent");
          return;
        } else {
          router.replace("/admin");
          return;
        }
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-3">Login</h2>

      <form onSubmit={handleLogin} className="space-y-2 text-sm">
        {/* Phone */}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full px-3 py-1.5 border rounded focus:outline-none focus:ring focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-1.5 border rounded focus:outline-none focus:ring focus:ring-blue-400"
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-1.5 mt-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Logging..." : "Login"}
        </button>
      </form>

      <p className="text-xs text-center mt-3">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

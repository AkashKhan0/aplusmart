"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error);
      return;
    }

    localStorage.setItem("adminToken", data.token);
    router.push("/");
  };



  return (
    <div className="w-full universal min-h-screen p-5">
      <div className="fixed_width p-5 universal">
        <div className="w-full max-w-[500px] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm flex flex-col gap-5">

        <h1 className="capitalize text-2xl font-semibold text-center">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-1.5">

          {/* Username */}
          <p className="text-base font-semibold">Admin Username</p>
          <div className="w-full border rounded-sm overflow-hidden mb-1">
            <input
              type="text"
              className="w-full outline-none py-1 px-3"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <p className="text-base font-semibold">Password</p>
          <div className="w-full border rounded-sm overflow-hidden mb-1 relative">
            <input
              type={showPass ? "text" : "password"}
              className="w-full outline-none py-1 px-3 pr-10"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="absolute right-3 top-2 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#FFCE1B] py-1 rounded-sm font-semibold text-lg my-3 cursor-pointer hover:bg-[#fdc701] transition-all duration-300">
            Login
          </button>

          {/* Message */}
          {msg && (
            <p className="text-center text-sm font-semibold text-red-600 mt-1">
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
    </div>
  );
}

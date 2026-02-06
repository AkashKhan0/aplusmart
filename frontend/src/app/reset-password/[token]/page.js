"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const params = useParams();
const token = Array.isArray(params.token)
  ? params.token[0]
  : params.token;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");  
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("TOKEN:", token, typeof token);

    if (password.length < 6)
      return setMessage("Password must be at least 6 characters");
    if (password !== confirm)
      return setMessage("Passwords do not match");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/userauth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setSuccess(false);
        return setMessage(data.error);
      }

      setSuccess(true);
      setMessage("Password updated");

      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setSuccess(false);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-[400px] shadow-lg p-5">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* NEW PASSWORD */}
          <div className="border border-gray-300 rounded-sm relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="New password"
              className="w-full outline-none py-1 px-3 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-600"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="border border-gray-300 rounded-sm relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full outline-none py-1 px-3 pr-10"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-600"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="bg-[#FFCE1B] py-1 font-semibold">
            Update Password
          </button>

          {message && (
            <p
              className={`text-sm ${
                success ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
        
      </div>
    </div>
  );
}

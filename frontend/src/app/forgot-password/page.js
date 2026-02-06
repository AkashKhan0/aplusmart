"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) return setMessage("Email is required");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/userauth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      console.log("💌 Response received:", data);
      setSuccess(true);
      setMessage(data.message || "Reset link sent");
    } catch {
      setSuccess(false);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-[400px] shadow-2xl p-5">
        <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-sm px-3 py-1 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-[#FFCE1B] py-1 font-semibold">
            Continue
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

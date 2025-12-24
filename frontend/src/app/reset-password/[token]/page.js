"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 6)
      return setMessage("Password must be at least 6 characters");
    if (password !== confirm)
      return setMessage("Passwords do not match");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/userauth/reset-password`,
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
      <div className="w-full max-w-[400px] shadow p-5">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="New password"
            className="border px-3 py-1 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="border px-3 py-1 outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

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

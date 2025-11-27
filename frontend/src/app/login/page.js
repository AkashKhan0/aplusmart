"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [emailPhoneError, setEmailPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) router.push(redirectTo);
  }, []);

  // Email / Phone Validation
  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!value.trim()) {
      setEmailPhoneError("Email or phone is required.");
    } else if (value.includes("@") && !emailRegex.test(value)) {
      setEmailPhoneError("Enter a valid email.");
    } else if (!value.includes("@") && !bdPhoneRegex.test(value)) {
      setEmailPhoneError("Enter a valid Bangladeshi phone number.");
    } else {
      setEmailPhoneError("");
    }

    setEmailOrPhone(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!emailOrPhone.trim()) {
      setEmailPhoneError("Email or phone is required.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      return;
    }

    if (emailPhoneError) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setMessage("Login successful! Redirecting...");

        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }

        setTimeout(() => {
          router.push(redirectTo);
        }, 1000);

      } else {
        setMessage(data.error || "Login failed.");
      }

    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="w-full universal min-h-screen p-5">
      <div className="fixed_width p-5 universal">
        <div className="w-full max-w-[500px] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm flex flex-col gap-5">

          <h1 className="text-2xl font-semibold">Account Login</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-1.5">

            {/* Email / Phone */}
            <p className="font-semibold">Email / Phone</p>
            <div className="border rounded-sm mb-1">
              <input
                type="text"
                className="w-full outline-none py-1 px-3"
                placeholder="Email / Phone"
                value={emailOrPhone}
                onChange={(e) => validateEmailOrPhone(e.target.value)}
              />
            </div>
            {emailPhoneError && <p className="text-red-600 text-sm mb-2">{emailPhoneError}</p>}

            {/* Password */}
            <div className="flex items-center justify-between">
              <p className="font-semibold">Password</p>
            </div>

            <div className="border rounded-sm mb-1 relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full outline-none py-1 px-3 pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />

              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && <p className="text-red-600 text-sm mb-2">{passwordError}</p>}

            {/* Remember Me */}
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="cursor-pointer"
              />
              <label htmlFor="remember" className="cursor-pointer">Remember Me</label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#FFCE1B] hover:bg-[#fdc701] py-1 rounded-sm font-semibold text-lg my-3"
            >
              Login
            </button>

            {/* Message */}
            {message && (
              <p className={`text-sm font-semibold mb-2 ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5">
              <p>Don't have an account?</p>
              <Link href="/signup" className="text-blue-600 font-semibold">Please Register...</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

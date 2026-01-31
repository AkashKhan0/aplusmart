"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Page() {
  const router = useRouter();

  // ---------------- States ----------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // ---------------- Check existing session ----------------
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userauth/profile`, {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        router.push("/profile");
      } else {
        setAuthLoading(false);
      }
    });
  }, []);

  useEffect(() => {
  if (message || passwordError) {
    const timer = setTimeout(() => {
      setMessage("");
      setPasswordError("");
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [message, passwordError]);


  // ---------------- Login Handler ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setPasswordError("");

    if (!email.trim()) return setMessage("Email is required");
    if (!password.trim()) return setPasswordError("Password is required");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/userauth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
            rememberMe,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setIsSuccess(false);
        return setMessage(data.error || "Login failed");
      }

      setIsSuccess(true);
      setMessage("Login successful");

      setTimeout(() => {
        router.push("/profile");
      }, 800);
    } catch (error) {
      setIsSuccess(false);
      setMessage("Something went wrong");
    }
  };

  // ---------------- Loading ----------------
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="w-full universal min-h-screen p-5 mt-10">
      <div className="fixed_width universal">
        <div className="w-full max-w-[500px] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Account Login</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-1.5">
            {/* Email */}
            <p className="font-semibold">Email</p>
            <div className="border border-gray-300 rounded-sm mb-1">
              <input
                type="text"
                className="w-full outline-none py-1 px-3"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <p className="font-semibold">Password</p>
            <div className="border border-gray-300 rounded-sm mb-1 relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full outline-none py-1 px-3 pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="cursor-pointer"
              />
              <label className="cursor-pointer">Remember Me</label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#FFCE1B] hover:bg-[#fdc701] py-1 rounded-sm font-semibold text-lg cursor-pointer"
            >
              Login
            </button>

            {/* Message */}
            <div className="w-full flex items-center h-5">
              {message && (
              <p
                className={`text-sm font-semibold ${
                  isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
            <p className="text-red-600 text-sm">
                {passwordError}
              </p>
            </div>

            {/* Register */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
              <p>Don't have an account?</p>
              <Link
                href="/signup"
                className="text-blue-600 font-semibold"
              >
                Please Register...
              </Link>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-center">
              <Link
                href="/forgot-password"
                className="text-base font-medium text-green-600 hover:text-green-800 duration-300"
              >
                Forget password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

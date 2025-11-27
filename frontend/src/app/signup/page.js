"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Page() {
  const router = useRouter();

  // USER ROLE
  const [role, setRole] = useState("customer");

  // CUSTOMER FIELDS
  const [fullName, setFullName] = useState("");

  // COMMON FIELDS
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // RESELLER FIELDS
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [resellerName, setResellerName] = useState("");

  // ERRORS
  const [errorName, setErrorName] = useState("");
  const [errorEmailPhone, setErrorEmailPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [errorShop, setErrorShop] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [errorResellerName, setErrorResellerName] = useState("");

  // Message
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Show/Hide Password
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Email / Phone validation
  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdPhoneRegex = /^(01[3-9]\d{8})$/;

    if (value.includes("@")) {
      if (!emailRegex.test(value)) setErrorEmailPhone("Enter a valid email.");
      else setErrorEmailPhone("");
    } else {
      if (!bdPhoneRegex.test(value))
        setErrorEmailPhone("Enter valid Bangladeshi phone number.");
      else setErrorEmailPhone("");
    }

    setEmailOrPhone(value);
  };

  // FORM SUBMIT
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    // CUSTOMER VALIDATION
    if (role === "customer") {
      if (!fullName.trim()) {
        setErrorName("Full name is required.");
        return;
      }

      if (!emailOrPhone.trim()) {
        setErrorEmailPhone("Email or phone is required.");
        return;
      }

      if (errorEmailPhone) return;

      if (password.length < 6) {
        setErrorPassword("Password must be at least 6 characters.");
        return;
      }

      if (password !== confirm) {
        setErrorConfirm("Passwords do not match.");
        return;
      }
    }

    // RESELLER VALIDATION
    if (role === "reseller") {
      if (!shopName.trim()) {
        setErrorShop("Shop name is required.");
        return;
      }
      if (!location.trim()) {
        setErrorLocation("Location is required.");
        return;
      }
      if (!resellerName.trim()) {
        setErrorResellerName("Reseller full name is required.");
        return;
      }

      if (!emailOrPhone.trim()) {
        setErrorEmailPhone("Email or phone is required.");
        return;
      }
      if (errorEmailPhone) return;

      if (password.length < 6) {
        setErrorPassword("Password must be at least 6 characters.");
        return;
      }

      if (password !== confirm) {
        setErrorConfirm("Passwords do not match.");
        return;
      }
    }

    // SEND TO BACKEND
    const payload =
      role === "customer"
        ? { role, fullName, emailOrPhone, password }
        : {
            role,
            shopName,
            location,
            resellerName,
            emailOrPhone,
            password,
          };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      setIsSuccess(true);
      setMessage("Registration successful!");

      // RESET
      setFullName("");
      setEmailOrPhone("");
      setPassword("");
      setConfirm("");
      setShopName("");
      setLocation("");
      setResellerName("");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setIsSuccess(false);
      setMessage(data.error);
    }
  };

  return (
    <div className="w-full universal min-h-screen p-5">
      <div className="fixed_width p-5 universal">
        <div className="max-w-[500px] w-full p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm flex flex-col gap-5">

          <h1 className="capitalize text-2xl font-semibold">Register Account</h1>

          {/* ROLE SELECT */}
          <div className="flex gap-5 mb-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="customer"
                checked={role === "customer"}
                onChange={() => setRole("customer")}
              />
              Customer
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="reseller"
                checked={role === "reseller"}
                onChange={() => setRole("reseller")}
              />
              Reseller
            </label>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-1.5">

            {/* CUSTOMER FORM */}
            {role === "customer" && (
              <>
                <p className="font-semibold">Full Name</p>
                <div className="border rounded-sm mb-1">
                  <input
                    type="text"
                    className="w-full outline-none py-1 px-3"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (!e.target.value.trim())
                        setErrorName("Full name is required.");
                      else setErrorName("");
                    }}
                  />
                </div>
                {errorName && (
                  <p className="text-red-600 text-sm mb-2">{errorName}</p>
                )}
              </>
            )}

            {/* RESELLER FORM */}
            {role === "reseller" && (
              <>
                <p className="font-semibold">Shop Name</p>
                <div className="border rounded-sm mb-1">
                  <input
                    type="text"
                    className="w-full outline-none py-1 px-3"
                    placeholder="Shop Name"
                    value={shopName}
                    onChange={(e) => {
                      setShopName(e.target.value);
                      setErrorShop("");
                    }}
                  />
                </div>
                {errorShop && (
                  <p className="text-red-600 text-sm mb-2">{errorShop}</p>
                )}

                <p className="font-semibold">Shop Location</p>
                <div className="border rounded-sm mb-1">
                  <input
                    type="text"
                    className="w-full outline-none py-1 px-3"
                    placeholder="Shop Location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setErrorLocation("");
                    }}
                  />
                </div>
                {errorLocation && (
                  <p className="text-red-600 text-sm mb-2">{errorLocation}</p>
                )}

                <p className="font-semibold">Reseller Full Name</p>
                <div className="border rounded-sm mb-1">
                  <input
                    type="text"
                    className="w-full outline-none py-1 px-3"
                    placeholder="Reseller Name"
                    value={resellerName}
                    onChange={(e) => {
                      setResellerName(e.target.value);
                      setErrorResellerName("");
                    }}
                  />
                </div>
                {errorResellerName && (
                  <p className="text-red-600 text-sm mb-2">
                    {errorResellerName}
                  </p>
                )}
              </>
            )}

            {/* COMMON FIELDS */}
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
            {errorEmailPhone && (
              <p className="text-red-600 text-sm mb-2">{errorEmailPhone}</p>
            )}

            <p className="font-semibold">Password</p>
            <div className="border rounded-sm mb-1 relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full outline-none py-1 px-3 pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorPassword("");
                }}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errorPassword && (
              <p className="text-red-600 text-sm mb-2">{errorPassword}</p>
            )}

            <p className="font-semibold">Confirm Password</p>
            <div className="border rounded-sm mb-1 relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full outline-none py-1 px-3 pr-10"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setErrorConfirm("");
                }}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errorConfirm && (
              <p className="text-red-600 text-sm mb-2">{errorConfirm}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#FFCE1B] hover:bg-[#fdc701] duration-300 py-1 rounded-sm font-semibold text-lg my-3"
            >
              Register
            </button>

            {/* MESSAGE */}
            {message && (
              <p
                className={`text-base font-semibold mb-2 ${
                  isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5">
              <p>Already have an account?</p>
              <Link href="/login" className="text-blue-600 font-semibold">
                Please Login...
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

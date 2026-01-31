"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useAppContext } from "@/src/context/AppContext";

export default function SignupPage() {
  const context = useAppContext();

  const isLoading = context.isSuccess && context.message === "Registration successful";

  return (
    <div className="w-full universal min-h-screen p-5 mt-16">
      <div className="fixed_width universal">
        <div className="max-w-[500px] w-full p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm flex flex-col gap-2">
          <h1 className="capitalize text-2xl font-semibold">
            Register Account
          </h1>

          {/* ROLE SELECT */}
          <div className="flex gap-5">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={context.role === "customer"}
                onChange={() => context.setRole("customer")}
              />
              Customer
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={context.role === "reseller"}
                onChange={() => context.setRole("reseller")}
              />
              Reseller
            </label>
          </div>

          <form
            onSubmit={async(e) => {
              e.preventDefault();
               await context.registerUser();
            }}
            className="flex flex-col gap-1"
          >
            {/* CUSTOMER */}
            {context.role === "customer" && (
              <>
                <p className="font-semibold">Full Name</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-sm py-1 px-3"
                  value={context.fullName}
                  onChange={(e) => context.setFullName(e.target.value)}
                />
              </>
            )}

            {/* RESELLER */}
            {context.role === "reseller" && (
              <>
                <p className="font-semibold">Shop Name</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-sm py-1 px-3"
                  value={context.shopName}
                  onChange={(e) => context.setShopName(e.target.value)}
                />

                <p className="font-semibold">Shop Location</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-sm py-1 px-3"
                  value={context.location}
                  onChange={(e) => context.setLocation(e.target.value)}
                />

                <p className="font-semibold">Reseller Full Name</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-sm py-1 px-3"
                  value={context.resellerName}
                  onChange={(e) => context.setResellerName(e.target.value)}
                />
              </>
            )}

            {/* EMAIL / PHONE */}
            <p className="font-semibold">Email</p>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-sm py-1 px-3"
              value={context.email}
              onChange={(e) => context.setEmail(e.target.value)}
            />

            <p className="font-semibold">Phone</p>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-sm py-1 px-3"
              value={context.phone}
              onChange={(e) => context.setPhone(e.target.value)}
            />

            {/* PASSWORD */}
            <p className="font-semibold">Password</p>
            <div className="relative">
              <input
                type={context.showPass ? "text" : "password"}
                className="w-full border border-gray-300 rounded-sm py-1 px-3 pr-10"
                value={context.password}
                onChange={(e) => context.setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => context.setShowPass(!context.showPass)}
              >
                {context.showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <p className="font-semibold">Confirm Password</p>
            <div className="relative">
              <input
                type={context.showConfirm ? "text" : "password"}
                className="w-full border border-gray-300 rounded-sm py-1 px-3 pr-10"
                value={context.confirm}
                onChange={(e) => context.setConfirm(e.target.value)}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => context.setShowConfirm(!context.showConfirm)}
              >
                {context.showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* BUTTON WITH MESSAGE INSIDE */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-1 rounded-sm font-semibold text-lg my-3 cursor-pointer
                ${
                  isLoading
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-[#FFCE1B] hover:bg-[#fdc701]"
                }
              `}
            >
              {typeof context.message === "string" && context.message !== "" ? context.message : "Register"}

            </button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
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

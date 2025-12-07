"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useAppContext } from "@/src/context/AppContext";

export default function SignupPage() {
  const context = useAppContext();

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
                checked={context.role === "customer"}
                onChange={() => context.setRole("customer")}
              />
              Customer
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="reseller"
                checked={context.role === "reseller"}
                onChange={() => context.setRole("reseller")}
              />
              Reseller
            </label>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              context.registerUser();
            }}
            className="flex flex-col gap-1.5"
          >

            {/* CUSTOMER FORM */}
            {context.role === "customer" && (
              <>
                <p className="font-semibold">Full Name</p>
                <div className="border rounded-sm mb-1">
                  <input
                    type="text"
                    className="w-full outline-none py-1 px-3"
                    placeholder="Your full name"
                    value={context.fullName}
                    onChange={(e) => {
                      context.setFullName(e.target.value);
                      if (!e.target.value.trim())
                        context.setErrorName("Full name is required.");
                      else context.setErrorName("");
                    }}
                  />
                </div>
                {context.errorName && <p className="text-red-600 text-sm mb-2">{context.errorName}</p>}
              </>
            )}

            {/* RESELLER FORM */}
            {context.role === "reseller" && (
              <>
                <p className="font-semibold">Shop Name</p>
                <div className="border rounded-sm mb-1">
                  <input
                    type="text"
                    className="w-full outline-none py-1 px-3"
                    placeholder="Shop Name"
                    value={context.shopName}
                    onChange={(e) => context.setShopName(e.target.value)}
                  />
                </div>
                {context.errorShop && <p className="text-red-600 text-sm mb-2">{context.errorShop}</p>}

                <p className="font-semibold">Shop Location</p>
                <div className="border rounded-sm mb-1">
                  <input
                    type="text"
                    className="w-full outline-none py-1 px-3"
                    placeholder="Shop Location"
                    value={context.location}
                    onChange={(e) => context.setLocation(e.target.value)}
                  />
                </div>
                {context.errorLocation && <p className="text-red-600 text-sm mb-2">{context.errorLocation}</p>}

                <p className="font-semibold">Reseller Full Name</p>
                <div className="border rounded-sm mb-1">
                  <input
                    type="text"
                    className="w-full outline-none py-1 px-3"
                    placeholder="Reseller Name"
                    value={context.resellerName}
                    onChange={(e) => context.setResellerName(e.target.value)}
                  />
                </div>
                {context.errorResellerName && (
                  <p className="text-red-600 text-sm mb-2">{context.errorResellerName}</p>
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
                value={context.emailOrPhone}
                onChange={(e) => context.validateEmailOrPhone(e.target.value)}
              />
            </div>
            {context.errorEmailPhone && (
              <p className="text-red-600 text-sm mb-2">{context.errorEmailPhone}</p>
            )}

            <p className="font-semibold">Password</p>
            <div className="border rounded-sm mb-1 relative">
              <input
                type={context.showPass ? "text" : "password"}
                className="w-full outline-none py-1 px-3 pr-10"
                placeholder="Password"
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
            {context.errorPassword && (
              <p className="text-red-600 text-sm mb-2">{context.errorPassword}</p>
            )}

            <p className="font-semibold">Confirm Password</p>
            <div className="border rounded-sm mb-1 relative">
              <input
                type={context.showConfirm ? "text" : "password"}
                className="w-full outline-none py-1 px-3 pr-10"
                placeholder="Confirm Password"
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
            {context.errorConfirm && (
              <p className="text-red-600 text-sm mb-2">{context.errorConfirm}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#FFCE1B] hover:bg-[#fdc701] duration-300 py-1 rounded-sm font-semibold text-lg my-3"
            >
              Register
            </button>

            {/* MESSAGE */}
            {context.message && (
              <p
                className={`text-base font-semibold mb-2 ${
                  context.isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {context.message}
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

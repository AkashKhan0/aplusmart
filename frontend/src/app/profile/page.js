"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosCard } from "react-icons/io";
import { FaBoxOpen, FaUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BsShop } from "react-icons/bs";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PROFILE =================
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userauth/profile`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/userauth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full h-fit min-h-screen flex justify-center">
      <div className="fixed_width h-full p-5 universal_column">
        {/* ================= HEADER ================= */}
        <div className="w-full max-w-[1000px] flex items-center justify-between gap-2 my-5">
          <div className="w-full flex items-center justify-start gap-1.5">
            <div className="universal">
              {user?.role === "reseller" ? (
                <BsShop className="text-[#2B2A29] text-6xl" />
              ) : (
                <FaUser className="text-[#2B2A29] text-6xl" />
              )}
            </div>

            <div>
              <h1 className="font-medium text-[12px] capitalize">
                welcome!
              </h1>

              <h1 className="text-xl font-semibold capitalize block sm:hidden">
                {user?.fullName || user?.resellerName}
              </h1>

              <h1 className="text-xl font-semibold capitalize hidden sm:block">
                {user?.fullName || user?.resellerName}
              </h1>

              <p className="text-[12px] text-gray-700">
                {user?.email}
              </p>

              {user?.shopName && (
                <p className="text-[12px] text-gray-700">
                  {user.shopName}
                </p>
              )}
            </div>
          </div>

          <div className="w-fit flex items-center justify-end gap-5">
            <div className="w-fit universal_column">
              <p className="text-base font-medium">Points</p>
              <p className="text-xl font-semibold text-[#931905]">
                <strong>0</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ================= DASHBOARD ================= */}
        <div className="w-full mt-5 flex flex-col sm:flex-row md:flex-row items-stretch gap-5">
          {/* ===== Sidebar ===== */}
          <div className="w-full sm:w-[300px] flex flex-row sm:flex-col md:flex-col gap-3">
            <div className="py-2 px-0 sm:px-5 md:px-5 transition-all duration-300 shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-2 cursor-pointer w-full">
              <div className="w-10 h-10 border rounded-full universal text-3xl text-[#931905] p-2">
                <HiClipboardDocumentList />
              </div>
              <p className="text-[12px] sm:text-base capitalize">Orders</p>
            </div>

            <div className="py-2 px-0 sm:px-5 md:px-5 transition-all duration-300 shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-2 cursor-pointer w-full">
              <div className="w-10 h-10 border rounded-full universal text-3xl text-[#931905] p-2">
                <IoIosCard />
              </div>
              <p className="text-[12px] sm:text-base capitalize">
                Transactions
              </p>
            </div>

            <div className="w-full flex mb-3 py-2 px-0 sm:px-5 md:px-5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-1.5 text-red-600 text-sm font-semibold hover:text-red-700 transition-all duration-300 cursor-pointer"
              >
                <FiLogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {/* ===== Main Content ===== */}
          <div className="w-full p-5 h-fit max-h-[500px] overflow-x-auto overflow-y-auto shadow-lg">
            <h1>Content will be show here</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

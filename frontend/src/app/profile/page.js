"use client";

import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosCard } from "react-icons/io";
import { FaBoxOpen, FaUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { useAppContext } from "@/src/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading, greeting, activeTab, setActiveTab, handleLogout } =
    useAppContext();
    const router = useRouter();

  // ✅ HARD FIX — prevent null crash
 useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!user) return null;

  const firstWord = (name) => name?.split(" ")[0];

  const orders = [];
  const transactions = [];

  const renderContent = () => {
    if (activeTab === "orders" && !orders.length)
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FaBoxOpen size={40} className="mb-4" />
          <p>No orders found.</p>
        </div>
      );

    if (activeTab === "transactions" && !transactions.length)
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <MdOutlinePayment size={40} className="mb-4" />
          <p>No transactions found.</p>
        </div>
      );
  };

  return (
    <div className="w-full h-fit min-h-screen flex justify-center">
      <div className="fixed_width h-full p-5 universal_column">
        {/* Header */}
        <div className="w-full max-w-[1000px] flex items-center justify-between gap-2 my-5">
          <div className="w-full flex items-center justify-start gap-1.5">
            <div className="universal">
              {user.role === "customer" && (
                <FaUser className="text-[#2B2A29] text-6xl" />
              )}
              {user.role === "reseller" && (
                <BsShop className="text-[#2B2A29] text-6xl" />
              )}
            </div>

            <div>
              <h1 className="font-medium text-[12px] capitalize">
                {greeting}!
              </h1>

              <h1 className="text-xl font-semibold capitalize block sm:hidden">
                {firstWord(
                  user.role === "customer" ? user.fullName : user.resellerName
                )}
              </h1>

              <h1 className="text-xl font-semibold capitalize hidden sm:block">
                {user.role === "customer" ? user.fullName : user.resellerName}
              </h1>

              <p className="text-[12px] text-gray-700">
                {user.role === "customer" ? user.emailOrPhone : user.shopName}
              </p>
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

        {/* Dashboard Grid */}
        <div className="w-full mt-5 flex flex-col sm:flex-row md:flex-row items-stretch gap-5">
          {/* Sidebar */}
          <div className="w-full sm:w-[300px] flex flex-row sm:flex-col md:flex-col gap-3">
            {/* Orders */}
            <div
              onClick={() => setActiveTab("orders")}
              className={`py-2 px-0 sm:px-5 md:px-5 transition-all duration-300 shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-2 cursor-pointer w-full
                ${
                  activeTab === "orders"
                    ? "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                    : "hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                }
              `}
            >
              <div className="w-10 h-10 border rounded-full universal text-3xl text-[#931905] p-2">
                <HiClipboardDocumentList />
              </div>
              <p className="text-[12px] sm:text-base capitalize">Orders</p>
            </div>

            {/* Transactions */}
            <div
              onClick={() => setActiveTab("transactions")}
              className={`py-2 px-0 sm:px-5 md:px-5 transition-all duration-300 shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-2 cursor-pointer w-full
                ${
                  activeTab === "transactions"
                    ? "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                    : "hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                }
              `}
            >
              <div className="w-10 h-10 border rounded-full universal text-3xl text-[#931905] p-2">
                <IoIosCard />
              </div>
              <p className="text-[12px] sm:text-base capitalize">
                Transactions
              </p>
            </div>

            {/* Logout */}
            <div className="w-full flex mb-3 py-2 px-0 sm:px-5 md:px-5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-1.5 text-red-600 text-sm font-semibold hover:text-red-700 transition-all duration-300 cursor-pointer"
              >
                <FiLogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full p-5 h-fit max-h-[500px] overflow-y-auto shadow-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

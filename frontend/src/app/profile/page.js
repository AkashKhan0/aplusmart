"use client";

import { useEffect, useState } from "react";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosCard } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/src/lib/getUser";
import { FaUser } from "react-icons/fa";
import { BsShop } from "react-icons/bs";

export default function ProfilePage() {
  const [greeting, setGreeting] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const router = useRouter();
  const firstWord = (name) => name?.split(" ")[0];

  const orders = [];
  const transactions = [];

  // Greeting
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting("Good Morning");
      else if (hour >= 12 && hour < 16) setGreeting("Good Afternoon");
      else if (hour >= 16 && hour < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch profile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    async function loadProfile() {
      const data = await getUserProfile();

      if (!data || data.error) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        router.push("/login");
        return;
      }

      setUser(data);
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  // Tab content
  const renderContent = () => {
    if (activeTab === "orders") {
      if (!orders.length) {
        return (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <FaBoxOpen size={40} className="mb-4" />
            <p>No orders found.</p>
          </div>
        );
      }
    }

    if (activeTab === "transactions") {
      if (!transactions.length) {
        return (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <MdOutlinePayment size={40} className="mb-4" />
            <p>No transactions found.</p>
          </div>
        );
      }
    }
  };

  return (
    <div className="w-full h-fit min-h-screen flex justify-center">
      <div className="fixed_width h-full p-5 universal_column">
        {/* Header */}
        <div className="w-full max-w-[1000px] flex items-center justify-between gap-2 my-5">
          <div className="w-full flex items-center justify-start gap-1.5">
            <div className="universal ">
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

              {/* Customer Name */}
              {user.role === "customer" && (
                <>
                  {/* Mobile → First Word */}
                  <h1 className="text-xl font-semibold capitalize block sm:hidden">
                    {firstWord(user.fullName)}
                  </h1>

                  {/* Desktop → Full Name */}
                  <h1 className="text-xl font-semibold capitalize hidden sm:block">
                    {user.fullName}
                  </h1>
                </>
              )}

              {/* Reseller Name */}
              {user.role === "reseller" && (
                <>
                  {/* Mobile → First Word */}
                  <h1 className="text-xl font-semibold capitalize block sm:hidden">
                    {firstWord(user.resellerName)}
                  </h1>

                  {/* Desktop → Full Name */}
                  <h1 className="text-xl font-semibold capitalize hidden sm:block">
                    {user.resellerName}
                  </h1>
                </>
              )}

              {user.role === "customer" && (
                <p className="text-[12px]">{user.emailOrPhone}</p>
              )}

              {/* Shop Name — only for reseller */}
              {user.role === "reseller" && (
                <p className="text-[12px] text-gray-700 capitalize">
                  <strong>{user.shopName}</strong>
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

            {/* Logout Button */}
            <div className="w-full flex mb-3 py-2 px-0 sm:px-5 md:px-5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-1.5 text-red-600 text-sm font-semibold hover:text-red-700 transition-all duration-300 cursor-pointer"
              >
                <FiLogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="w-full p-5 h-fit max-h-[500px] overflow-y-auto shadow-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosCard } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { useAppContext } from "@/src/context/AppContext";
import Orders from "@/src/components/Orders";
import Transactions from "@/src/components/Transactions";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setCart, setUser } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]); // store orders from Orders component
  const [totalPoints, setTotalPoints] = useState(0);

  // ================= FETCH PROFILE =================
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userauth/profile`, {
      method: "GET",
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

  // ================= CALCULATE POINTS =================
  // useEffect(() => {
  //   const calculatePoints = () => {
  //     const now = new Date();
  //     let points = 0;

  //     orders.forEach((order) => {
  //       if (!order.points || !order.createdAt) return;

  //       const orderDate = new Date(order.createdAt);
  //       const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

  //       if (diffDays < 30) {
  //         points += order.points;
  //       }
  //     });

  //     setTotalPoints(points);
  //   };

  //   calculatePoints();

  //   const interval = setInterval(calculatePoints, 60 * 1000); // auto update
  //   return () => clearInterval(interval);
  // }, [orders]);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userauth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setCart([]);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full h-fit min-h-screen flex justify-center">
      <div className="fixed_width h-full p-3 universal_column">
        {/* ================= HEADER ================= */}
        <div className="w-full max-w-[1000px] flex flex-col sm:flex-row md:flex-row items-center justify-between gap-2 my-5">
          <div className="w-full flex items-center justify-center sm:justify-start md:justify-start gap-2.5">
            <div className="universal">
              {user?.role === "reseller" ? (
                <BsShop className="text-[#2B2A29] text-4xl sm:text-5xl" />
              ) : (
                <FaUser className="text-[#2B2A29] text-4xl sm:text-5xl" />
              )}
            </div>

            <div>
              <h1 className="font-medium text-[12px] capitalize">welcome!</h1>

              <h1 className="text-xl font-semibold capitalize block sm:hidden">
                {user?.fullName || user?.resellerName}
              </h1>

              <h1 className="text-xl font-semibold capitalize hidden sm:block">
                {user?.fullName || user?.resellerName}
              </h1>
            </div>
          </div>

          <div className="w-full sm:w-fit md:w-fit flex items-center justify-between sm:justify-end md:justify-end gap-5">
            <div className="w-fit universal_column">
              <p className="text-base font-medium flex items-center">
                Points <span className="text-xs">⭐</span>
              </p>
              <p className="text-xl font-semibold text-[#931905]">
                <strong>{user?.points}</strong>
              </p>
            </div>

            <div
              className="flex items-stretch gap-0 cursor-pointer"
              onClick={handleLogout}
            >
              <p className="text-red-600 rotate-90 text-[10px] font-bold">
                logout
              </p>
              <p className="text-red-600 text-4xl">
                <FiLogOut />
              </p>
            </div>
          </div>
        </div>

        {/* ================= DASHBOARD ================= */}
        <div className="w-full mt-5 flex flex-col sm:flex-row md:flex-row items-stretch gap-5">
          {/* ===== Sidebar ===== */}
          <div className="w-full sm:w-[300px] flex flex-row sm:flex-col md:flex-col gap-3 items-stretch justify-between h-full ">
            <div
              onClick={() => setTab("orders")}
              className={`py-2 px-0 sm:px-5 md:px-5 transition-all duration-300 shadow-lg ${
                tab === "orders" && "font-bold"
              } rounded-sm flex flex-col sm:flex-row items-center gap-2 cursor-pointer w-full`}
            >
              <div className="w-10 h-10 border rounded-full universal text-3xl text-[#931905] p-2">
                <HiClipboardDocumentList />
              </div>
              <p className="text-[12px] sm:text-base capitalize">Orders</p>
            </div>

            <div
              onClick={() => setTab("transactions")}
              className={`py-2 px-0 sm:px-5 md:px-5 transition-all duration-300 shadow-lg rounded-sm flex flex-col sm:flex-row items-center gap-2 cursor-pointer w-full ${
                tab === "transactions" && "font-bold"
              }`}
            >
              <div className="w-10 h-10 border rounded-full universal text-3xl text-[#931905] p-2">
                <IoIosCard />
              </div>
              <p className="text-[12px] sm:text-base capitalize">
                Transactions
              </p>
            </div>
          </div>

          {/* ===== Main Content ===== */}
          <div className="w-full h-fit max-h-[500px] overflow-x-auto overflow-y-auto shadow-lg">
            {tab === "orders" && <Orders onOrdersFetch={setOrders} />}
            {tab === "transactions" && <Transactions />}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import Maincategory from "./Maincategory";
import Addproduct from "./Addproduct";
import Offers from "./Offers";
import Combo from "./Combo";
import Faq from "./Faq";
import ProductList from "./ProductList";
import OfferList from "./OfferList";
import ComboList from "./ComboList";
import Orderlist from "./Orderlist";

export default function Dashboard() {
  const router = useRouter();

  const tabs = [
    {
      id: 1,
      label: "categorys",
      component: <Maincategory />,
    },
    {
      id: 2,
      label: "products",
      component: <Addproduct />,
    },
    {
      id: 3,
      label: "offers",
      component: <Offers />,
    },
    { id: 4, label: "combo", component: <Combo /> },
    { id: 5, label: "faq", component: <Faq /> },
    { id: 6, label: "Products list", component: <ProductList /> },
    { id: 7, label: "Offer list", component: <OfferList /> },
    { id: 8, label: "Combo list", component: <ComboList /> },
    { id: 9, label: "Order list", component: <Orderlist /> },
    // add more tabs here
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/login");
  }, []);

  return (
    <>
      <div className="w-full h-[60px] universal bg-[#2B2A29] sticky top-0 z-50">
        <div className="fixed_width h-full px-5 flex items-center justify-between py-2">
          <div className="w-[20%]">
            <Image
              src="/logo.png"
              alt="A Plus Mart BD"
              width={50}
              height={30}
              className="object-contain min-w-20"
            />
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/login");
            }}
            className="px-3 py-1 bg-red-600 text-white rounded flex items-center justify-center gap-3 hover:bg-red-700 transition-colors duration-300"
          >
            Logout <MdLogout />
          </button>
        </div>
      </div>

      {/* content section */}
      <div className="w-full h-full universal">
        <div className="fixed_width h-full px-5 flex items-center justify-between py-2">
          <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-2.5">
            {/* side bar */}
            <div className="w-full sm:w-[20%] p-2 border flex flex-col gap-2.5 h-[calc(100vh-75px)] overflow-y-scroll">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`admin_tabs ${
                    activeTab === tab.id
                      ? "bg-[#686866] text-[#FFFFFF]"
                      : "hover:bg-[#686866]"
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {/* content area */}
            <div className="w-full sm:w-[80%] p-2 border h-[calc(100vh-75px)] overflow-y-scroll">
              {tabs.find((tab) => tab.id === activeTab)?.component}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { FaCaretDown, FaSearch, FaUser } from "react-icons/fa";
import { BsCartFill, BsFire } from "react-icons/bs";
import { LuPackagePlus } from "react-icons/lu";
import HeroCarousel from "./HeroCarousel";
import { useAppContext } from "../context/AppContext";
import { useEffect, useRef, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { Reggae_One } from "next/font/google";
import { useRouter } from "next/navigation";

const reggaeOne = Reggae_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Hero({ openMenu }) {
  const { user, search, setSearch, handleSearch, cart } = useAppContext();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const uniqueCategories = [
    ...new Map(categories.map((cat) => [cat.mainCategory, cat])).values(),
  ];

  const handleSeller = (e) => {
    e.stopPropagation(); // 🔥 parent click বন্ধ
    e.preventDefault(); // 🔥 default action বন্ধ

    if (!user) return;

    if (user.role === "reseller") {
      setShowMessage(true);
      return;
    }

    router.push("/offers");
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="w-full h-fit universal bg-[#FFCE1B] relative">
      <div className="drip drip1"></div>
      <div className="drip drip2"></div>
      <div className="drip drip3"></div>
      <div className="drip drip4"></div>
      <div className="drip drip5"></div>
      <div className="drip drip6"></div>

      <div className="w-full h-20 absolute -bottom-12">
        <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="absolute bottom-0 left-0 w-full h-[50px]"
  >
    <path
      fill="#FFCE1B"
      fillOpacity="1"
      d="M0,64L15,74.7C30,85,60,107,90,128C120,149,150,171,180,160C210,149,240,107,270,80C300,53,330,43,360,58.7C390,75,420,117,450,133.3C480,149,510,139,540,133.3C570,128,600,128,630,160C660,192,690,256,720,245.3C750,235,780,149,810,133.3C840,117,870,171,900,170.7C930,171,960,117,990,117.3C1020,117,1050,171,1080,181.3C1110,192,1140,160,1170,160C1200,160,1230,192,1260,202.7C1290,213,1320,203,1350,170.7C1380,139,1410,85,1425,58.7L1440,32L1440,0L0,0Z"
    />
  </svg>
      </div>

      <div className="fixed_width h-full">
        {/* Top offers/deals/combo bar */}
        <div className="w-full flex items-start justify-center top_nav_bar">
          <div className="w-full max-w-[900px] bg-[#2B2A29] top_bg_nav">
            <div className="w-full h-full flex items-center justify-center gap-5 text-[#FFFFFF] font-semibold relative">
              <button
                type="button"
                className="hero_top cursor-pointer"
                onClick={handleSeller}
              >
                <BsFire className="text-[#FFCE1B]" />
                <span className="hidden sm:block">supper</span> offers
              </button>
              {/* Toast Message */}

              <Link href="/combo">
                <div className="hero_top">
                  <LuPackagePlus className="text-[#FFCE1B]" />
                  combo <span className="hidden sm:block">packages</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Logo + Menu/Search/Account/Cart */}
        <div className="flex flex-col items-center justify-center gap-2.5 w-full">
          {/* logo */}
          <div className="w-full max-w-fit universal my-5 filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))]">
            <h1
              className={`${reggaeOne.className} text-[#971900] hover:text-[#590000] transition-colors duration-300 text-xl sm:text-2xl md:text-3xl font-bold aplus_mart_logo`}
            >
              A Plus Mart BD
            </h1>
          </div>

          {/* menu search bar account cart */}
          <div className="w-full max-w-[900px] flex items-center justify-between gap-5 px-5 sm:px-10 md:px-5">
            <div className="w-fit sm:w-full md:w-full flex items-center justify-between gap-2.5">
              <div
                className="font-semibold text-4xl cursor-pointer"
                onClick={openMenu}
              >
                <IoMdMenu />
              </div>

              <div className="font-medium text-base bg-[#2B2A29] rounded-[50px] universal gap-2.5 text-[#ffffff]">
                <div
                  className="relative hidden sm:flex md:flex"
                  ref={dropdownRef}
                >
                  {/* Button */}
                  <div
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer px-4 font-medium text-base bg-[#2B2A29] hover:bg-[#ffffff] hover:text-[#2B2A29] duration-300 rounded-[50px] universal gap-2.5 text-[#ffffff] flex items-center justify-between min-w-[100px] py-1 overflow-hidden"
                  >
                    <p className="capitalize">{selected || "Category"}</p>
                    <FaCaretDown />
                  </div>

                  {/* Dropdown */}
                  {open && (
                    <div className="absolute left-0 top-8 w-full min-w-[124px] bg-[#2B2A29] shadow-lg z-50 category_sing">
                      {uniqueCategories.map((cat) => (
                        <Link
                          className="w-full"
                          key={cat._id}
                          href={`/search?mainCategory=${encodeURIComponent(
                            cat.mainCategory,
                          )}`}
                        >
                          <div
                            onClick={() => {
                              setSelected(cat.mainCategory);
                              setOpen(false);
                            }}
                            className="px-2 text-sm w-full py-1 border-b border-b-[#333333] text-white hover:bg-[#3a3938] cursor-pointer capitalize"
                          >
                            {cat.mainCategory}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Search form */}
              <form
                onSubmit={handleSearch}
                className="w-full overflow-hidden items-center gap-0 bg-[#F8EED4] rounded-[50px] filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))] hidden sm:flex md:flex"
              >
                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-[3px] px-2 outline-0"
                />
                <div className="px-2 bg-[#2B2A29] py-1 text-[#ffffff]">
                  <button type="submit">
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>

            {/* Account + Cart */}
            <div className="w-fit flex items-center justify-end gap-2.5">
              {/* profile */}
              <Link href={user ? "/profile" : "/login"}>
                <div
                  // onClick={handleAccountClick}
                  className="py-1 px-0 sm:px-4 md:px-4 font-medium bg-transparent sm:bg-[#F8EED4] md:bg-[#F8EED4] md:hover:bg-[#2B2A29] md:hover:text-[#ffffff] rounded-[50px] universal gap-2.5 text-[#2B2A29] duration-300 text-base cursor-pointer active:translate-y-1 active:shadow-[0_2px_0_#d1a900]"
                >
                  <p className="capitalize hidden sm:block">
                    {user ? "profile" : "login"}
                  </p>
                  <span className="relative">
                    <FaUser size={24} />
                  </span>
                </div>
              </Link>

              {/* cart */}
              <Link href="/cart">
                <div className="flex items-center gap-1 text-base relative">
                  <BsCartFill size={32} />

                  {cart.length > 0 ? (
                    <span className="text-[#FFFFFF] rounded-full universal absolute top-1.5 left-3 font-medium text-xs">
                      {cart.length}
                    </span>
                  ) : (
                    <span className="text-[#FFFFFF] rounded-full universal absolute top-1.5 left-3 font-medium text-xs">
                      0
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {/* mobile search bar */}
          <div className="block sm:hidden md:hidden w-full px-5 mt-3">
            <form
              onSubmit={handleSearch}
              className="w-full overflow-hidden flex items-center gap-0 bg-[#F8EED4] rounded-[50px] filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))]"
            >
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-[3px] px-2 outline-0"
              />
              <div className="px-2 bg-[#2B2A29] py-1 text-[#ffffff]">
                <button type="submit">
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>

          {/* slider images and text */}
          <HeroCarousel />
        </div>

        {showMessage && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-center py-1 px-3 rounded shadow-lg animate-slideDown fade-in-out z-50">
            Sorry! This page is only for customer users.
          </div>
        )}
      </div>
    </div>
  );
}

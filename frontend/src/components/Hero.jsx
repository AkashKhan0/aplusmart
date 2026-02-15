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
    <div className="w-full h-fit universal bg-[#FFCE1B]">
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
          <div className="w-full max-w-fit universal mt-5 filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))]">
            <h1
              className={`${reggaeOne.className} text-[#971900] hover:text-[#590000] transition-colors duration-300 text-xl sm:text-2xl md:text-3xl font-bold mb-1.5`}
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
                  className="py-1 px-0 sm:px-4 md:px-4 font-medium bg-transparent sm:bg-[#F8EED4] md:bg-[#F8EED4] md:hover:bg-[#2B2A29] md:hover:text-[#ffffff] rounded-[50px] universal gap-2.5 text-[#2B2A29] duration-300 text-base cursor-pointer"
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

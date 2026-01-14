"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { FaCaretDown, FaSearch, FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { LuPackagePlus } from "react-icons/lu";
import HeroCarousel from "./HeroCarousel";
import { useAppContext } from "../context/AppContext";
import { useEffect, useRef, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { Reggae_One } from "next/font/google";

const reggaeOne = Reggae_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Hero({ openMenu }) {
  const { search, setSearch, handleSearch, cart } = useAppContext();

  const dropdownRef = useRef(null);

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

  return (
    <div className="w-full h-fit universal bg-[#FFCE1B]">
      <div className="fixed_width h-full">
        {/* Top offers/deals/combo bar */}
        <div className="w-full flex items-start justify-center top_nav_bar">
          <div className="w-full max-w-[900px] bg-[#2B2A29] top_bg_nav">
            <div className="w-full h-full flex items-center justify-center gap-5 text-[#FFFFFF] font-semibold">
              <Link href="/offers">
                <div className="hero_top">
                  <BsFire className="text-[#FFCE1B]" />
                  supper offers
                </div>
              </Link>
              <Link href="/combo">
                <div className="hero_top">
                  <LuPackagePlus className="text-[#FFCE1B]" />
                  combo packages
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
          <div className="w-full max-w-[900px] flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center justify-center gap-5 px-5 sm:px-16 md:px-0">
            <div className="w-full flex items-center justify-between gap-5">
              <div
                className="font-semibold text-4xl cursor-pointer"
                onClick={openMenu}
              >
                <IoMdMenu />
              </div>

              <div className="font-medium text-base bg-[#2B2A29] rounded-sm universal gap-2.5 text-[#ffffff] category_btn">
                <div className="relative" ref={dropdownRef}>
                  {/* Button */}
                  <div
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer px-4 font-medium text-base bg-[#2B2A29] hover:bg-[#ffffff] hover:text-[#2B2A29] duration-300 rounded-sm universal gap-2.5 text-[#ffffff] category_btn flex items-center justify-between min-w-[100px] py-1"
                  >
                    <p className="capitalize">{selected || "Category"}</p>
                    <FaCaretDown />
                  </div>

                  {/* Dropdown */}
                  {open && (
                    <div className="absolute left-0 w-full bg-[#2B2A29] shadow-lg z-50">
                      {categories.map((cat) => (
                        <Link
                          key={cat._id}
                          href={`/search?mainCategory=${encodeURIComponent(
                            cat.mainCategory
                          )}`}
                        >
                          <div
                            onClick={() => {
                              setSelected(cat.mainCategory);
                              setOpen(false);
                            }}
                            className="px-4 w-full py-1 border-b border-b-[#333333] text-white hover:bg-[#3a3938] cursor-pointer capitalize"
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
                className="w-full overflow-hidden flex items-center gap-0 bg-[#F8EED4] rounded-sm filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))]"
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
            <div className="w-full sm:w-full md:w-fit flex items-center justify-between gap-5">
              <Link href="/profile">
                <div
                  // onClick={handleAccountClick}
                  className="py-1 px-0 sm:px-0 md:px-4 font-medium bg-transparent sm:bg-transparent md:bg-[#F8EED4] md:hover:bg-[#2B2A29] md:hover:text-[#ffffff] rounded-sm universal gap-2.5 text-[#2B2A29] duration-300 text-base cursor-pointer"
                >
                  <p className="capitalize">account</p> <FaUser />
                </div>
              </Link>

              <Link href="/cart">
                <div className="flex items-center gap-1 text-base relative">
                  <IoCart />

                  {cart.length > 0 ? (
                    <span className="text-[#931905] rounded-full universal absolute -top-3 left-2 font-bold">
                      {cart.length}
                    </span>
                  ) : (
                    <span className="text-[#931905] rounded-full universal absolute -top-3 left-2 font-bold">
                      0
                    </span>
                  )}

                  <p className="uppercase font-medium flex items-center gap-1 filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))]">
                    cart
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* slider images and text */}
          <HeroCarousel />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaHome, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import { Reggae_One } from "next/font/google";
import { GiHamburgerMenu } from "react-icons/gi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const reggaeOne = Reggae_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Universalnav({ openMenu, fixedOnTop }) {
  const { user, search, setSearch, handleSearch, cart } = useAppContext();
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();

        // 👉 Group by mainCategory
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.mainCategory]) {
            acc[item.mainCategory] = [];
          }
          acc[item.mainCategory].push(item.subCategory);
          return acc;
        }, {});

        setMenuData(grouped);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div
        className={`w-full h-fit universal_column bg-[#2B2A29] text-[#FFFFFF] z-50 transition-all duration-300 ease-out ${
          fixedOnTop ? "fixed top-0 left-0 opacity-100" : "relative"
        }`}
      >
        <div className="fixed_width flex justify-center h-13 px-5 py-2">
          <div className="w-full flex items-center justify-between gap-2.5 md:gap-5">
            <div className="w-full flex items-center justify-between gap-2.5 md:gap-5">
              <div className="w-full max-w-fit md:universal">
                <Link href="/">
                  <h1
                    className={`${reggaeOne.className} text-[#971900] text-2xl hidden md:block cursor-pointer`}
                  >
                    A Plus Mart BD
                  </h1>
                  <h1
                    className={`${reggaeOne.className} text-[#ffffff] hover:text-[#ffffff] transition-colors duration-300 text-2xl block md:hidden cursor-pointer`}
                  >
                    <FaHome />
                  </h1>
                </Link>
              </div>
              <div
                className="font-semibold text-3xl cursor-pointer"
                onClick={openMenu}
              >
                <IoMdMenu />
              </div>

              <form
                onSubmit={handleSearch}
                className="w-full overflow-hidden flex items-center gap-0 bg-[#F0F8FF]"
              >
                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-[1.5px] px-2 outline-0 text-[#000000]"
                />
                <div className="px-2 hover:bg-[#971900] bg-[#590000] transition-colors duration-300 py-0.5 text-[#ffffff] cursor-pointer overflow-hidden">
                  <button type="submit" className="cursor-pointer">
                    <FaSearch className="-mb-0.5" />
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full max-w-fit md:w-fit  hidden sm:flex md:flex items-center justify-between gap-2.5 md:gap-5">
              <Link href={user ? "/profile" : "/login"}>
                <div className="py-1 px-0 sm:px-0 md:px-4 font-medium bg-transparent sm:bg-transparent hover:md:bg-[#971900] md:bg-[#590000] transition-colors duration-300 rounded-sm universal gap-2.5 text-[#FFFFFF] text-xl md:text-base cursor-pointer">
                  <p className="capitalize hidden md:block">
                    {user ? "profile" : "login"}
                  </p>
                  <FaUser />
                </div>
              </Link>
              <div className="md:fixed md:top-[48%] md:right-0 md:cart_btn md:w-full md:max-w-fit md:px-2 md:py-2 md:rounded-l-md md:cursor-pointer hover:md:bg-[#971900] md:bg-[#590000] transition-colors duration-300 cart_fix_tab_hover">
                <Link href="/cart">
                  <div className="w-fit items-center gap-2 text-xl md:text-base relative text-[#FFFFFF] flex">
                    <FaShoppingCart />
                    <span className="text-[#FFFFFF] rounded-full universal absolute -top-3 md:-top-2 left-3 font-normal text-xs">
                      {cart.length}
                    </span>
                    <p className="capitalize hidden md:block font-medium items-center gap-1.5 text-sm cart_fix_tab">
                      view cart
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Category menu items */}
        <div className="w-full hidden sm:block">
          <div className="w-full universal bg-[#ffffff] filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))]">
            <div className="fixed_width px-5">
              <ul className="flex flex-wrap items-center justify-center gap-1">
                {Object.entries(menuData).map(
                  ([mainCategory, subCategories]) => (
                    <li
                      key={mainCategory}
                      className="relative group cursor-pointer py-1 px-2"
                    >
                      {/* Main Category */}
                      <a
                        href={`/search?mainCategory=${encodeURIComponent(mainCategory)}`}
                        className="font-medium text-gray-800 capitalize"
                      >
                        {mainCategory}
                      </a>

                      {/* Dropdown */}
                      <ul className="absolute left-0 top-full mt-px hidden min-w-[180px] w-fit bg-white shadow-lg group-hover:block z-50 border-t-2 border-t-[#971900]">
                        {subCategories.map((sub, index) => (
                          <li key={index}>
                            <a
                              href={`/search?subCategory=${encodeURIComponent(sub)}`}
                              className="block px-4 py-1 text-base text-gray-700 hover:bg-gray-100 capitalize border-b border-b-gray-300"
                            >
                              {sub}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

        {/* Mobile Footer */}
      <div className="w-full h-14 block sm:hidden md:hidden fixed bottom-0 left- footer_mbl border">
        <div className="universal w-full h-full">
          <div className="w-[95%] bg-[#590000] flex items-center justify-between text-[#FFFFFF] h-full px-3 rounded-full">
            <Link href="/">
              <div className="universal_column gap-0.5 rounded-full mbl_mnu_itm">
                  <FaHome size={20} />
                <p className="text-xs font-medium">Home</p>
              </div>
            </Link>
            <Link href={user ? "/profile" : "/login"}>
              <div className="universal_column gap-0.5 rounded-full mbl_mnu_itm">
                  <FaUser size={18} />
                <p className="text-xs font-medium">
                  {user ? "Profile" : "Login"}
                </p>
              </div>
            </Link>
            <Link href="/cart">
              <div className="universal_column gap-0.5 rounded-full mbl_mnu_itm">
                <div className="relative">
                  <FaShoppingCart />
                  <span className="absolute universal w-4 h-4 rounded-full bg-[#212121] text-xs -top-2 -right-3">
                    {cart.length}
                  </span>
                </div>
                <p className="text-xs font-medium">Cart</p>
              </div>
            </Link>
            <div
              onClick={openMenu}
              className="universal_column gap-0.5 rounded-full mbl_mnu_itm"
            >
              <GiHamburgerMenu />
              <p className="text-xs font-medium">Menu</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

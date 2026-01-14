"use client";

import { IoMdMenu } from "react-icons/io";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import { Reggae_One } from "next/font/google";

const reggaeOne = Reggae_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Universalnav({ openMenu, fixedOnTop }) {
  const { search, setSearch, handleSearch, cart } = useAppContext();

  return (
    <div
      className={`w-full h-fit universal bg-[#2B2A29] text-[#FFFFFF] py-2 z-50 ${
        fixedOnTop ? "fixed top-0 left-0" : "relative"
      }`}
    >
      <div className="fixed_width flex justify-center h-full px-5">
        <div className="w-full flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center justify-center gap-0 sm:gap-0 md:gap-5">
          <div className="w-full flex items-center justify-between gap-5">
            <div className="hidden md:block w-full max-w-fit md:universal">
              <Link href="/">
                <h1 className={`${reggaeOne.className} text-[#971900] text-2xl`}>
                  A Plus Mart BD
                </h1>
              </Link>
            </div>
            <div
              className="font-semibold text-4xl cursor-pointer"
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
                className="w-full py-[3px] px-2 outline-0 text-[#000000]"
              />
              <div className="px-2 hover:bg-[#971900] bg-[#590000] transition-colors duration-300 py-1 text-[#ffffff] cursor-pointer overflow-hidden">
                <button type="submit" className="cursor-pointer">
                  <FaSearch className="-mb-0.5"/>
                </button>
              </div>
            </form>
          </div>

          <div className="w-full sm:w-full md:w-fit flex items-center justify-between gap-5">
            <Link href="/profile">
              <div className="py-1 px-0 sm:px-0 md:px-4 font-medium bg-transparent sm:bg-transparent hover:md:bg-[#971900] md:bg-[#590000] transition-colors duration-300 rounded-sm universal gap-2.5 text-[#FFFFFF] text-base cursor-pointer">
                <p className="capitalize">account</p> <FaUser />
              </div>
            </Link>
            <div className="md:fixed md:top-[48%] md:right-0 md:cart_btn md:w-full md:max-w-fit md:px-2 md:py-1 md:rounded-l-md md:cursor-pointer hover:md:bg-[#971900] md:bg-[#590000] transition-colors duration-300">
              <Link href="/cart">
                <div className="flex items-center gap-1 text-base relative text-[#FFFFFF]">
                  <IoCart />
                  <span className="text-[#FFFFFF] rounded-full universal absolute -top-2 left-2 font-normal text-sm">
                    {cart.length}
                  </span>
                  <p className="uppercase font-medium flex items-center gap-1.5">
                    cart
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

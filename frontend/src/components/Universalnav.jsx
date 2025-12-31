"use client";

import { IoMdMenu } from "react-icons/io";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";

export default function Universalnav({ openMenu, fixedOnTop }) {
  const { search, setSearch, handleSearch, cart } = useAppContext();

  return (
    <div
      className={`w-full h-fit universal bg-[#2B2A29] text-[#FFFFFF] py-2 z-50 ${
        fixedOnTop ? "fixed top-0 left-0" : "relative"
      }`}
    >
      <div className="fixed_width flex justify-center h-full px-5">
        <div className="w-full max-w-[900px] flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center justify-center gap-0 sm:gap-0 md:gap-5 px-0 sm:px-16 md:px-0">
          <div className="w-full flex items-center justify-between gap-5">
            <div className="w-[20%] universal">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="A Plus Mart BD"
                  width={50}
                  height={20}
                  className="object-contain min-w-20"
                />
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
              className="w-full overflow-hidden flex items-center gap-0 bg-[#F0F8FF] rounded-sm"
            >
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-[3px] px-2 outline-0 text-[#000000]"
              />
              <div className="px-2 bg-[#931905] py-1 text-[#ffffff] cursor-pointer">
                <button type="submit">
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>

          <div className="w-full sm:w-full md:w-fit flex items-center justify-between gap-5">
            <Link href="/profile">
              <div className="py-1 px-0 sm:px-0 md:px-4 font-medium bg-transparent sm:bg-transparent md:bg-[#931905] rounded-sm universal gap-2.5 text-[#FFFFFF] text-base cursor-pointer">
                <p className="capitalize">account</p> <FaUser />
              </div>
            </Link>
            <Link href="/cart">
              <div className="flex items-center gap-1 text-base relative text-[#FFFFFF]">
                <IoCart />
                {cart.length > 0 ? (
                  <span className="text-[#FFFFFF] rounded-full universal absolute -top-3 left-2 font-bold">
                    {cart.length}
                  </span>
                ) : (
                  <span className="text-[#FFFFFF] rounded-full universal absolute -top-3 left-2 font-bold">
                    0
                  </span>
                )}
                <p className="uppercase font-medium flex items-center gap-1.5">
                  cart
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";


import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { FaCaretDown, FaSearch, FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import { LuPackagePlus } from "react-icons/lu";
import HeroCarousel from "./HeroCarousel";
import { useAppContext } from "../context/AppContext";

export default function Hero({ openMenu }) {
  const { user, search, setSearch, handleSearch, handleAccountClick, cartCount } = useAppContext();
  const handleAccountButtonClick = () => {
    if (user) {
      handleAccountClick();
    } else {
      handleAccountClick();
    }
  };

  return (
    <div className="w-full h-fit universal bg-[#FFCE1B]">
      <div className="fixed_width h-full px-5">
        {/* Top offers/deals/combo bar */}
        <div className="w-full flex items-start justify-center top_nav_bar">
          <div className="w-full max-w-[900px] bg-[#2B2A29] top_bg_nav">
            <div className="w-full h-full flex items-center justify-center gap-5 text-[#FFFFFF] font-semibold">
              <Link href="/offers">
                <div className="hero_top">
                  <BsFire className="text-[#FFCE1B]" />
                  offers
                </div>
              </Link>
              <Link href="/deals">
                <div className="hero_top">
                  <BiSolidOffer className="text-[#FFCE1B]" />
                  deals
                </div>
              </Link>
              <Link href="/combo">
                <div className="hero_top">
                  <LuPackagePlus className="text-[#FFCE1B]" />
                  combo
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Logo + Menu/Search/Account/Cart */}
        <div className="flex flex-col items-center justify-center gap-2.5 w-full">
          {/* logo */}
          <div className="w-[20%] universal mt-6 mb-3">
            <Image
              src="/logo.png"
              alt="A Plus Mart BD"
              width={100}
              height={50}
              className="object-contain min-w-20"
            />
          </div>

          {/* menu search bar account cart */}
          <div className="w-full max-w-[900px] flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center justify-center gap-5 px-0 sm:px-16 md:px-0">
            <div className="w-full flex items-center justify-between gap-5">
              <div
                className="font-semibold text-4xl cursor-pointer"
                onClick={openMenu}
              >
                <IoMdMenu />
              </div>

              <div className="py-1 px-4 font-medium text-base bg-[#2B2A29] rounded-sm universal gap-2.5 text-[#ffffff] category_btn">
                <p className="capitalize">category</p> <FaCaretDown />
              </div>

              {/* Search form */}
              <form
                onSubmit={handleSearch}
                className="w-full overflow-hidden flex items-center gap-0 bg-[#F8EED4] rounded-sm"
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
              <div
                onClick={handleAccountButtonClick}
                className="py-1 px-0 sm:px-0 md:px-4 font-medium bg-transparent sm:bg-transparent md:bg-[#F8EED4] rounded-sm universal gap-2.5 text-[#2B2A29] text-base cursor-pointer"
              >
                <p className="capitalize">account</p> <FaUser />
              </div>

              <Link href="/cart">
                <div className="flex items-center gap-3 text-base">
                  <IoCart /> <p className="uppercase font-medium flex items-center gap-1.5"><span className="text-[#931905] rounded-full universal">{cartCount}</span>cart</p>
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

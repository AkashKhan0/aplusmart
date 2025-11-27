"use client";

import Image from "next/image";
import { IoMdMenu } from "react-icons/io";
import { FaCaretDown, FaSearch, FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import HeroCarousel from "./HeroCarousel";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero({ openMenu }) {

  const router = useRouter();

  const handleClick = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      // User logged in → profile
      router.push("/profile");
    } else {
      // User not logged in → login page with redirect to current page
      router.push(`/login?redirect=${window.location.pathname}`);
    }
  };


  return (
    <>
      <div className="w-full h-fit universal bg-[#FFCE1B]">
        <div className="fixed_width h-full px-5">
          <div className="w-full flex items-start justify-center top_nav_bar">
            <div className="w-full max-w-[900px] bg-[#2B2A29] top_bg_nav">
              <ul className="w-full h-full flex items-center justify-center gap-5 text-[#FFFFFF] font-semibold">
                <li>New Releases</li>
                <li>Today's Deals</li>
                <li>Customer Service</li>
                <li>Combo Offers</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2.5 w-full">
            {/* logo */}
            <div className="w-[20%] universal my-5">
              <Image
                src="/logo.png"
                alt="A Plus Mart BD"
                width={100}
                height={50}
                className="object-contain min-w-20"
              />
            </div>
            {/* menu search bar accout cart */}
            <div className="w-full max-w-[900px] flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center justify-center gap-5 px-0 sm:px-16 md:px-0">
              <div className="w-full flex items-center justify-between gap-5">
                <div className="font-semibold text-4xl cursor-pointer" onClick={openMenu}>
                  <IoMdMenu />
                </div>
                <div className="py-1 px-4 font-medium text-base bg-[#2B2A29] rounded-sm universal gap-2.5 text-[#ffffff] category_btn">
                  <p className="capitalize">category</p> <FaCaretDown />
                </div>
                <div className="w-full overflow-hidden flex items-center gap-0 bg-[#F8EED4] rounded-sm">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="w-full py-[3px] px-2 outline-0"
                  />
                  <div className="px-2 bg-[#2B2A29] py-2 text-[#ffffff]">
                    <FaSearch />
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-full md:w-fit flex items-center justify-between gap-5">
                  <div onClick={handleClick} className="py-1 px-0 sm:px-0 md:px-4 font-medium bg-transparent sm:bg-transparent md:bg-[#F8EED4] rounded-sm universal gap-2.5 text-[#2B2A29] text-base cursor-pointer">
                    <p className="capitalize">account</p> <FaUser />
                  </div>

                <div className="flex items-center gap-3 text-base">
                  <IoCart /> <p className="uppercase font-medium">cart</p>
                </div>
              </div>
            </div>

            {/* slider images and text */}
            <HeroCarousel />
          </div>
        </div>
      </div>
    </>
  );
}

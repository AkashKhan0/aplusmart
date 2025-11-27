"use client";

import { IoMdMenu } from "react-icons/io";
import { FaCaretDown, FaSearch, FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Universalnav({ openMenu, fixedOnTop }) {
  const router = useRouter();

  const handleClick = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

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
      {/* <div className="w-full h-fit universal bg-[#2B2A29] text-[#FFFFFF] py-10"> */}
      <div
        className={`w-full h-fit universal bg-[#2B2A29] text-[#FFFFFF] py-2 z-50 ${
          fixedOnTop ? "fixed top-0 left-0" : "relative"
        }`}
      >
        <div className="fixed_width flex justify-center h-full px-5">
          {/* menu search bar accout cart */}
          <div className="w-full max-w-[900px] flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center justify-center gap-0 sm:gap-0 md:gap-5 px-0 sm:px-16 md:px-0">
            <div className="w-full flex items-center justify-between gap-5">
              {/* logo */}
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
              <div className="w-full overflow-hidden flex items-center gap-0 bg-[#F0F8FF] rounded-sm">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder=" Search here..."
                  className="w-full py-[3px] px-2 outline-0 text-[#000000]"
                />
                <div className="px-2 bg-[#931905] py-2 text-[#ffffff] cursor-pointer">
                  <FaSearch />
                </div>
              </div>
            </div>

            <div className="w-full sm:w-full md:w-fit flex items-center justify-between gap-5">
              <div
                onClick={handleClick}
                className="py-1 px-0 sm:px-0 md:px-4 font-medium bg-transparent sm:bg-transparent md:bg-[#931905] rounded-sm universal gap-2.5 text-[#FFFFFF] text-base cursor-pointer"
              >
                <p className="capitalize">account</p> <FaUser />
              </div>

              <div className="flex items-center gap-3 text-base">
                <IoCart /> <p className="uppercase font-medium">cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

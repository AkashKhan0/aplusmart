"use client";

import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Reggae_One } from "next/font/google";
import Link from "next/link";

const reggaeOne = Reggae_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar({ isOpen, setIsOpen }) {
  const sidebarRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);

  // Load main categories
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

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, setIsOpen]);

  const sidebarClass = isOpen ? "translate-x-0" : "-translate-x-full";

  const uniqueCategories = [
  ...new Map(categories.map(cat => [cat.mainCategory, cat])).values(),
];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`p-3 w-full sm:w-[50%] md:w-[300px] overflow-y-auto fixed top-0 left-0 h-screen z-50 transform 
    bg-[#2B2A29]/60 backdrop-blur-md border border-white/20 shadow-lg
    ${sidebarClass} transition-transform duration-300`}
      >
        <div
          className="w-[50px] h-[50px] universal text-[#FFFFFF] hover:text-[#971900] transition-colors duration-300 text-3xl fixed top-0 right-0 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <RxCross2 />
        </div>

        <Link href="/">
          <h1
            data-text="A Plus Mart BD"
            className={`${reggaeOne.className} shine-text text-[#971900] hover:text-[#590000] cursor-pointer transition-colors duration-300 text-2xl font-bold my-1.5 text-center`}
          >
            A Plus Mart BD
          </h1>
        </Link>

        <div className="text-[#FFFFFF] font-semibold text-lg w-full mt-5">
          <ul className="w-full flex flex-col gap-1.5 text-base">
            {uniqueCategories.map((cat) => (
              <li
                key={cat._id}
                className="capitalize py-0 px-4 rounded-sm border-b border-b-[#aaaaaa] hover:bg-[#1e29395a] transition-colors duration-300"
              >
                {/* Full page reload link */}
                <a
                  href={`/search?mainCategory=${encodeURIComponent(
                    cat.mainCategory
                  )}`}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-[#8d8d8d] transition-colors cursor-pointer block py-1"
                >
                  {cat.mainCategory}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

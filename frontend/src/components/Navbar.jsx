"use client";

import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

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
        className={`p-5 bg-[#2B2A29] w-full sm:w-[50%] md:w-[300px] overflow-y-auto fixed top-0 left-0 h-screen z-50 transform ${sidebarClass} transition-transform duration-300`}
      >
        <div
          className="w-[50px] h-[50px] universal text-[#FFFFFF] text-3xl fixed top-1 right-1 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <RxCross2 />
        </div>

        <div className="text-[#FFFFFF] font-semibold text-lg w-full mt-10">
          <ul className="w-full flex flex-col gap-2.5 text-base">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/search?subCategory=${encodeURIComponent(
                  cat.subCategory
                )}`}
              >
                <li
                  onClick={() => setIsOpen(false)}
                  className="hover:text-red-500 transition-colors capitalize"
                >
                  {cat.subCategory}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

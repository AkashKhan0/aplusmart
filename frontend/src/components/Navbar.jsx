"use client";

import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

export default function Navbar({ isOpen, setIsOpen }) {
  const sidebarRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [menuData, setMenuData] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);

  // 🔹 Fetch & group categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();

        // 👉 Group by mainCategory + remove duplicates
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.mainCategory]) {
            acc[item.mainCategory] = new Set();
          }
          acc[item.mainCategory].add(item.subCategory);
          return acc;
        }, {});

        // 👉 Convert Set → Array
        const formatted = {};
        Object.keys(grouped).forEach((key) => {
          formatted[key] = [...grouped[key]];
        });

        setMenuData(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  const toggleCategory = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-full sm:w-[50%] md:w-[300px] 
        bg-[#2B2A29]/70 backdrop-blur-md z-50 p-3 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <div
          className="absolute top-3 right-3 text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <RxCross2 />
        </div>

        {/* Logo */}
        <Link href="/" onClick={() => setIsOpen(false)}>
          <h1 className="text-[#971900] text-2xl font-bold text-center mb-6">
            A Plus Mart BD
          </h1>
        </Link>

        {/* Menu */}
        <ul className="flex flex-col gap-2 text-white">
          {Object.entries(menuData).map(([mainCategory, subCategories]) => (
            <li key={mainCategory} className="border-b border-white/10">
              {/* Main Category */}
              <button
                onClick={() => toggleCategory(mainCategory)}
                className="w-full flex justify-between items-center py-1 px-3 capitalize 
                hover:bg-white/10 rounded transition cursor-pointer"
              >
                <span>{mainCategory}</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeCategory === mainCategory ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sub Category Dropdown */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                ${
                  activeCategory === mainCategory
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="pl-5 flex flex-col gap-1 py-1">
                  {subCategories.map((sub, index) => (
                    <li key={index}>
                      <a
                        href={`/search?subCategory=${encodeURIComponent(sub)}`}
                        onClick={() => setIsOpen(false)}
                        className="block py-1 px-3 capitalize text-sm text-gray-200 hover:text-gray-400 hover:bg-white/10 rounded-sm transform duration-300 transition cursor-pointer"
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

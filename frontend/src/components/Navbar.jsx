"use client";

import { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

export default function Navbar({ isOpen, setIsOpen }) {
  const sidebarRef = useRef(null);

  // CLOSE WHEN CLICK OUTSIDE
  useEffect(() => {
    function handleOutsideClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  // SIDEBAR ANIMATION CLASSES
  const sidebarClass = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
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


        <div className="text-[#FFFFFF] font-semibold text-lg w-full">
            <ul className="w-full flex flex-col gap-2.5 text-base">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
            </ul>
        </div>


      </div>
    </>
  );
}

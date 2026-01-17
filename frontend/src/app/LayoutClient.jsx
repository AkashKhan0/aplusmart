"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Universalnav from "../components/Universalnav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [showUniversal, setShowUniversal] = useState(!isHome);
  const [isSticky, setIsSticky] = useState(false);

  const openMenu = () => setIsOpen(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;

      if (isHome) {
        setShowUniversal(scrolled);
        setIsSticky(scrolled);
      } else {
        setShowUniversal(true);
        setIsSticky(true);
      }
    };

    handleScroll(); // run on mount
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <>
      {showUniversal && (
        <Universalnav openMenu={openMenu} fixedOnTop={isSticky} />
      )}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
      <Footer />
    </>
  );
}

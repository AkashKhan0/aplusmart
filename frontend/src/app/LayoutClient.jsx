"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import Universalnav from "../components/Universalnav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <Universalnav openMenu={openMenu} />}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
      <Footer />
    </>
  );
}

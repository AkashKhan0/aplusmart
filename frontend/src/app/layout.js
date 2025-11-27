"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import "../styles/globals.css";
import Universalnav from "../components/Universalnav";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // Only Home page has scroll logic
  const isHome = pathname === "/";

  return (
    <html lang="en">
      <body className={``}>
        {/* On non-home pages: show normal navbar */}
        {!isHome && <Universalnav openMenu={openMenu} />}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
      </body>
    </html>
  );
}

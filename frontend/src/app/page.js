"use client";

import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Universalnav from "../components/Universalnav";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUniversal, setShowUniversal] = useState(false);

  const openMenu = () => setIsOpen(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowUniversal(true);
      } else {
        setShowUniversal(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showUniversal && (
        <Universalnav openMenu={openMenu} fixedOnTop={true} />
      )}

      <Hero openMenu={openMenu} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

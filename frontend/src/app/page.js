"use client";

import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Allproducts from "../components/Allproducts";
import Homeoffer from "../components/Homeoffer";
import Homecombo from "../components/Homecombo";
import Underhero from "../components/Underhero";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);

  return (
    <>
      <Hero openMenu={openMenu} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Underhero />
      <Allproducts />
      <Homeoffer />
      <Homecombo />
    </>
  );
}

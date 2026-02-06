"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";

const defaultSlide = {
  // image: "/images/Best_Deals.png",
  title: "Best Deals of The Season",
  subtitle: "Up to 20% Off on Electronics",
  buttonUrl: "/offers",
};

export default function HeroCarousel() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/user-offers`;

  // Fetch data from backend
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setOffers(data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      offers.length > 0 ? (prev === offers.length - 1 ? 0 : prev + 1) : 0,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      offers.length > 0 ? (prev === 0 ? offers.length - 1 : prev - 1) : 0,
    );
  };

  // Current slide: backend data if exists, else default
  const current = offers.length > 0 ? offers[currentIndex] : defaultSlide;

  return (
    <div className="relative w-full h-fit overflow-hidden">
      {/* Background */}
      <div
        className="w-full h-full bg-cover sm:bg-contain bg-no-repeat bg-position-[center_bottom] transition-all duration-300 py-5 filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))]"
        style={{ backgroundImage: `url(${current.image})` }}
      >
        {/* Dark Overlay */}
        <div className="w-full h-full bg-transparent flex flex-col items-center justify-center text-center px-4 pb-5">
          <h2 className="text-2xl sm:text-5xl md:text-6xl uppercase font-bold text-white mb-2">
            {current.title}
          </h2>

          <p className="text-lg font-semibold text-[#2B2A29] mb-5">
            {current.subtitle}
          </p>

          <Link href={current.buttonUrl}>
            <button className="buy_btn mb-5 sm:mb-0">
              <span>Buy Now</span>
              <span className="text-sm shop_btn_icon"><GiShoppingBag /></span>
            </button>
          </Link>
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-[30%] sm:left-0 bottom-0 sm:top-1/2 h-fit -translate-y-1/2 bg-black/10 duration-300 text-white p-2 rounded-full hover:bg-black/60 transition cursor-pointer"
      >
        <FaChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-[30%] sm:right-0 bottom-0 sm:top-1/2 h-fit -translate-y-1/2 bg-black/10 duration-300 text-white p-2 rounded-full hover:bg-black/60 transition cursor-pointer"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

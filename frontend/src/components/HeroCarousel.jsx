"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  {
    url: "/images/Best_Deals.png",
    title: "Best Deals of The Season",
    subtitle: "Up to 40% Off on Electronics",
  },
  {
    url: "/images/New_Arrivals.png",
    title: "New Arrivals",
    subtitle: "Trending Fashion Products",
  },
  {
    url: "/images/smart_home_gadgets.png",
    title: "Smart Home Gadgets",
    subtitle: "Upgrade Your Lifestyle",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-fit overflow-hidden">

      {/* Background */}
      <div
        className="w-full h-full bg-cover sm:bg-contain bg-no-repeat bg-position-[center_bottom] transition-all duration-300 py-14 filter-[drop-shadow(0_20px_20px_rgba(0,0,0,0.4))]"
        style={{ backgroundImage: `url(${images[currentIndex].url})` }}
      >
        {/* Dark Overlay */}
        <div className="w-full h-full bg-transparent flex flex-col items-center justify-center text-center px-4 py-16">

          <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase font-bold text-white mb-2">
            {images[currentIndex].title}
          </h2>

          <p className="text-lg font-semibold text-[#2B2A29] mb-10">
            {images[currentIndex].subtitle}
          </p>

          <button className="buy_btn">
            Buy Now
          </button>
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
      >
        <FaChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

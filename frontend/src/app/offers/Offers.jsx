"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Offers() {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [offerStatus, setOfferStatus] = useState("upcoming");

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [timeLefts, setTimeLefts] = useState({});
  const [offerStatuses, setOfferStatuses] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLefts = {};
      const newStatuses = {};

      products
        .filter(
          (p) =>
            p.mainCategory?.toLowerCase() === "offer" ||
            p.subCategory?.toLowerCase() === "offer"
        )
        .forEach((product) => {
          const now = new Date().getTime();
          const start = new Date(product.offerStartDate).getTime();
          const end = new Date(product.offerEndDate).getTime();

          if (now < start) {
            newStatuses[product._id] = "upcoming";
            newTimeLefts[product._id] = null;
          } else if (now > end) {
            newStatuses[product._id] = "expired";
            newTimeLefts[product._id] = null;
          } else {
            newStatuses[product._id] = "active";
            const diff = end - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            newTimeLefts[product._id] = { days, hours, minutes, seconds };
          }
        });

      setOfferStatuses(newStatuses);
      setTimeLefts(newTimeLefts);
    }, 1000);

    return () => clearInterval(interval);
  }, [products]);

  if (products.length === 0)
    return (
      <div className="w-full universal py-10">
        <div className="fixed_width px-5 universal_column h-full min-h-screen">
          <div className="w-full max-w-[200px]">
            <Image
              src="/images/clock.gif"
              alt="Please wait"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full universal_column py-10">
        {/* offer products */}
        <div className="fixed_width px-5">
          <div className="w-full flex flex-col items-center justify-center mb-5">
            <h1 className="text-lg sm:text-xl md:text-xl uppercase font-medium tracking-[3px]">
              Offer Products
            </h1>
            <p className="text-base">Limited Stock – Order Now</p>
          </div>

          {/* offer products list */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {products
              .filter(
                (product) =>
                  product.mainCategory?.toLowerCase() === "offer" ||
                  product.subCategory?.toLowerCase() === "offer"
              )
              .map((product) => {
                const status = offerStatuses[product._id] || "upcoming";
                const timeLeft = timeLefts[product._id];
                return (
                  <Link key={product._id} href={`/products/${product._id}`}>
                    <div className="flex flex-col bg-white rounded-md hover:shadow-md cursor-pointer transition relative">
                      {status === "upcoming" && (
                        <div className="bg-[#3c3c3c] text-white text-xs px-2 w-fit h-6 flex items-center rounded-br-full rounded-tr-full">
                          Offer starts on{" "}
                          {new Date(
                            product.offerStartDate
                          ).toLocaleDateString()}
                        </div>
                      )}

                      {status === "active" && timeLeft && (
                        <div className="bg-[#3c3c3c] text-white text-xs px-3 w-fit h-6 flex items-center gap-2 rounded-br-full rounded-tr-full">
                          <span>
                            {Math.round(
                              ((product.regularPrice - product.offerPrice) /
                                product.regularPrice) *
                                100
                            )}
                            % OFF
                          </span>
                          <span>|</span>
                          <span>
                            {timeLeft.days > 0 && `${timeLeft.days}d `}
                            {String(timeLeft.hours).padStart(2, "0")}:
                            {String(timeLeft.minutes).padStart(2, "0")}:
                            {String(timeLeft.seconds).padStart(2, "0")}
                          </span>
                        </div>
                      )}

                      {status === "expired" && (
                        <div className="bg-red-600 text-white w-fit text-xs px-3 h-6 flex items-center rounded-br-full rounded-tr-full">
                          Offer Expired
                        </div>
                      )}

                      <div className="w-full h-[250px] p-2">
                        <Image
                          src={product.images[0] || "/images/placeholder.png"}
                          alt={product.name}
                          width={500}
                          height={500}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col items-center py-2 gap-1.5">
                        <h1 className="text-base font-medium text-center capitalize">
                          {product.name}
                        </h1>

                        <p className="text-[#931905] flex items-center gap-3">
                          ৳ {product.offerPrice}
                          <del className="text-sm text-[#2B2A29]">
                            ৳ {product.regularPrice}
                          </del>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Allproducts() {
  const [products, setProducts] = useState([]);
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
    <div className="w-full universal_column py-10">
      {/* all products */}
      <div className="fixed_width px-5">
        <div className="w-full flex flex-col items-center justify-center mb-5">
          <h1 className="text-lg sm:text-xl md:text-xl uppercase font-medium tracking-[3px]">
            All Products
          </h1>
          <p className="text-base">Check & Get Your Desired Product!</p>
        </div>

        {/* all products list */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {products
            .filter(
              (product) =>
                product.mainCategory?.toLowerCase() !== "offer" &&
                product.mainCategory?.toLowerCase() !== "combo" &&
                product.mainCategory?.toLowerCase() !== "deals" &&
                product.subCategory?.toLowerCase() !== "deals"
            )
            .slice(0, 40)
            .map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="flex flex-col bg-white rounded-md hover:shadow-md cursor-pointer transition relative">
                  {/* % OFF */}
                  {product?.offerPrice > 0 &&
                  product?.regularPrice > 0 &&
                  product.offerPrice < product.regularPrice ? (
                    <div className="w-20 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center justify-center text-sm font-normal uppercase">
                      {Math.round(
                        ((product.regularPrice - product.offerPrice) /
                          product.regularPrice) *
                          100
                      )}
                      % off
                    </div>
                  ) : (
                    /* Earn Points */
                    product?.offerPrice > 0 && (
                      <div className="w-fit px-2 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center gap-1.5 justify-center text-sm font-normal capitalize">
                        Earn Points
                        <span className="text-[#c9c601] flex items-center">
                          {Math.min(Math.floor(product.offerPrice / 100), 500)}{" "}
                          ⭐
                        </span>
                      </div>
                    )
                  )}
                  <div className="w-full h-[250px]">
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

                    <p className="text-[#931905] flex items-center gap-1 font-bold">
                      <span className="taka">৳-</span>
                      {Number(product.offerPrice).toLocaleString("en-IN")}
                      {product?.regularPrice > 0 && (
                        <del className="text-sm text-[#2B2A29]">
                          <span className="taka">৳-</span>
                          {Number(product.regularPrice).toLocaleString("en-IN")}
                        </del>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

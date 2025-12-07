"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";

export default function Allproducts() {
  const { products, loading } = useAppContext();

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <div className="w-full universal py-10">
      <div className="fixed_width px-5">
        <div className="w-full flex flex-col items-center justify-center mb-5">
          <h1 className="text-lg sm:text-xl md:text-xl uppercase font-medium tracking-[3px]">
            All Products
          </h1>
          <p className="text-base">Check & Get Your Desired Product!</p>
        </div>

        {/* all products list */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="flex flex-col bg-white rounded-md hover:shadow-md cursor-pointer transition">
                <div className="w-full h-[250px] p-2">
                  <Image
                    src={product.images?.[0]}
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

                  <p className="text-[#931905] flex gap-3">
                    ৳{product.offerPrice}
                    <del className="text-sm text-[#2B2A29]">
                      ৳{product.regularPrice}
                    </del>
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

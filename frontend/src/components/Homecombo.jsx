"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Homecombo() {
  const [products, setProducts] = useState([]);
    const { user, addToCart } = useAppContext();
    const [successProductId, setSuccessProductId] = useState(null);
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

  
   // add to cart handler
  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const hasOffer =
      product?.offerPrice > 0 &&
      product?.regularPrice > 0 &&
      product.offerPrice < product.regularPrice;

    const discountPercent = hasOffer
      ? Math.round(
          ((product.regularPrice - product.offerPrice) / product.regularPrice) *
            100,
        )
      : 0;

    const earnedPoints =
      !hasOffer && product?.offerPrice > 0
        ? Math.min(Math.floor(product.offerPrice / 100), 500)
        : 0;

    const cartItem = {
      _id: product._id,
      name: product.name,
      images: product.images,
      offerPrice: product.offerPrice,
      regularPrice: product.regularPrice,
      quantity: 1, // default
      colors: [], // no color selection here
      role: user.role,

      hasOffer,
      discountPercent,
      earnedPoints,
    };

    addToCart(cartItem);
    setSuccessProductId(product._id);
    setTimeout(() => {
      setSuccessProductId(null);
    }, 2000);
  };

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
      {/* Combo products */}
      <div className="fixed_width px-5 mt-10">
        <div className="w-full flex flex-col items-center justify-center mb-5">
          <h1 className="text-lg text-center sm:text-xl md:text-xl uppercase font-medium tracking-[3px]">
            Combo Products
          </h1>
          <p className="text-base text-center">Unlock Exclusive Combo Offers</p>
        </div>

        {/* Combo products list */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {products
            .filter(
              (product) =>
                product.mainCategory?.toLowerCase() === "combo" ||
                product.subCategory?.toLowerCase() === "combo"
            )
            .slice(0, 10)
            .map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="flex flex-col bg-white rounded-md hover:shadow-md cursor-pointer transition relative">
                  {product?.offerPrice > 0 &&
                  product?.regularPrice > 0 &&
                  product.offerPrice < product.regularPrice ? (
                    <div className="w-20 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center justify-center text-sm font-medium uppercase">
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
                      <div className="w-28 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center gap-1.5 justify-center text-sm font-medium">
                        Earn Points
                        <span className="text-[#c9c601]">
                          {Math.min(Math.floor(product.offerPrice / 100), 500)}
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
                      <span className="taka">৳-</span>{" "}
                      {Number(product.offerPrice).toLocaleString("en-IN")}
                      {product?.regularPrice > 0 && (
                        <del className="text-sm text-[#2B2A29]">
                          <span className="taka">৳-</span>
                          {Number(product.regularPrice).toLocaleString("en-IN")}
                        </del>
                      )}
                    </p>
                    
                    {/* add to cart button */}
                    <div className="w-full flex flex-col items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="text-sm py-1 px-3 border border-gray-300 rounded-sm cursor-pointer font-medium capitalize bg-gray-100 hover:bg-gray-300 transition-colors duration-300"
                      >
                        add to cart
                      </button>
                      {successProductId === product._id && (
                        <p className="text-green-600 text-xs mt-1">
                          Added to cart successfully!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

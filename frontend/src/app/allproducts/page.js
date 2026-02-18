"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "@/src/context/AppContext";
import { FaEye, FaEyeSlash, FaShoppingCart } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Allproducts() {
  const { user, addToCart } = useAppContext();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 40;

  const [successProductId, setSuccessProductId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

  /* ================= Fetch Products ================= */
  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const list = Array.isArray(data) ? data : data.products || [];

      const filtered = list.filter(
        (product) =>
          product.mainCategory?.toLowerCase() !== "offer" &&
          product.mainCategory?.toLowerCase() !== "combo" &&
          product.subCategory?.toLowerCase() !== "offer" &&
          product.subCategory?.toLowerCase() !== "combo",
      );

      setProducts(filtered);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= Pagination Logic ================= */
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  /* ================= Smart Pagination Helper ================= */
  const getPaginationPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(currentPage - 2, 1);
      let end = Math.min(start + 4, totalPages);

      if (end - start < 4) {
        start = Math.max(end - 4, 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  /* ================= Add To Cart ================= */
  const handleAddToCart = (product) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const quantity = user.role === "reseller" ? 10 : 1;

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
      quantity,
      colors: [],
      role: user.role,
      ...(user.role === "reseller"
        ? { resellerPrice: product.resellerPrice }
        : {
            offerPrice: product.offerPrice,
            regularPrice: product.regularPrice,
            hasOffer,
            discountPercent,
            earnedPoints,
          }),
    };

    addToCart(cartItem);
    setSuccessProductId(product._id);
    setTimeout(() => setSuccessProductId(null), 2000);
  };

  /* ================= Loader ================= */
  if (products.length === 0)
    return (
      <div className="w-full universal py-10">
        <div className="fixed_width px-5 universal_column min-h-screen">
          <Image
            src="/images/clock.gif"
            alt="Please wait"
            width={200}
            height={200}
          />
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full universal_column pt-10 pb-5 mt-16">
        <div className="fixed_width h-auto min-h-screen px-5">
          <div className="text-center mb-5">
            <h1 className="text-xl uppercase font-medium tracking-[3px]">
              All Products
            </h1>
            <p>Check & Get Your Desired Product!</p>
          </div>

          {/* ================= Products Grid ================= */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {currentProducts.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="bg-white rounded-md shadow-2xl hover:shadow-md transition relative border-2 border-transparent hover:border-[#c9c9c9]">
                  {/* Offer / Points */}
                  {user?.role === "customer" &&
                    (product?.offerPrice > 0 &&
                    product?.regularPrice > 0 &&
                    product.offerPrice < product.regularPrice ? (
                      <div className="w-20 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center justify-center text-sm font-normal uppercase">
                        {Math.round(
                          ((product.regularPrice - product.offerPrice) /
                            product.regularPrice) *
                            100,
                        )}
                        % off
                      </div>
                    ) : (
                      product.offerPrice > 0 && (
                        <div className="w-fit px-2 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center gap-0.5 justify-center text-sm font-normal capitalize">
                          Earn Points{" "}
                          {Math.min(Math.floor(product.offerPrice / 100), 500)}{" "}
                          ⭐
                        </div>
                      )
                    ))}

                  <div className="h-[250px]">
                    <Image
                      src={product.images?.[0] || "/images/placeholder.png"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center py-2 gap-1.5 bg-[#e9e9e9] rounded-t-2xl">
                    <h1 className="text-base font-medium text-center capitalize">
                      {product.name}
                    </h1>

                    <p className="text-[#d42300] text-sm flex items-center gap-1 font-bold">
                      <span className="taka">৳-</span>
                      {
                        user?.role === "reseller"
                          ? Number(product.resellerPrice).toLocaleString(
                              "en-IN",
                            ) // Reseller price
                          : Number(product.offerPrice).toLocaleString("en-IN") // Customer price
                      }
                      /-
                      {/* Show regular price only for customer */}
                      {user?.role !== "reseller" &&
                        product?.regularPrice > 0 && (
                          <del className="text-sm text-[#2B2A29]">
                            <span className="taka">৳-</span>
                            {Number(product.regularPrice).toLocaleString(
                              "en-IN",
                            )}
                            /-
                          </del>
                        )}
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="add_to_cart_btn mb-2"
                    >
                      <span>Add to cart</span>
                      <FaShoppingCart />
                    </button>

                    {successProductId === product._id && (
                      <p className="text-green-600 text-xs mt-1">
                        Added to cart!
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ================= Pagination ================= */}
          <div className="flex justify-center mt-10 gap-2 flex-wrap items-center">
            {/* Previous */}
            {totalPages > 3 && (
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="w-8 h-8 rounded-full font-medium cursor-pointer transition-all pagination universal hover:scale-110"
              >
                <GrPrevious />
              </button>
            )}

            {/* Left dots */}
            {totalPages > 3 && currentPage > 3 && (
              <span className="px-2 text-lg">…</span>
            )}

            {/* Page Numbers */}
            {getPaginationPages().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full font-medium cursor-pointer transition-all ${
                  currentPage === page
                    ? "pagination_active"
                    : "pagination hover:scale-110"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Right dots */}
            {totalPages > 3 && currentPage < totalPages - 2 && (
              <span className="px-2 text-lg">…</span>
            )}

            {/* Next */}
            {totalPages > 3 && (
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="w-8 h-8 rounded-full font-medium cursor-pointer transition-all pagination universal hover:scale-110"
              >
                <GrNext />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= Login Modal (UNCHANGED) ================= */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white p-5 rounded-sm w-full max-w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-lg"
              onClick={() => setShowLoginModal(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center mb-2">
              Account Login
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;

                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/userauth/login`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email, password }),
                  },
                );

                if (res.ok) {
                  setShowLoginModal(false);
                  window.location.reload();
                } else {
                  alert("Login failed");
                }
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border w-full mb-2 p-2"
                required
              />

              <div className="border flex items-center mb-2 p-2">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full outline-none"
                  required
                />
                <span onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button className="bg-[#FFCE1B] w-full py-2 font-semibold">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

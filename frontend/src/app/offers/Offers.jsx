"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "@/src/context/AppContext";
import { FaEye, FaEyeSlash, FaShoppingCart } from "react-icons/fa";

export default function Offers() {
  const [products, setProducts] = useState([]);
  const [timeLefts, setTimeLefts] = useState({});
  const [offerStatuses, setOfferStatuses] = useState({});
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
  const { user, addToCart } = useAppContext();
  const [successProductId, setSuccessProductId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // add to cart handler
  const handleAddToCart = (product) => {
    if (!user) {
      setShowLoginModal(true); // ✅ login popup open
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
      offerPrice: product.offerPrice,
      regularPrice: product.regularPrice,
      quantity,
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

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLefts = {};
      const newStatuses = {};

      products
        .filter(
          (p) =>
            p.mainCategory?.toLowerCase() === "offer" ||
            p.subCategory?.toLowerCase() === "offer",
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
        <div className="fixed_width px-5 h-full min-h-screen mt-16">
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
                  product.subCategory?.toLowerCase() === "offer",
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
                            product.offerStartDate,
                          ).toLocaleDateString()}
                        </div>
                      )}

                      {status === "active" && timeLeft && (
                        <div className="bg-[#3c3c3c] text-white text-xs font-normal px-3 w-fit h-6 flex items-center gap-2 rounded-br-full rounded-tr-full">
                          <div>
                            {Math.round(
                              ((product.regularPrice - product.offerPrice) /
                                product.regularPrice) *
                                100,
                            )}
                            % OFF
                          </div>
                          <span>|</span>
                          <div className="flex items-center gap-0.5">
                            <span className="offer_count">
                              {timeLeft.days > 0 && `${timeLeft.days}d `}
                            </span>
                            <span className="offer_count">
                              {String(timeLeft.hours).padStart(2, "0")}h
                            </span>
                            <span className="offer_count">
                              {String(timeLeft.minutes).padStart(2, "0")}m
                            </span>
                            <span className="offer_count">
                              {String(timeLeft.seconds).padStart(2, "0")}s
                            </span>
                          </div>
                        </div>
                      )}

                      {status === "expired" && (
                        <div className="bg-red-600 text-white w-fit text-xs font-normal capitalize px-3 h-6 flex items-center rounded-br-full rounded-tr-full">
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
                          <span className="taka">
                            ৳-{" "}
                            {Number(product.offerPrice).toLocaleString("en-IN")}
                            /=
                          </span>
                          <del className="text-sm text-[#2B2A29]">
                            <span className="taka">
                              ৳-{" "}
                              {Number(product.regularPrice).toLocaleString(
                                "en-IN",
                              )}
                            </span>
                          </del>
                        </p>
                        {/* add to cart button */}
                        <div className="w-full flex flex-col items-center justify-center mb-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="add_to_cart_btn"
                          >
                            <span>add to cart</span>
                            <span className="shop_btn_icon">
                              <FaShoppingCart />
                            </span>
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
                );
              })}
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white p-5 rounded-sm w-full max-w-[400px] relative shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 font-bold text-lg duration-300 hover:text-[#931905] cursor-pointer"
              onClick={() => setShowLoginModal(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-2 text-center">
              Account Login
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;

                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/userauth/login`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({ email, password }),
                    },
                  );
                  const data = await res.json();
                  if (!res.ok) {
                    alert(data.error || "Login failed");
                    return;
                  }

                  // login successful
                  setShowLoginModal(false);
                  window.location.reload(); // reload to update user context
                } catch (err) {
                  alert("Something went wrong");
                }
              }}
              className="flex flex-col gap-1"
            >
              {/* Email */}
              <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="border border-gray-300 rounded-sm px-3 py-2 outline-none w-full"
                  required
                />
              </div>

              {/* Password with Eye Icon */}
              <div className="flex flex-col relative">
                <label className="font-semibold">Password</label>
                <div className="border border-gray-300 rounded-sm mb-1 relative flex items-center px-3 py-2">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="outline-none w-full"
                    required
                  />
                  <span
                    className="right-3 top-9 cursor-pointer text-gray-600"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="bg-[#FFCE1B] hover:bg-[#fdc701] py-1 rounded-sm font-semibold text-lg cursor-pointer"
              >
                Login
              </button>

              {/* Optional: Register link */}
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                  onClick={() => setShowLoginModal(false)}
                >
                  Register
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <Link
                  href="/forgot-password"
                  className="text-base font-medium text-green-600 hover:text-green-800 duration-300"
                >
                  Forget password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
